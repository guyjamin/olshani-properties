---
description: Deploy Next.js app to HostPinnacle cPanel
---

# Deploying Olshani Properties to HostPinnacle (cPanel)

## ⚠️ IMPORTANT PREREQUISITES

Before starting, verify your HostPinnacle plan supports:
1. **Node.js 20+** (Check in cPanel → Setup Node.js App)
2. **SSH Access** (Required for deployment)
3. **Sufficient Storage** (At least 500MB for node_modules + build)

---

## 📋 DEPLOYMENT STEPS

### Step 1: Prepare Production Build Locally

1. **Build the production bundle:**
   ```bash
   npm run build
   ```
   This creates the optimized `.next` folder.

2. **Test the production build locally:**
   ```bash
   npm start
   ```
   Visit http://localhost:3000 to verify everything works.

3. **Stop the dev server** (Ctrl+C)

---

### Step 2: Prepare Files for Upload

Create a deployment package with these files/folders:
- `.next/` (entire folder - production build)
- `public/` (all static assets)
- `app/` (application code)
- `components/` (React components)
- `data/` (properties.json)
- `lib/` (utility functions)
- `hooks/` (React hooks)
- `styles/` (CSS files)
- `package.json`
- `package-lock.json`
- `next.config.mjs`
- `server.js`
- `tsconfig.json`
- `postcss.config.mjs`
- `components.json`

**DO NOT UPLOAD:**
- `node_modules/` (will install on server)
- `.env.local` (add via cPanel environment variables)
- `.git/` (not needed)
- `.next/cache/` (will regenerate)

---

### Step 3: Upload Files to cPanel

#### Option A: Using cPanel File Manager (Easier)

1. **Login to cPanel** at your HostPinnacle account
2. **Navigate to File Manager**
3. **Go to your domain's directory:**
   - Usually: `/home/username/public_html/` or
   - For subdomain: `/home/username/olshaniproperties.co.ke/`
4. **Create a new folder** (e.g., `nextjs-app`) or use root
5. **Upload files:**
   - Click "Upload"
   - Select all prepared files/folders
   - Wait for upload to complete (may take 10-30 minutes due to large images)

#### Option B: Using FTP/SFTP (Faster for large files)

1. **Get FTP credentials from cPanel:**
   - cPanel → FTP Accounts → Create FTP Account
2. **Use FileZilla or WinSCP:**
   - Host: ftp.olshaniproperties.co.ke
   - Username: [your-ftp-username]
   - Password: [your-ftp-password]
   - Port: 21 (FTP) or 22 (SFTP)
3. **Upload all files** to the appropriate directory

---

### Step 4: Setup Node.js Application in cPanel

1. **Navigate to "Setup Node.js App"** in cPanel
2. **Click "Create Application"**
3. **Configure the application:**
   - **Node.js version:** 20.x or higher
   - **Application mode:** Production
   - **Application root:** `/home/username/public_html/nextjs-app` (or your path)
   - **Application URL:** olshaniproperties.co.ke
   - **Application startup file:** `server.js`
   - **Environment variables:** (if any from .env.local)
     - Click "Add Variable" for each
4. **Click "Create"**

---

### Step 5: Install Dependencies via SSH

1. **Enable SSH Access:**
   - cPanel → SSH Access → Manage SSH Keys
   - Generate key or import your public key

2. **Connect via SSH:**
   ```bash
   ssh username@olshaniproperties.co.ke
   ```
   Or use cPanel's Terminal (cPanel → Terminal)

3. **Navigate to your application directory:**
   ```bash
   cd ~/public_html/nextjs-app
   # or wherever you uploaded files
   ```

4. **Install dependencies:**
   ```bash
   npm install --production
   ```
   This will take 5-10 minutes.

5. **Verify Node.js version:**
   ```bash
   node --version
   # Should show v20.x or higher
   ```

---

### Step 6: Configure Application Startup

1. **In cPanel → Setup Node.js App**, find your application
2. **Click "Edit"** or the pencil icon
3. **Verify settings:**
   - Application startup file: `server.js`
   - Application mode: Production
4. **Click "Restart"** to start the application

---

### Step 7: Configure Domain & SSL

#### A. Point Domain to Application

