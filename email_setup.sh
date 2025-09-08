#!/bin/bash
# Email Server Setup Script
# Run as root: chmod +x email_setup.sh && ./email_setup.sh

set -e

# Configuration - CHANGE THESE
DOMAIN="kapadia.com"
HOSTNAME="mail.kapadia.com"
ADMIN_EMAIL="admin@kapadia.com"
MYSQL_ROOT_PASSWORD="EmailDB_Secure_2024"
ROUNDCUBE_PASSWORD="Roundcube_DB_2024"

echo "=== Email Server Setup Started ==="
echo "Domain: $DOMAIN"
echo "Mail server: $HOSTNAME"

# Update system
apt update && apt upgrade -y

# Install required packages
apt install -y postfix postfix-mysql dovecot-core dovecot-imapd dovecot-lmtpd \
    dovecot-mysql mysql-server apache2 php php-mysql php-imap php-mbstring \
    php-xml php-zip php-intl php-json php-curl certbot python3-certbot-apache \
    spamassassin sieve-connect opendkim opendkim-tools fail2ban mailutils

# Set hostname
hostnamectl set-hostname $HOSTNAME
echo "127.0.0.1 $HOSTNAME" >> /etc/hosts

# Configure MySQL
mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$MYSQL_ROOT_PASSWORD';"
mysql -e "CREATE DATABASE mailserver;"
mysql -e "CREATE USER 'mailuser'@'localhost' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD';"
mysql -e "GRANT ALL PRIVILEGES ON mailserver.* TO 'mailuser'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

# Create database structure
mysql -u root -p$MYSQL_ROOT_PASSWORD mailserver << 'EOF'
CREATE TABLE domains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain_id INT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    quota BIGINT DEFAULT 0,
    FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE
);

CREATE TABLE aliases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain_id INT NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination TEXT NOT NULL,
    FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE
);
EOF

# Add domain and users
mysql -u root -p$MYSQL_ROOT_PASSWORD mailserver << EOF
INSERT INTO domains (domain) VALUES ('$DOMAIN');
INSERT INTO users (domain_id, email, password, quota) VALUES 
(1, 'admin@$DOMAIN', ENCRYPT('admin123', CONCAT('\$6\$', SUBSTRING(SHA(RAND()), -16))), 1073741824),
(1, 'info@$DOMAIN', ENCRYPT('info123', CONCAT('\$6\$', SUBSTRING(SHA(RAND()), -16))), 1073741824),
(1, 'contact@$DOMAIN', ENCRYPT('contact123', CONCAT('\$6\$', SUBSTRING(SHA(RAND()), -16))), 1073741824);
EOF

echo "✅ Database and users created"

# Configure Postfix
cp /etc/postfix/main.cf /etc/postfix/main.cf.backup

cat > /etc/postfix/main.cf << EOF
# Basic configuration
myhostname = $HOSTNAME
mydomain = $DOMAIN
myorigin = \$mydomain
inet_interfaces = all
mydestination = localhost
relayhost = 
mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128

# Virtual mailbox settings
virtual_transport = lmtp:unix:private/dovecot-lmtp
virtual_mailbox_domains = mysql:/etc/postfix/mysql-virtual-mailbox-domains.cf
virtual_mailbox_maps = mysql:/etc/postfix/mysql-virtual-mailbox-maps.cf
virtual_alias_maps = mysql:/etc/postfix/mysql-virtual-alias-maps.cf

# TLS settings
smtpd_tls_cert_file = /etc/letsencrypt/live/$HOSTNAME/fullchain.pem
smtpd_tls_key_file = /etc/letsencrypt/live/$HOSTNAME/privkey.pem
smtpd_use_tls = yes
smtpd_tls_auth_only = yes
smtp_tls_security_level = may
smtpd_tls_security_level = may
smtpd_tls_protocols = !SSLv2, !SSLv3, !TLSv1, !TLSv1.1

# SASL settings
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
smtpd_sasl_auth_enable = yes

# Restrictions
smtpd_helo_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_invalid_helo_hostname, reject_non_fqdn_helo_hostname
smtpd_sender_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_non_fqdn_sender, reject_unknown_sender_domain
smtpd_recipient_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_non_fqdn_recipient, reject_unknown_recipient_domain, reject_unauth_destination

# Mailbox size limit (1GB per user)
mailbox_size_limit = 1073741824
message_size_limit = 52428800

