# HostPinnacle Deployment - Quick Guide

## ✅ Build Complete!

Your production build is ready in the `.next` folder.

---

## 📦 STEP 1: Prepare Files for Upload

You need to upload these folders/files to HostPinnacle:

### **Essential Folders:**
- ✅ `.next/` (entire folder - your build)
- ✅ `public/` (all images and static files)
- ✅ `app/` (your pages)
- ✅ `components/` (React components)
- ✅ `data/` (properties.json)
- ✅ `lib/` (utilities)
- ✅ `hooks/` (React hooks)
- ✅ `styles/` (CSS)

### **Essential Files:**
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `next.config.mjs`
- ✅ `server.js`
- ✅ `tsconfig.json`
- ✅ `postcss.config.mjs`
- ✅ `components.json`
- ✅ `.htaccess`

### **DO NOT Upload:**
- ❌ `node_modules/` (will install on server)
- ❌ `.env.local`
- ❌ `.git/`

---

## 🌐 STEP 2: Login to HostPinnacle cPanel

1. Go to your HostPinnacle cPanel URL
2. Login with your credentials
3. You should see the cPanel dashboard

---

## 📁 STEP 3: Upload Files

### **Option A: File Manager (Easier)**

1. **Open File Manager** in cPanel
2. **Navigate to:** `public_html/` (or your domain folder)
3. **Create folder** (optional): `nextjs-app/`
4. **Click "Upload"** button
5. **Select and upload** all the folders/files listed above
6. **Wait** for upload to complete (may take 10-30 minutes due to large images)

### **Option B: FTP (Faster for large files)**

1. **Get FTP credentials:**
   - cPanel → FTP Accounts → Create FTP Account
2. **Use FileZilla or WinSCP:**
   - Host: `ftp.olshaniproperties.co.ke`
   - Port: 21
3. **Upload all files** to `public_html/`

---

## ⚙️ STEP 4: Setup Node.js Application

1. **In cPanel, find "Setup Node.js App"** (or "Node.js Selector")
2. **Click "Create Application"**
3. **Fill in these settings:**
   - **Node.js version:** 20.x (or latest available)
   - **Application mode:** Production
   - **Application root:** `/home/[username]/public_html/` (or your path)
   - **Application URL:** `olshaniproperties.co.ke`
   - **Application startup file:** `server.js`
4. **Click "Create"**

---

## 💻 STEP 5: Install Dependencies (SSH Required)

### **Enable SSH Access:**
1. cPanel → SSH Access → Manage SSH Keys
2. Generate key or import your public key

### **Connect via SSH:**

**Option 1: cPanel Terminal**
1. cPanel → Terminal
2. Opens in browser

**Option 2: Windows PowerShell/CMD**
```bash
ssh username@olshaniproperties.co.ke
```

### **Install Dependencies:**
```bash
# Navigate to your app directory
cd ~/public_html/

# Install dependencies
npm install --production

# This will take 5-10 minutes
```

---

## 🔄 STEP 6: Start the Application

1. **Go back to cPanel → Setup Node.js App**
2. **Find your application** in the list
3. **Click "Restart"** or "Start"
4. **Check status** - should show "Running"

---

## 🔒 STEP 7: Setup SSL Certificate

1. **cPanel → SSL/TLS Status**
2. **Select:** `olshaniproperties.co.ke`
3. **Click "Run AutoSSL"**
4. **Wait** for installation (2-5 minutes)
5. **Test:** Visit `https://olshaniproperties.co.ke`

---

## 🌍 STEP 8: Configure Domain

### **Ensure .htaccess is in place:**

The `.htaccess` file should be in your `public_html/` folder with this content:

```apache
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirect www to non-www
RewriteCond %{HTTP_HOST} ^www\.olshaniproperties\.co\.ke [NC]
RewriteRule ^(.*)$ https://olshaniproperties.co.ke/$1 [L,R=301]

# Proxy to Node.js
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

---

## ✅ STEP 9: Test Your Website

1. **Visit:** `https://olshaniproperties.co.ke`
2. **Check:**
   - ✅ Homepage loads
   - ✅ All project listings display
   - ✅ Individual project pages work
   - ✅ Images load correctly
   - ✅ Contact page works
   - ✅ Search/filters work
   - ✅ No console errors (F12)

---

## 🚨 Troubleshooting

### **Application Won't Start:**
1. Check Node.js version (must be 20+)
2. Check logs: cPanel → Setup Node.js App → Logs
3. Verify `server.js` is set as startup file
4. Ensure dependencies installed: `npm install --production`

### **Images Not Loading:**
1. Verify images are in `public/` folder
2. Check file permissions: `chmod 644 public/*.jpg`
3. Verify paths in code start with `/`

### **404 Errors:**
1. Ensure `.htaccess` has reverse proxy rules
2. Check Apache mod_rewrite is enabled
3. Verify application is running

### **SSL Not Working:**
1. Run AutoSSL again
2. Clear browser cache
3. Check `.htaccess` HTTPS redirect

---

## 📞 Need Help?

**Check application logs:**
```bash
# Via SSH
cd ~/public_html/
cat logs/app.log
```

**Or in cPanel:**
Setup Node.js App → Click your app → "Open Logs"

---

## 🎯 Quick Checklist

- [ ] Build completed (`npm run build`)
- [ ] Files uploaded to cPanel
- [ ] Node.js app created (v20+, Production mode)
- [ ] Dependencies installed (`npm install --production`)
- [ ] Application started/restarted
- [ ] SSL certificate installed
- [ ] `.htaccess` configured
- [ ] Website accessible at https://olshaniproperties.co.ke
- [ ] All pages working
- [ ] Images loading
- [ ] No errors

---

## 🔄 Future Updates

When you make changes:

1. **Build locally:** `npm run build`
2. **Upload changed files:**
   - Code changes: `.next/`, `app/`, `components/`
   - Data changes: `data/properties.json`
   - Images: `public/`
3. **Restart app** in cPanel
4. **Test** the live site

---

**Good luck with deployment! 🚀**

**Current Status:** ✅ Build complete, ready to upload!
