# HostPinnacle Deployment Checklist for Olshani Properties

## ✅ Pre-Deployment Preparation

### 1. Code Updates
- [x] Updated metadataBase to `https://olshaniproperties.co.ke` in `app/layout.tsx`
- [ ] Verify all environment variables (if any in `.env.local`)
- [ ] Test production build locally

### 2. Build Production Bundle
```bash
npm run build
```
**Expected output:** `.next` folder created successfully

### 3. Test Production Build Locally
```bash
npm start
```
**Verify:** Website works at http://localhost:3000

---

## 📦 Files to Upload to HostPinnacle

### Required Files/Folders:
- [ ] `.next/` - Production build output
- [ ] `public/` - All images and static assets
- [ ] `app/` - Application pages
- [ ] `components/` - React components
- [ ] `data/` - properties.json
- [ ] `lib/` - Utility functions
- [ ] `hooks/` - React hooks
- [ ] `styles/` - CSS files
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `next.config.mjs`
- [ ] `server.js`
- [ ] `tsconfig.json`
- [ ] `postcss.config.mjs`
- [ ] `components.json`

### DO NOT Upload:
- [ ] ❌ `node_modules/` (install on server)
- [ ] ❌ `.env.local` (use cPanel environment variables)
- [ ] ❌ `.git/`
- [ ] ❌ `.next/cache/`

---

## 🚀 HostPinnacle cPanel Setup

### Step 1: Upload Files
- [ ] Login to cPanel
- [ ] Navigate to File Manager
- [ ] Upload all required files to appropriate directory
- [ ] Verify all files uploaded successfully

### Step 2: Setup Node.js Application
- [ ] Open "Setup Node.js App" in cPanel
- [ ] Create new application with:
  - Node.js version: 20.x or higher
  - Application mode: Production
  - Application root: [your-path]
  - Application URL: olshaniproperties.co.ke
  - Startup file: server.js
- [ ] Add environment variables (if any)
- [ ] Click "Create"

### Step 3: Install Dependencies
- [ ] Connect via SSH or use cPanel Terminal
- [ ] Navigate to application directory
- [ ] Run: `npm install --production`
- [ ] Verify installation completed successfully

### Step 4: Start Application
- [ ] In "Setup Node.js App", click "Restart"
- [ ] Verify application status shows "Running"
- [ ] Check logs for any errors

### Step 5: Configure Domain & SSL
- [ ] Verify domain points to application
- [ ] Setup reverse proxy in `.htaccess` (if needed)
- [ ] Install SSL certificate (AutoSSL)
- [ ] Force HTTPS redirect
- [ ] Test: https://olshaniproperties.co.ke

---

## 🧪 Testing Checklist

### Functionality Tests
- [ ] Homepage loads correctly
- [ ] All project listings display
- [ ] Individual project pages work
- [ ] Contact page accessible
- [ ] About page accessible
- [ ] Search functionality works
- [ ] Location filter works
- [ ] Price range filter works
- [ ] WhatsApp button works (0702168686)

### Image Tests
- [ ] Hero section images load
- [ ] Project card images load
- [ ] Featured project images load
- [ ] Individual property images load
- [ ] Logo displays correctly

### Technical Tests
- [ ] SSL certificate active (padlock icon)
- [ ] No console errors (F12)
- [ ] Mobile responsive
- [ ] Page load speed acceptable
- [ ] All links work
- [ ] Navigation menu works
- [ ] Footer displays correctly

### SEO Tests
- [ ] Page titles correct
- [ ] Meta descriptions present
- [ ] Open Graph tags working
- [ ] Favicon displays
- [ ] Sitemap accessible (if configured)

---

## 🔧 Troubleshooting

### If Application Won't Start:
1. Check Node.js version (must be 20+)
2. Review error logs in cPanel
3. Verify `server.js` is set as startup file
4. Check `process.env.PORT` is used in server.js
5. Ensure all dependencies installed

### If Images Don't Load:
1. Verify images are in `/public/` folder
2. Check file permissions (644)
3. Verify image paths start with `/`
4. Check browser console for 404 errors

### If Pages Return 404:
1. Setup reverse proxy in `.htaccess`
2. Verify application is running
3. Check application URL in cPanel matches domain
4. Review server logs

---

## 🎯 Post-Deployment Tasks

### Immediate:
- [ ] Clear browser cache and test
- [ ] Test on multiple devices
- [ ] Share with team for feedback
- [ ] Monitor error logs for first 24 hours

### Within 1 Week:
- [ ] Setup Google Analytics (if desired)
- [ ] Submit to Google Search Console
- [ ] Setup monitoring/uptime alerts
- [ ] Optimize images (compress large files)
- [ ] Enable caching headers

### Ongoing:
- [ ] Regular backups
- [ ] Monitor performance
- [ ] Update content as needed
- [ ] Review and respond to user feedback

---

## 📊 Performance Optimization (Optional)

### Image Optimization:
Current images are 8-13MB each. Recommended actions:
- [ ] Compress images to under 500KB
- [ ] Use WebP format where possible
- [ ] Implement lazy loading (already in Next.js)

### Caching:
- [ ] Add `.htaccess` cache headers
- [ ] Enable Gzip compression
- [ ] Configure browser caching

### Monitoring:
- [ ] Test with Google PageSpeed Insights
- [ ] Check GTmetrix score
- [ ] Monitor server resources in cPanel

---

## 📞 Support Resources

- **HostPinnacle Support:** [Your support portal]
- **cPanel Documentation:** https://docs.cpanel.net/
- **Next.js Docs:** https://nextjs.org/docs
- **Deployment Guide:** `.agent/workflows/deploy-hostpinnacle.md`

---

## 🔄 Future Updates

When making changes to the website:

1. **Make changes locally**
2. **Test thoroughly:** `npm run dev`
3. **Build production:** `npm run build`
4. **Upload changed files only:**
   - Code changes: Upload `.next/`, `app/`, `components/`
   - Data changes: Upload `data/properties.json`
   - Image changes: Upload to `public/`
5. **Restart application** in cPanel
6. **Clear cache and test**

---

**Deployment Date:** _____________
**Deployed By:** _____________
**Notes:** _____________