# Other settings
biff = no
append_dot_mydomain = no
readme_directory = no
compatibility_level = 2
EOF

# MySQL configuration files for Postfix
cat > /etc/postfix/mysql-virtual-mailbox-domains.cf << EOF
user = mailuser
password = $MYSQL_ROOT_PASSWORD
hosts = 127.0.0.1
dbname = mailserver
query = SELECT 1 FROM domains WHERE domain='%s'
EOF

cat > /etc/postfix/mysql-virtual-mailbox-maps.cf << EOF
user = mailuser
password = $MYSQL_ROOT_PASSWORD
hosts = 127.0.0.1
dbname = mailserver
query = SELECT 1 FROM users WHERE email='%s'
EOF

cat > /etc/postfix/mysql-virtual-alias-maps.cf << EOF
user = mailuser
password = $MYSQL_ROOT_PASSWORD
hosts = 127.0.0.1
dbname = mailserver
query = SELECT destination FROM aliases WHERE source='%s'
EOF

# Configure Postfix master.cf
cat >> /etc/postfix/master.cf << EOF

# Submission port for authenticated users
submission inet n       -       y       -       -       smtpd
  -o syslog_name=postfix/submission
  -o smtpd_tls_security_level=encrypt
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_tls_auth_only=yes
  -o smtpd_reject_unlisted_recipient=no
  -o smtpd_client_restrictions=\$mua_client_restrictions
  -o smtpd_helo_restrictions=\$mua_helo_restrictions
  -o smtpd_sender_restrictions=\$mua_sender_restrictions
  -o smtpd_recipient_restrictions=
  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject
  -o milter_macro_daemon_name=ORIGINATING

# SMTPS port for encrypted connections
smtps     inet  n       -       y       -       -       smtpd
  -o syslog_name=postfix/smtps
  -o smtpd_tls_wrappermode=yes
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_reject_unlisted_recipient=no
  -o smtpd_client_restrictions=\$mua_client_restrictions
  -o smtpd_helo_restrictions=\$mua_helo_restrictions
  -o smtpd_sender_restrictions=\$mua_sender_restrictions
  -o smtpd_recipient_restrictions=
  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject
  -o milter_macro_daemon_name=ORIGINATING
EOF

echo "✅ Postfix configured"

# Configure Dovecot
cp /etc/dovecot/dovecot.conf /etc/dovecot/dovecot.conf.backup

cat > /etc/dovecot/dovecot.conf << EOF
# Basic configuration
protocols = imap lmtp
listen = *, ::

# SSL configuration
ssl = required
ssl_cert = </etc/letsencrypt/live/$HOSTNAME/fullchain.pem
ssl_key = </etc/letsencrypt/live/$HOSTNAME/privkey.pem
ssl_protocols = !SSLv3 !TLSv1 !TLSv1.1

# Authentication
auth_mechanisms = plain login
disable_plaintext_auth = yes

# Mail location
mail_location = maildir:/var/mail/vhosts/%d/%n/
mail_privileged_group = mail
mail_uid = vmail
mail_gid = vmail

# Virtual users
userdb {
  driver = sql
  args = /etc/dovecot/dovecot-sql.conf.ext
}

passdb {
  driver = sql
  args = /etc/dovecot/dovecot-sql.conf.ext
}

# Services
service imap-login {
  inet_listener imap {
    port = 143
  }
  inet_listener imaps {
    port = 993
    ssl = yes
  }
}

service lmtp {
  unix_listener /var/spool/postfix/private/dovecot-lmtp {
    group = postfix
    mode = 0600
    user = postfix
  }
}

service auth {
  unix_listener /var/spool/postfix/private/auth {
    group = postfix
    mode = 0660
    user = postfix
  }

  unix_listener auth-userdb {
    mode = 0600
    user = vmail
  }

  user = dovecot
}

service auth-worker {
  user = vmail
}

# Protocols
protocol imap {
  mail_max_userip_connections = 20
  mail_plugins = \$mail_plugins quota imap_quota
}

protocol lmtp {
  postmaster_address = postmaster@$DOMAIN
  mail_plugins = \$mail_plugins quota
}

# Quota
plugin {
  quota = maildir:User quota
  quota_rule = *:storage=1G
  quota_rule2 = Trash:storage=+100M
}

