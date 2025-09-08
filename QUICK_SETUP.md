# Quick VPS Setup - Kapadia High School Website

## 🚀 Fast Track Setup (No GitHub Required)

### Step 1: Prepare Files on Windows
```powershell
# Open PowerShell in your project directory
cd C:\Users\Admin\desktop\khs

# Run the transfer script (replace with your VPS IP)
.\transfer_to_vps.ps1 -VpsIP "YOUR_VPS_IP"
```

### Step 2: Upload Files to VPS
Choose one method from the PowerShell script:
- **Option 1**: SCP (if available)
- **Option 2**: WinSCP (recommended)
- **Option 3**: FileZilla or any SFTP client

Upload all files to: `/home/deploy/khs/`

### Step 3: Configure and Run Setup
SSH into your VPS:
```bash
ssh root@YOUR_VPS_IP
```

Edit the setup script:
```bash
nano vps_setup.sh
```

**Change these lines:**
```bash
VPS_IP="YOUR_ACTUAL_VPS_IP"              # Replace with your VPS IP
DOMAIN="your-domain.com"                 # Replace with your domain (optional)
DB_PASSWORD="YourSecurePassword123"      # Choose a secure password
ADMIN_PASSWORD="YourAdminPassword123"    # Choose admin password
```

Make executable and run:
```bash
chmod +x vps_setup.sh
./vps_setup.sh
```

### Step 4: Access Your Website
After setup completes:
- **Website**: `http://YOUR_VPS_IP`
- **Admin Panel**: `http://YOUR_VPS_IP/admin/`
- **Username**: `admin`
- **Password**: (whatever you set in the script)

## 📸 Photo Management

### Upload Photos
1. Go to admin panel: `http://YOUR_VPS_IP/admin/`
2. Navigate to:
   - **Carousel Images**: For homepage slideshow
   - **Celebrations**: For festival photos
   - **Gallery**: For photo galleries

### Photo Features
- ✅ **Auto-optimization**: Photos automatically resized and compressed
- ✅ **10MB upload limit** per photo
- ✅ **Fast loading**: Nginx serves photos directly
- ✅ **Daily backups**: Photos backed up automatically
- ✅ **Multiple formats**: JPG, PNG supported

### Photo Storage Locations
```
/var/www/khs/media/
├── carousel/images/     # Homepage carousel
├── festival/gallery/    # Festival photo gallery
└── festival/images/     # Main festival photos
```

## 🔧 Management Commands

```bash
# Deploy updates (after making changes)
./deploy.sh

# Manual backup
./backup.sh

# View application logs
sudo journalctl -u gunicorn -f

# Restart services
sudo systemctl restart gunicorn
sudo systemctl restart nginx

# Optimize all photos
cd /home/deploy/khs
source venv/bin/activate
python manage.py optimize_photos
```

## 🔒 Security Features

- ✅ **Firewall configured** (UFW)
- ✅ **Secure database** with PostgreSQL
- ✅ **Environment variables** protected
- ✅ **Auto-monitoring** (services restart if down)
- ✅ **Daily backups** (database + photos)
- ✅ **SSL ready** (can add HTTPS easily)

## 📊 System Monitoring

The setup includes automatic monitoring:
- **Every 5 minutes**: Check if services are running
- **Daily at 2 AM**: Backup database and photos
- **Auto-restart**: Services restart if they crash
- **Disk monitoring**: Warns if disk usage >80%

## 🆘 Troubleshooting

### Website not loading?
```bash
# Check service status
sudo systemctl status gunicorn
sudo systemctl status nginx

# Check logs
sudo journalctl -u gunicorn --no-pager -l
sudo tail -f /var/log/nginx/error.log
```

### Photos not uploading?
```bash
# Check media directory permissions
ls -la /var/www/khs/media/
sudo chown -R deploy:www-data /var/www/khs/media/
sudo chmod -R 755 /var/www/khs/media/
```

### Database connection issues?
```bash
# Test database connection
sudo -u deploy psql -h localhost -U kapadiaschool_user -d kapadiaschool_db
```

## 🌐 Adding HTTPS (Optional)

If you have a domain:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 📈 Performance Optimization

The setup includes:
- **Redis caching** for faster page loads
- **Static file caching** (30 days)
- **Photo caching** (7 days)
- **Gzip compression** enabled
- **3 Gunicorn workers** for concurrent requests

## 💾 Backup & Recovery

### Manual Backup
```bash
./backup.sh
```

### Restore from Backup
```bash
# Restore database
sudo -u postgres psql -d kapadiaschool_db < /home/deploy/backups/db_backup_YYYYMMDD_HHMMSS.sql

# Restore photos
cd /var/www/khs
sudo tar -xzf /home/deploy/backups/media_backup_YYYYMMDD_HHMMSS.tar.gz
```

## 🎯 Success Checklist

After setup, verify:
- [ ] Website loads at `http://YOUR_VPS_IP`
- [ ] Admin panel accessible at `/admin/`
- [ ] Can upload photos in admin
- [ ] Photos display on website
- [ ] SSL certificate (if domain configured)
- [ ] Automatic backups running
- [ ] Services auto-restart on failure

## 📞 Quick Reference

| Service | Command | Port |
|---------|---------|------|
| Website | `systemctl restart gunicorn` | 80/443 |
| Web Server | `systemctl restart nginx` | 80/443 |
| Database | `systemctl restart postgresql` | 5432 |
| Cache | `systemctl restart redis` | 6379 |

**Your Kapadia High School website will be running smoothly with full photo management capabilities!** 🎉