1. **In cPanel → Domains** (or Addon Domains)
2. **Ensure olshaniproperties.co.ke points to your application directory**
3. **If using subdirectory**, you'll need to setup a reverse proxy:

   **Create/Edit `.htaccess` in public_html:**
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
   ```

#### B. Install SSL Certificate

1. **Navigate to cPanel → SSL/TLS Status**
2. **Select your domain:** olshaniproperties.co.ke
3. **Click "Run AutoSSL"** (free Let's Encrypt certificate)
4. **Wait for installation** (2-5 minutes)
5. **Verify HTTPS works:** https://olshaniproperties.co.ke

#### C. Force HTTPS (Recommended)

**Add to `.htaccess`:**
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

### Step 8: Configure Port & Process Manager

**Important:** cPanel's Node.js app manager handles process management, but you may need to:

1. **Check the assigned port:**
   - cPanel usually assigns a random port (e.g., 3000, 3001, etc.)
   - Your `server.js` uses `process.env.PORT || 3000` ✅ (already configured)

2. **Ensure application is running:**
   ```bash
   # Via SSH
   ps aux | grep node
   ```
   You should see your Node.js process.

3. **If application stops, restart via cPanel:**
   - Setup Node.js App → Click "Restart"

---

### Step 9: Optimize for Production

#### A. Compress Large Images (Recommended)

Your property images are 8-13MB each. Compress them:

1. **Use online tools:**
   - TinyPNG.com
   - Squoosh.app
   - ImageOptim (Mac) or FileOptimizer (Windows)

2. **Target size:** Under 500KB per image

3. **Re-upload compressed images** to `/public/` folder

#### B. Enable Gzip Compression

**Add to `.htaccess`:**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

#### C. Set Cache Headers

**Add to `.htaccess`:**
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

### Step 10: Test & Verify

1. **Visit your website:** https://olshaniproperties.co.ke
2. **Test all pages:**
   - Home page
   - Project listings
   - Individual project pages
   - Contact page
   - About page
3. **Check browser console** for errors (F12)
4. **Test on mobile devices**
5. **Verify images load correctly**
6. **Test search/filter functionality**

---

## 🔧 TROUBLESHOOTING

### Application Won't Start

**Check logs:**
```bash
# Via SSH
cd ~/public_html/nextjs-app
cat logs/app.log
```

Or in cPanel → Setup Node.js App → Click "Open Logs"

**Common issues:**
- Missing dependencies: Run `npm install` again
- Wrong Node.js version: Update in cPanel
- Port conflict: Check `server.js` uses `process.env.PORT`

### Images Not Loading

1. **Verify images are in `/public/` folder**
2. **Check file permissions:**
   ```bash
   chmod 644 public/*.jpg
   chmod 644 public/*.png
   chmod 644 public/*.webp
   ```
3. **Check image paths in code** (should start with `/`)

### 404 Errors on Page Refresh

**Add to `.htaccess`:**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

### Application Crashes/Restarts

1. **Check memory usage:**
   - Next.js needs at least 512MB RAM
   - Upgrade hosting plan if needed
2. **Monitor via cPanel:**
   - Setup Node.js App → Check status
3. **Consider using PM2** (if SSH access allows):
   ```bash
   npm install -g pm2
   pm2 start server.js --name olshani
   pm2 startup
   pm2 save
   ```

---

## 📊 POST-DEPLOYMENT CHECKLIST

- [ ] Website loads at https://olshaniproperties.co.ke
- [ ] SSL certificate is active (padlock in browser)
- [ ] All pages are accessible
- [ ] Images load correctly
- [ ] Search/filters work
- [ ] Contact form works (if applicable)
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Google Analytics tracking (if configured)
- [ ] Performance is acceptable (use PageSpeed Insights)

---

## 🔄 UPDATING THE WEBSITE

When you make changes:

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Upload only changed files:**
   - If code changed: Upload `.next/`, `app/`, `components/`, etc.
   - If data changed: Upload `data/properties.json`
   - If images changed: Upload to `public/`

3. **Restart application:**
   - cPanel → Setup Node.js App → Restart

4. **Clear browser cache** and test

---

## 💡 ALTERNATIVE: Static Export (If Node.js Issues)

If HostPinnacle doesn't support Node.js well, you can export as static HTML:

1. **Update `next.config.mjs`:**
   ```javascript
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true },
   }
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Upload only the `out/` folder** to public_html

4. **No Node.js required** - works like a regular HTML website

**Note:** You'll lose server-side features, but the site will work on any hosting.

---

## 📞 SUPPORT

If you encounter issues:
1. **HostPinnacle Support:** Contact via cPanel or their support portal
2. **Check cPanel error logs:** File Manager → logs/
3. **SSH logs:** `tail -f logs/app.log`

---

**Good luck with your deployment! 🚀**
