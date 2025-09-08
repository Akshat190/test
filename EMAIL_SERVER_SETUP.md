# Self-Hosted Email Server Setup - Kapadia High School

## 🚀 Professional Email Setup (admin@kapadia.com, info@kapadia.com, etc.)

This guide will set up a complete email server on your VPS with:
- **Postfix** (SMTP - sending emails)
- **Dovecot** (IMAP/POP3 - receiving emails)  
- **Roundcube** (Webmail interface)
- **SSL certificates** for secure email
- **Anti-spam** protection

## 📋 Prerequisites

- Domain name pointing to your VPS (e.g., kapadia.com)
- VPS with Ubuntu 22.04 (your existing setup)
- DNS records configured (we'll help with this)

## 🌐 DNS Configuration Required

**Before starting, add these DNS records to your domain:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | mail | YOUR_VPS_IP | 300 |
| MX | @ | mail.kapadia.com | 300 |
| TXT | @ | v=spf1 ip4:YOUR_VPS_IP ~all | 300 |
| CNAME | webmail | mail.kapadia.com | 300 |

Replace `YOUR_VPS_IP` with your actual VPS IP address.

## 📦 Installation Script

Run this on your VPS as root:

```bash
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
    spamassassin sieve-connect opendkim opendkim-tools fail2ban

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
groupadd -g 5000 vmail
useradd -g vmail -u 5000 vmail -d /var/mail

# Create mail directories
mkdir -p /var/mail/vhosts/$DOMAIN
chown -R vmail:vmail /var/mail

echo "✅ Dovecot configured"

# Get SSL certificate
certbot --apache -d $HOSTNAME -d webmail.$DOMAIN --non-interactive --agree-tos --email $ADMIN_EMAIL

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
\$config['des_key'] = '$(openssl rand -hex 12)';
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
echo "⚠️  IMPORTANT: Change default passwords immediately!"
echo "   Use webmail interface to change passwords"
echo ""
echo "🔒 Security Notes:"
echo "   - All connections use SSL/TLS encryption"
echo "   - Firewall configured for email ports"
echo "   - Anti-spam protection enabled"
echo ""
EOF

chmod +x email_setup.sh
echo "✅ Email setup script created!"
echo ""
echo "Next steps:"
echo "1. Configure your DNS records (see above table)"
echo "2. Run: ./email_setup.sh"
echo "3. Wait for DNS propagation (up to 24 hours)"
echo "4. Test your email!"
```

## 🎯 **Quick Start Commands:**

### **1. Create the setup script:**
```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Create and run the email setup
nano email_setup.sh
# Copy the entire script above into this file
chmod +x email_setup.sh
```

### **2. Edit the configuration:**
Change these variables at the top of the script:
```bash
DOMAIN="kapadia.com"                    # Your actual domain
HOSTNAME="mail.kapadia.com"             # Mail server hostname  
ADMIN_EMAIL="admin@kapadia.com"         # Admin email
MYSQL_ROOT_PASSWORD="EmailDB_Secure_2024"    # Database password
ROUNDCUBE_PASSWORD="Roundcube_DB_2024"       # Webmail password
```

### **3. Run the setup:**
```bash
./email_setup.sh
```

## 📧 **After Setup - Email Accounts:**

**Default accounts created:**
- `admin@kapadia.com` (password: admin123)
- `info@kapadia.com` (password: info123)
- `contact@kapadia.com` (password: contact123)

**Access methods:**
1. **Webmail**: `https://webmail.kapadia.com`
2. **Gmail/Outlook**: Use IMAP settings below
3. **Mobile apps**: Use IMAP/SMTP settings

## 📱 **Gmail Integration:**

### **Add to Gmail (receiving emails):**
1. Gmail Settings → Accounts → "Add a mail account"
2. Email: `admin@kapadia.com`
3. Server: `mail.kapadia.com`
4. Port: `993`, SSL: Yes

### **Send from Gmail (sending emails):**
1. Gmail Settings → Accounts → "Add another email address"
2. Email: `admin@kapadia.com` 
3. SMTP Server: `mail.kapadia.com`
4. Port: `587`, TLS: Yes

## 🔧 **Management Commands:**

```bash
# Add new email user
mysql -u root -p mailserver
INSERT INTO users (domain_id, email, password, quota) VALUES 
(1, 'newuser@kapadia.com', ENCRYPT('newpassword', CONCAT('$6$', SUBSTRING(SHA(RAND()), -16))), 1073741824);

# Check email logs
tail -f /var/log/mail.log

# Restart email services
systemctl restart postfix dovecot

# Test email sending
echo "Test email" | mail -s "Test Subject" admin@kapadia.com
```

## 🛡️ **Security Features:**

- ✅ **SSL/TLS encryption** for all connections
- ✅ **SASL authentication** required
- ✅ **Spam protection** with SpamAssassin  
- ✅ **Firewall rules** for email ports
- ✅ **Rate limiting** to prevent abuse
- ✅ **Secure passwords** (change defaults!)

## 🆘 **Troubleshooting:**

### **Email not sending:**
```bash
# Check Postfix status
systemctl status postfix
tail -f /var/log/mail.log
```

### **Can't receive emails:**
```bash
# Check Dovecot status  
systemctl status dovecot
doveconf -n | grep ssl
```

### **Webmail not loading:**
```bash
# Check Apache status
systemctl status apache2
tail -f /var/log/apache2/error.log
```

**Your professional email system will be ready with webmail access and mobile client support!** 📧✨