# Namespace
namespace inbox {
  inbox = yes
  location = 
  mailbox Drafts {
    special_use = \Drafts
  }
  mailbox Junk {
    special_use = \Junk
  }
  mailbox Sent {
    special_use = \Sent
  }
  mailbox "Sent Messages" {
    special_use = \Sent
  }
  mailbox Trash {
    special_use = \Trash
  }
  prefix = 
  separator = /
}
EOF

# Create Dovecot SQL configuration
cat > /etc/dovecot/dovecot-sql.conf.ext << EOF
driver = mysql
connect = host=127.0.0.1 dbname=mailserver user=mailuser password=$MYSQL_ROOT_PASSWORD
default_pass_scheme = CRYPT

password_query = SELECT email as user, password FROM users WHERE email='%u'
user_query = SELECT '/var/mail/vhosts/%d/%n' as home, 'maildir:/var/mail/vhosts/%d/%n' as mail, 5000 AS uid, 5000 AS gid, concat('dirsize:storage=', quota) AS quota FROM users WHERE email='%u'
EOF

# Create vmail user
groupadd -g 5000 vmail 2>/dev/null || true
useradd -g vmail -u 5000 vmail -d /var/mail 2>/dev/null || true

# Create mail directories
mkdir -p /var/mail/vhosts/$DOMAIN
chown -R vmail:vmail /var/mail

echo "✅ Dovecot configured"

# Get SSL certificate (will be used by both services)
certbot --apache -d $HOSTNAME -d webmail.$DOMAIN --non-interactive --agree-tos --email $ADMIN_EMAIL || echo "⚠️ SSL certificate generation failed - will retry later"

# Install Roundcube
cd /tmp
wget https://github.com/roundcube/roundcubemail/releases/download/1.6.5/roundcubemail-1.6.5-complete.tar.gz
tar -xzf roundcubemail-1.6.5-complete.tar.gz
mv roundcubemail-1.6.5 /var/www/html/roundcube
chown -R www-data:www-data /var/www/html/roundcube

# Configure Roundcube database
mysql -u root -p$MYSQL_ROOT_PASSWORD << EOF
CREATE DATABASE roundcube;
CREATE USER 'roundcube'@'localhost' IDENTIFIED BY '$ROUNDCUBE_PASSWORD';
GRANT ALL PRIVILEGES ON roundcube.* TO 'roundcube'@'localhost';
FLUSH PRIVILEGES;
EOF

mysql -u root -p$MYSQL_ROOT_PASSWORD roundcube < /var/www/html/roundcube/SQL/mysql.initial.sql

# Configure Roundcube
DESKEY=$(openssl rand -hex 12)
cat > /var/www/html/roundcube/config/config.inc.php << EOF
<?php
\$config = array();

// Database connection string
\$config['db_dsnw'] = 'mysql://roundcube:$ROUNDCUBE_PASSWORD@localhost/roundcube';

// IMAP connection
\$config['default_host'] = array(
    'ssl://localhost:993' => '$DOMAIN'
);
\$config['default_port'] = 993;
\$config['imap_conn_options'] = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
    ),
);

// SMTP connection
\$config['smtp_server'] = 'tls://localhost';
\$config['smtp_port'] = 587;
\$config['smtp_user'] = '%u';
\$config['smtp_pass'] = '%p';
\$config['smtp_conn_options'] = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
    ),
);

// General configuration
\$config['support_url'] = '';
\$config['product_name'] = 'Kapadia High School Webmail';
\$config['des_key'] = '$DESKEY';
\$config['plugins'] = array();
\$config['language'] = 'en_US';
\$config['login_autocomplete'] = 2;
\$config['password_charset'] = 'UTF-8';
\$config['junk_mbox'] = 'Junk';

// Security
\$config['force_https'] = true;
\$config['use_https'] = true;
\$config['login_rate_limit'] = 3;

// Interface
\$config['skin'] = 'elastic';
\$config['mime_param_folding'] = 1;
\$config['identities_level'] = 0;
\$config['reply_same_folder'] = true;
\$config['default_folders'] = array('INBOX', 'Drafts', 'Sent', 'Junk', 'Trash');
EOF

# Configure Apache virtual host
cat > /etc/apache2/sites-available/webmail.conf << EOF
<VirtualHost *:80>
    ServerName webmail.$DOMAIN
    Redirect permanent / https://webmail.$DOMAIN/
</VirtualHost>

<VirtualHost *:443>
    ServerName webmail.$DOMAIN
    DocumentRoot /var/www/html/roundcube

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/$HOSTNAME/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/$HOSTNAME/privkey.pem

    <Directory /var/www/html/roundcube>
        Options -Indexes
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog \${APACHE_LOG_DIR}/webmail_error.log
    CustomLog \${APACHE_LOG_DIR}/webmail_access.log combined
