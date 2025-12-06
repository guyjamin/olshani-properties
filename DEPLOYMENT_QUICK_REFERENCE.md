# Quick Reference: HostPinnacle Deployment

## 🎯 Key Information

**Domain:** olshaniproperties.co.ke  
**Hosting:** HostPinnacle cPanel  
**Framework:** Next.js 15.2.4  
**Node.js Required:** v20.x or higher  
**Port:** Uses `process.env.PORT` (cPanel assigns automatically)  
**Startup File:** `server.js`

---

## 📋 Quick Start Commands

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Test production build
npm start
```

---

## 🚀 Deployment Summary

### 1. Build Locally
```bash
npm run build
```

### 2. Upload These Files to cPanel
- `.next/` folder
- `public/` folder
- `app/`, `components/`, `data/`, `lib/`, `hooks/`, `styles/`
- `package.json`, `package-lock.json`
- `next.config.mjs`, `server.js`, `tsconfig.json`
- `.htaccess` (for Apache configuration)

### 3. Setup in cPanel
1. **Setup Node.js App:**
   - Version: 20.x
   - Mode: Production
   - Startup: server.js
   - URL: olshaniproperties.co.ke

2. **Install Dependencies (via SSH/Terminal):**
   ```bash
   cd ~/public_html/[your-app-directory]
   npm install --production
   ```

3. **Start Application:**
   - Click "Restart" in cPanel Node.js App

4. **Configure SSL:**
   - Use AutoSSL in cPanel
   - Force HTTPS via `.htaccess`

---

## 🔍 Important Files

### `server.js`
Custom Node.js server that:
- Uses `process.env.PORT` (cPanel compatibility)
- Handles Next.js requests
- Runs in production mode

### `.htaccess`
Apache configuration that:
- Forces HTTPS
- Redirects www to non-www
- Proxies requests to Node.js
- Enables caching and compression
- Adds security headers

### `next.config.mjs`
Next.js configuration:
- Output: 'standalone' (optimized for hosting)
- Image optimization enabled
- TypeScript/ESLint errors ignored during build

---

## 📞 Contact Information

**WhatsApp:** 0702168686 (configured in app)  
**Domain:** olshaniproperties.co.ke

---

## 🔧 Common Issues & Solutions

### Issue: Application won't start
**Solution:**
1. Check Node.js version: `node --version` (must be 20+)
2. Check logs in cPanel → Setup Node.js App → Logs
3. Verify `server.js` is set as startup file
4. Ensure dependencies installed: `npm install --production`

### Issue: Images not loading
**Solution:**
1. Verify images are in `/public/` folder
2. Check file permissions: `chmod 644 public/*.jpg`
3. Verify paths start with `/` in code

### Issue: 404 on page refresh
**Solution:**
1. Ensure `.htaccess` has reverse proxy rules
2. Verify RewriteEngine is On
3. Check Apache mod_rewrite is enabled

### Issue: SSL not working
**Solution:**
1. Run AutoSSL in cPanel
2. Verify `.htaccess` has HTTPS redirect
3. Clear browser cache

---

## 📊 File Sizes to Watch

**Large Images (need optimization):**
- `Projects_Astra_Bay.jpg` - 12.7 MB
- `Projects_Misty.jpg` - 13.1 MB
- `Projects_Diplomat.jpg` - 11.1 MB
- `Gaia-02.jpg` - 9.9 MB
- `Projects_Marblewest.jpg` - 9.4 MB

**Recommendation:** Compress to under 500KB each using TinyPNG or similar tools.

---

## 🎨 Project Structure

```
olshani-listings/
├── .next/                 # Build output (upload after build)
├── app/                   # Next.js pages
│   ├── page.tsx          # Homepage
│   ├── layout.tsx        # Root layout (metadata)
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   └── project/          # Individual project pages
├── components/           # React components
├── data/
│   └── properties.json   # All property listings
├── public/               # Static assets (images)
├── lib/                  # Utility functions
├── hooks/                # React hooks
├── styles/               # CSS files
├── server.js             # Custom Node.js server
├── .htaccess             # Apache configuration
├── package.json          # Dependencies
└── next.config.mjs       # Next.js config
```

---

## 🔄 Update Workflow

When you need to update the website:

1. **Make changes locally**
2. **Test:** `npm run dev`
3. **Build:** `npm run build`
4. **Upload changed files:**
   - Code: Upload `.next/`, `app/`, `components/`
   - Data: Upload `data/properties.json`
   - Images: Upload to `public/`
5. **Restart app** in cPanel
6. **Test** the live site

---

## 📚 Documentation

- **Full Deployment Guide:** `.agent/workflows/deploy-hostpinnacle.md`
- **Deployment Checklist:** `DEPLOYMENT_CHECKLIST.md`
- **Next.js Docs:** https://nextjs.org/docs
- **cPanel Docs:** https://docs.cpanel.net/

---

## ✅ Pre-Flight Checklist

Before deploying:
- [ ] `npm run build` completes successfully
- [ ] `npm start` works locally
- [ ] All images are in `public/` folder
- [ ] `metadataBase` set to `https://olshaniproperties.co.ke`
- [ ] `.htaccess` file ready
- [ ] Node.js 20+ available in cPanel
- [ ] SSH access confirmed
- [ ] Domain DNS pointing to HostPinnacle

---

**Last Updated:** 2025-12-06  
**Version:** 1.0