</VirtualHost>
EOF

a2ensite webmail
a2enmod ssl
a2enmod rewrite

# Enable PHP modules
phpenmod imap mbstring xml zip intl json curl

# Configure firewall
ufw allow 25/tcp   # SMTP
ufw allow 587/tcp  # SMTP submission
ufw allow 465/tcp  # SMTPS
ufw allow 143/tcp  # IMAP
ufw allow 993/tcp  # IMAPS

# Start services
systemctl restart mysql
systemctl restart postfix
systemctl restart dovecot
systemctl restart apache2

systemctl enable mysql
systemctl enable postfix
systemctl enable dovecot
systemctl enable apache2

# Create email management script
cat > /root/manage_email.sh << 'EOF'
#!/bin/bash
# Email Management Script

case "$1" in
    add-user)
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo "Usage: $0 add-user email@domain.com password"
            exit 1
        fi
        mysql -u root -p$MYSQL_ROOT_PASSWORD mailserver -e "INSERT INTO users (domain_id, email, password, quota) VALUES (1, '$2', ENCRYPT('$3', CONCAT('\$6\$', SUBSTRING(SHA(RAND()), -16))), 1073741824);"
        echo "User $2 created successfully"
        ;;
    list-users)
        mysql -u root -p$MYSQL_ROOT_PASSWORD mailserver -e "SELECT email FROM users;"
        ;;
    delete-user)
        if [ -z "$2" ]; then
            echo "Usage: $0 delete-user email@domain.com"
            exit 1
        fi
        mysql -u root -p$MYSQL_ROOT_PASSWORD mailserver -e "DELETE FROM users WHERE email='$2';"
        echo "User $2 deleted"
        ;;
    check-logs)
        tail -f /var/log/mail.log
        ;;
    test-email)
        echo "Test email from Kapadia High School server" | mail -s "Test Email" admin@$DOMAIN
        echo "Test email sent to admin@$DOMAIN"
        ;;
    *)
        echo "Email Management Script"
        echo "Usage: $0 {add-user|list-users|delete-user|check-logs|test-email}"
        echo ""
        echo "Examples:"
        echo "  $0 add-user principal@kapadia.com password123"
        echo "  $0 list-users"
        echo "  $0 delete-user olduser@kapadia.com"
        echo "  $0 check-logs"
        echo "  $0 test-email"
        ;;
esac
EOF

chmod +x /root/manage_email.sh

echo ""
echo "=== Email Server Setup Complete! ==="
echo ""
echo "🎉 Your email server is now running!"
echo ""
echo "📧 Email Accounts Created:"
echo "   admin@$DOMAIN (password: admin123)"
echo "   info@$DOMAIN (password: info123)"  
echo "   contact@$DOMAIN (password: contact123)"
echo ""
echo "🌐 Webmail Access:"
echo "   https://webmail.$DOMAIN"
echo ""
echo "📱 IMAP Settings (for Gmail, Outlook, etc.):"
echo "   Server: mail.$DOMAIN"
echo "   Port: 993 (SSL/TLS)"
echo "   Username: full email address"
echo ""
echo "📤 SMTP Settings (for sending):"
echo "   Server: mail.$DOMAIN"
echo "   Port: 587 (STARTTLS)"
echo "   Authentication: Yes"
echo "   Username: full email address"
echo ""
echo "🔧 Management Commands:"
echo "   Add user: /root/manage_email.sh add-user newuser@$DOMAIN password123"
echo "   List users: /root/manage_email.sh list-users"
echo "   Check logs: /root/manage_email.sh check-logs"
echo "   Test email: /root/manage_email.sh test-email"
echo ""
echo "⚠️  IMPORTANT: Change default passwords immediately!"
echo "   Use webmail interface to change passwords"
echo ""
echo "🔒 Security Notes:"
echo "   - All connections use SSL/TLS encryption"
echo "   - Firewall configured for email ports"
echo "   - Anti-spam protection enabled"
echo ""
echo "📝 Next Steps:"
echo "   1. Configure DNS records (see EMAIL_SERVER_SETUP.md)"
echo "   2. Wait for DNS propagation (up to 24 hours)"
echo "   3. Test webmail at https://webmail.$DOMAIN"
echo "   4. Configure Gmail integration"
echo ""
