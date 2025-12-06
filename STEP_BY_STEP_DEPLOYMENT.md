# 🚀 OLSHANI PROPERTIES - HOSTPINNACLE DEPLOYMENT GUIDE
## Step-by-Step Instructions (Crystal Clear)

---

## 📋 BEFORE YOU START

### What You Need:
1. ✅ Your HostPinnacle cPanel login credentials
2. ✅ The ZIP file: `olshani-deployment.zip` (571 MB)
3. ✅ About 45 minutes of time
4. ✅ Stable internet connection

### Where is the ZIP file?
```
Location: g:\Etcetera\Ben\Olshani\Olshani Listings\olshani-deployment.zip
Size: 571 MB
```

---

# PART 1: UPLOAD TO CPANEL

## STEP 1: LOGIN TO CPANEL

### 1.1 Open Your Browser
- Open **Google Chrome**, **Firefox**, or **Edge**
- Use a modern browser (not Internet Explorer)

### 1.2 Go to cPanel Login Page
Your cPanel URL will be ONE of these formats:
- `https://olshaniproperties.co.ke:2083`
- `https://cpanel.olshaniproperties.co.ke`
- Or a URL provided by HostPinnacle in your welcome email

**Type the URL** in your browser's address bar and press **Enter**

### 1.3 Enter Your Credentials
You'll see a login page with two fields:

```
Username: [your-cpanel-username]
Password: [your-cpanel-password]
```

**Type your username** (the one HostPinnacle gave you)  
**Type your password** (the one HostPinnacle gave you)  
**Click the "Log in" button**

### 1.4 Verify You're Logged In
You should now see the cPanel dashboard with many icons/sections like:
- Files
- Databases
- Email
- Domains
- Software
- Advanced

✅ **If you see this dashboard, you're in!**  
❌ **If you get an error, double-check your username/password**

---

## STEP 2: OPEN FILE MANAGER

### 2.1 Find the File Manager Icon
On the cPanel dashboard:
- Look for a section called **"FILES"**
- Inside that section, find an icon labeled **"File Manager"**
- It usually has a folder icon 📁

### 2.2 Click File Manager
**Click once** on the "File Manager" icon

A new window or tab will open showing your file system

### 2.3 Navigate to public_html
In the File Manager window:
- On the **left sidebar**, you'll see a folder tree
- Look for a folder named **"public_html"**
- **Click once** on "public_html" to select it

The right side will now show the contents of public_html (might be empty or have some files)

✅ **You should see "public_html" highlighted on the left**  
✅ **The path at the top should show: /home/[username]/public_html**

---

## STEP 3: UPLOAD THE ZIP FILE

### 3.1 Click the Upload Button
In the File Manager toolbar (top of the page):
- Look for a button labeled **"Upload"**
- It might have an upload arrow icon ⬆️
- **Click the "Upload" button**

A new page will open titled "Upload Files"

### 3.2 Select the ZIP File
On the Upload Files page:
- You'll see a section that says **"Select File"** or has a **"Choose File"** button
- **Click "Choose File"** (or "Select File")

A file browser window will open

### 3.3 Navigate to the ZIP File
In the file browser:
1. **Navigate to:** `G:\Etcetera\Ben\Olshani\Olshani Listings\`
2. **Look for:** `olshani-deployment.zip` (571 MB)
3. **Click once** on the file to select it
4. **Click "Open"** button

### 3.4 Wait for Upload
Back on the Upload Files page:
- You'll see a **progress bar** showing the upload
- It will show: "Uploading olshani-deployment.zip"
- **Percentage** will increase: 1%... 10%... 50%... 100%

**IMPORTANT:**
- ⏱️ **This will take 5-15 minutes** (depending on your internet speed)
- ⚠️ **DO NOT close the browser** during upload
- ⚠️ **DO NOT close the tab** during upload
- ✅ **You can minimize the window** but don't close it

### 3.5 Verify Upload Complete
When upload is done:
- Progress bar will show **100%**
- You'll see a **green checkmark** ✅
- Or text saying **"Upload complete"**

**Click the "Go Back to..." link** or **close the upload tab**

### 3.6 Confirm File is There
Back in File Manager:
- You should now see **"olshani-deployment.zip"** in the file list
- It should show size: **571 MB** (or similar)

✅ **If you see the ZIP file, upload successful!**

---

## STEP 4: EXTRACT THE ZIP FILE

### 4.1 Select the ZIP File
In File Manager:
- **Click once** on `olshani-deployment.zip` to select it
- The row should be **highlighted** (usually blue or gray)

### 4.2 Right-Click the ZIP File
- **Right-click** on the highlighted ZIP file
- A context menu will appear with options

### 4.3 Click "Extract"
From the context menu:
- **Click "Extract"** (or "Extract Files")

A popup window will appear titled "Extract"

### 4.4 Verify Extraction Path
In the Extract popup:
- You'll see a field showing the path: `/home/[username]/public_html`
- **Leave this as is** (don't change it)
- There might be a checkbox "Extract files to this directory"
- **Make sure it's checked** ✅

### 4.5 Click "Extract File(s)" Button
At the bottom of the popup:
- **Click the "Extract File(s)" button**

### 4.6 Wait for Extraction
A progress window will appear:
- Shows: "Extracting files..."
- **This will take 2-5 minutes**
- ⚠️ **DO NOT close the window**

### 4.7 Verify Extraction Complete
When done:
- You'll see a message: **"Extraction Results"** or **"Files extracted successfully"**
- **Click "Close"** button

### 4.8 Confirm Files Are Extracted
Back in File Manager, you should now see:
- ✅ `.next` (folder)
- ✅ `public` (folder)
- ✅ `app` (folder)
- ✅ `components` (folder)
- ✅ `data` (folder)
- ✅ `lib` (folder)
- ✅ `hooks` (folder)
- ✅ `styles` (folder)
- ✅ `package.json` (file)
- ✅ `package-lock.json` (file)
- ✅ `server.js` (file)
- ✅ `.htaccess` (file)
- ✅ And other files...

✅ **If you see all these folders/files, extraction successful!**

### 4.9 Delete the ZIP File (Optional)
To save space:
- **Click once** on `olshani-deployment.zip`
- **Right-click** → **Delete**
- **Confirm** deletion

---

# PART 2: SETUP NODE.JS APPLICATION

## STEP 5: OPEN NODE.JS APP MANAGER

### 5.1 Go Back to cPanel Main Page
- **Click the "Home" button** (usually top-left corner)
- Or **click the cPanel logo**
- You should be back at the main cPanel dashboard

### 5.2 Find "Setup Node.js App"
On the cPanel dashboard:
- Look for a section called **"SOFTWARE"**
- Inside that section, find **"Setup Node.js App"** or **"Node.js Selector"**
- It might have a Node.js logo (green hexagon)

**If you can't find it:**
- Use the **search box** at the top of cPanel
- Type: **"node"**
- Click on **"Setup Node.js App"** in the results

### 5.3 Click "Setup Node.js App"
**Click once** on the icon

A new page will open showing Node.js applications

---

## STEP 6: CREATE NODE.JS APPLICATION

### 6.1 Click "Create Application"
On the Node.js Apps page:
- You'll see a button labeled **"Create Application"** or **"+ Create Application"**
- **Click this button**

A form will appear with several fields

### 6.2 Fill in Application Details

**IMPORTANT: Fill in EXACTLY as shown below**

#### Field 1: Node.js version
- **Click the dropdown** next to "Node.js version"
- **Select:** The highest version available (should be **20.x** or higher)
- Examples: "20.11.0", "20.12.1", "21.0.0"
- ⚠️ **Must be version 20 or higher!**

#### Field 2: Application mode
- **Click the dropdown** next to "Application mode"
- **Select:** **Production**
- (NOT Development, NOT Staging)

#### Field 3: Application root
- You'll see a field with a path
- **Type or verify it shows:** `/home/[your-username]/public_html`
- Replace `[your-username]` with your actual cPanel username
- Example: `/home/olshani/public_html`

#### Field 4: Application URL
- **Click the dropdown** or **type in the field**
- **Enter:** `olshaniproperties.co.ke`
- (Without https:// or www.)

#### Field 5: Application startup file
- **Type:** `server.js`
- (Exactly as shown, case-sensitive)

#### Field 6: Passenger log file (if shown)
- **Leave as default** or leave blank

#### Field 7: Environment variables (if shown)
- **Leave blank** for now

### 6.3 Double-Check Your Entries
Before clicking Create, verify:
- ✅ Node.js version: **20.x or higher**
- ✅ Application mode: **Production**
- ✅ Application root: `/home/[username]/public_html`
- ✅ Application URL: `olshaniproperties.co.ke`
- ✅ Application startup file: `server.js`

### 6.4 Click "Create" Button
At the bottom of the form:
- **Click the "Create" button**

### 6.5 Wait for Creation
- A loading indicator will appear
- **Wait 10-30 seconds**

### 6.6 Verify Application Created
You should see:
- ✅ A success message: "Application created successfully"
- ✅ Your application listed in the table
- ✅ Status might show "Stopped" or "Running"

**IMPORTANT:** The page will show a command like:
```
source /home/[username]/nodevenv/public_html/20/bin/activate && cd /home/[username]/public_html
```

**Copy this command** (you'll need it in the next step)

---

# PART 3: INSTALL DEPENDENCIES

## STEP 7: OPEN TERMINAL

### 7.1 Go Back to cPanel Main Page
- **Click "Home"** or the **cPanel logo**

### 7.2 Find Terminal
On the cPanel dashboard:
- Look for a section called **"ADVANCED"**
- Find **"Terminal"** (might have a command prompt icon >_)

**If you can't find it:**
- Use the **search box** at top
- Type: **"terminal"**
- Click **"Terminal"** in results

### 7.3 Click Terminal
**Click once** on the Terminal icon

A new window/tab will open with a black screen and command prompt

You'll see something like:
```
[username@server ~]$
```

✅ **This is your terminal - you can type commands here**

---

## STEP 8: NAVIGATE TO YOUR APPLICATION

### 8.1 Type the Change Directory Command
In the terminal, **type exactly:**
```bash
cd ~/public_html
```

**Press Enter**

### 8.2 Verify You're in the Right Place
**Type:**
```bash
pwd
```

**Press Enter**

You should see:
```
/home/[your-username]/public_html
```

### 8.3 List Files to Confirm
**Type:**
```bash
ls
```

**Press Enter**

You should see the list of folders/files:
```
app  components  data  hooks  lib  package.json  public  server.js  styles  .next  ...
```

✅ **If you see these files, you're in the right directory!**

---

## STEP 9: ACTIVATE NODE.JS ENVIRONMENT

### 9.1 Run the Activation Command
Remember the command from Step 6.6? If not, it looks like:
```bash
source /home/[username]/nodevenv/public_html/20/bin/activate
```

**Type this command** (replace [username] with your actual username)

**Press Enter**

### 9.2 Verify Node.js is Active
Your command prompt should change to show:
```
(public_html:20) [username@server public_html]$
```

The `(public_html:20)` part shows Node.js is active

### 9.3 Check Node.js Version
**Type:**
```bash
node --version
```

**Press Enter**

You should see:
```
v20.11.0
```
(or similar version 20+)

✅ **If you see v20.x.x, Node.js is ready!**

---

## STEP 10: INSTALL DEPENDENCIES

### 10.1 Run npm Install
**Type exactly:**
```bash
npm install --production
```

**Press Enter**

### 10.2 Wait for Installation
You'll see:
```
npm WARN deprecated ...
added 245 packages in 3m
```

**IMPORTANT:**
- ⏱️ **This will take 5-10 minutes**
- You'll see lots of text scrolling
- Package names will appear
- Some warnings are normal (yellow text)
- ⚠️ **DO NOT close the terminal**
- ⚠️ **DO NOT press Ctrl+C**

### 10.3 Watch for Completion
Installation is complete when you see:
```
added XXX packages in XXm
```

And the command prompt returns:
```
(public_html:20) [username@server public_html]$
```

✅ **If you see the prompt again, installation is complete!**

### 10.4 Verify Installation
**Type:**
```bash
ls node_modules
```

**Press Enter**

You should see a long list of folder names (packages)

✅ **If you see many folders, dependencies are installed!**

---

# PART 4: START THE APPLICATION

## STEP 11: RESTART THE APPLICATION

### 11.1 Go Back to cPanel
- **Switch back** to the cPanel browser tab
- Or **open a new tab** and login to cPanel again

### 11.2 Open "Setup Node.js App"
- **Click "Home"** to go to cPanel dashboard
- **Find and click** "Setup Node.js App" (like you did in Step 5)

### 11.3 Find Your Application
On the Node.js Apps page:
- You should see your application listed
- It shows:
  - **App URI:** olshaniproperties.co.ke
  - **App Root:** /home/[username]/public_html
  - **Status:** Might say "Stopped" or "Running"

### 11.4 Click the Pencil/Edit Icon
Next to your application:
- **Click the pencil icon** ✏️ (Edit)
- Or **click the application row** to expand it

### 11.5 Click "Restart" Button
In the application details:
- Look for a button labeled **"Restart"** or **"Start"**
- **Click the "Restart" button**

### 11.6 Wait for Restart
- A loading indicator will appear
- **Wait 5-10 seconds**

### 11.7 Verify Application is Running
After restart:
- **Status** should change to: **"Running"** ✅
- Or show a **green indicator**

✅ **If status shows "Running", your app is live!**

---

# PART 5: SETUP SSL CERTIFICATE

## STEP 12: INSTALL SSL CERTIFICATE

### 12.1 Go to cPanel Main Page
- **Click "Home"** or the **cPanel logo**

### 12.2 Find "SSL/TLS Status"
On the cPanel dashboard:
- Look for a section called **"SECURITY"**
- Find **"SSL/TLS Status"**
- It might have a padlock icon 🔒

**If you can't find it:**
- Use the **search box**
- Type: **"ssl"**
- Click **"SSL/TLS Status"**

### 12.3 Click "SSL/TLS Status"
**Click once** on the icon

A page will open showing your domains

### 12.4 Find Your Domain
On the SSL/TLS Status page:
- Look for **"olshaniproperties.co.ke"** in the list
- Check the **"AutoSSL"** column

### 12.5 Run AutoSSL
If AutoSSL is not active:
- **Check the checkbox** next to your domain
- **Click "Run AutoSSL"** button at the bottom

If AutoSSL is already active:
- ✅ **You're good! SSL is already installed**
- Skip to Step 13

### 12.6 Wait for SSL Installation
- A progress indicator will appear
- **Wait 2-5 minutes**
- You'll see: "Installing SSL certificate..."

### 12.7 Verify SSL Installed
When complete:
- You'll see a **green checkmark** ✅ next to your domain
- Or text saying: **"Certificate installed"**

✅ **If you see the checkmark, SSL is active!**

---

# PART 6: VERIFY .HTACCESS FILE

## STEP 13: CHECK .HTACCESS CONFIGURATION

### 13.1 Go to File Manager
- **Click "Home"** to go to cPanel dashboard
- **Click "File Manager"**

### 13.2 Navigate to public_html
- **Click "public_html"** in the left sidebar

### 13.3 Show Hidden Files
At the top right of File Manager:
- **Click "Settings"** button (gear icon ⚙️)
- A popup will appear
- **Check the box:** "Show Hidden Files (dotfiles)"
- **Click "Save"**

### 13.4 Find .htaccess File
In the file list:
- Look for a file named **".htaccess"**
- It should be there (you uploaded it in the ZIP)

### 13.5 Verify .htaccess Content
- **Right-click** on `.htaccess`
- **Click "Edit"** or **"Code Edit"**
- A text editor will open

### 13.6 Check the Content
The file should contain:
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

### 13.7 Check Port Number
**IMPORTANT:** The last line shows `localhost:3000`

**Go back to "Setup Node.js App"** and check what port your app is using:
- If it shows **port 3000**, you're good ✅
- If it shows a **different port** (e.g., 3001, 3002), you need to update .htaccess

### 13.8 Update Port if Needed
If port is different:
- In the `.htaccess` editor, change:
  ```apache
  RewriteRule ^(.*)$ http://localhost:YOUR_PORT/$1 [P,L]
  ```
- Replace `YOUR_PORT` with the actual port number
- **Click "Save Changes"**
- **Close** the editor

✅ **If .htaccess is correct, you're ready to test!**

---

# PART 7: TEST YOUR WEBSITE

## STEP 14: VISIT YOUR WEBSITE

### 14.1 Open a New Browser Tab
- **Open a new tab** in your browser
- Or **open a new incognito/private window** (recommended)

### 14.2 Type Your Domain
In the address bar, **type:**
```
https://olshaniproperties.co.ke
```

**Press Enter**

### 14.3 Wait for Page Load
- **Wait 5-10 seconds** for the first load
- The page might take a moment to start

### 14.4 Check for Success
You should see:
- ✅ **Your homepage loads**
- ✅ **Olshani Properties logo** at the top
- ✅ **Hero section** with images
- ✅ **Project listings** below
- ✅ **Padlock icon** 🔒 in the address bar (HTTPS)

✅ **If you see your website, DEPLOYMENT SUCCESSFUL!** 🎉

---

## STEP 15: TEST ALL PAGES

### 15.1 Test Homepage
- ✅ Scroll down the page
- ✅ Check that images load
- ✅ Check that project cards display

### 15.2 Test Project Listings
- **Click on a project card** (e.g., "DIPLOMAT", "GAIA")
- ✅ Project details page should load
- ✅ Images should display
- ✅ Unit information should show

### 15.3 Test Navigation
Click each menu item:
- **Home** - should go to homepage
- **About** - should load about page
- **Contact** - should load contact page

### 15.4 Test Search/Filters
On the homepage:
- **Try the search box** - type a project name
- **Try location filter** - select "Westlands" or "Kilimani"
- **Try price filter** - select a price range
- ✅ Results should filter correctly

### 15.5 Test WhatsApp Button
- Look for the **WhatsApp button** (usually bottom-right)
- **Click it**
- ✅ Should open WhatsApp with number 0702168686

### 15.6 Check Browser Console
- **Press F12** on your keyboard
- **Click "Console" tab**
- ✅ Should see no red errors
- (Yellow warnings are okay)

---

## STEP 16: TEST ON MOBILE

### 16.1 Open on Your Phone
- **Take out your phone**
- **Open browser** (Chrome, Safari, etc.)
- **Type:** `https://olshaniproperties.co.ke`

### 16.2 Check Mobile View
- ✅ Page should be responsive
- ✅ Menu should work (hamburger menu)
- ✅ Images should load
- ✅ All features should work

---

# TROUBLESHOOTING

## Problem 1: Website Shows "Site Can't Be Reached"

**Possible Causes:**
- Application not running
- Wrong domain configuration
- DNS not propagated

**Solutions:**

### Solution A: Restart Application
1. Go to cPanel → Setup Node.js App
2. Click "Restart" on your application
3. Wait 30 seconds
4. Try accessing website again

### Solution B: Check Application Status
1. Go to cPanel → Setup Node.js App
2. Check if status shows "Running"
3. If "Stopped", click "Start"

### Solution C: Check Logs
1. Go to cPanel → Setup Node.js App
2. Click your application
3. Click "Open Logs"
4. Look for error messages
5. Common errors:
   - "Cannot find module" → Run `npm install` again
   - "Port already in use" → Restart application
   - "ENOENT" → File missing, re-upload

---

## Problem 2: Images Not Loading

**Symptoms:**
- Broken image icons 🖼️
- Alt text showing instead of images

**Solutions:**

### Solution A: Check File Permissions
1. Go to File Manager
2. Navigate to `public_html/public/`
3. Select all image files
4. Right-click → "Change Permissions"
5. Set to: **644** (rw-r--r--)
6. Click "Change Permissions"

### Solution B: Verify Images Exist
1. Go to File Manager
2. Navigate to `public_html/public/`
3. Check that these files exist:
   - Projects_Diplomat.jpg
   - Projects_Misty.jpg
   - Gaia-01.jpg, Gaia-02.jpg, Gaia-03.jpg
   - All other project images

### Solution C: Clear Browser Cache
1. Press **Ctrl + Shift + Delete**
2. Select "Cached images and files"
3. Click "Clear data"
4. Reload website

---

## Problem 3: 404 Error on Page Refresh

**Symptoms:**
- Homepage works
- Clicking links works
- Refreshing a page shows 404

**Solutions:**

### Solution A: Check .htaccess
1. Go to File Manager
2. Open `.htaccess`
3. Verify it has the proxy rules (see Step 13.6)
4. Save if you made changes

### Solution B: Enable mod_rewrite
1. Contact HostPinnacle support
2. Ask them to enable "mod_rewrite" for Apache
3. Wait for confirmation
4. Test again

---

## Problem 4: SSL Not Working (No Padlock)

**Symptoms:**
- Website loads but shows "Not Secure"
- No padlock icon

**Solutions:**

### Solution A: Run AutoSSL Again
1. Go to cPanel → SSL/TLS Status
2. Select your domain
3. Click "Run AutoSSL"
4. Wait 5 minutes
5. Test again

### Solution B: Force HTTPS
1. Verify `.htaccess` has HTTPS redirect (see Step 13.6)
2. Clear browser cache
3. Visit `https://olshaniproperties.co.ke` (with https://)

---

## Problem 5: Application Keeps Stopping

**Symptoms:**
- Application shows "Running" but then stops
- Website works briefly then stops

**Solutions:**

### Solution A: Check Memory Usage
1. Contact HostPinnacle support
2. Ask about memory limits
3. Next.js needs at least 512MB RAM
4. Upgrade plan if needed

### Solution B: Check Error Logs
1. Go to Setup Node.js App
2. Click "Open Logs"
3. Look for "out of memory" errors
4. If found, upgrade hosting plan

### Solution C: Use PM2 (Advanced)
If HostPinnacle allows:
```bash
npm install -g pm2
pm2 start server.js --name olshani
pm2 startup
pm2 save
```

---

# FINAL CHECKLIST

## ✅ Deployment Complete When:

- [ ] ZIP file uploaded to cPanel
- [ ] ZIP file extracted successfully
- [ ] All folders visible in public_html
- [ ] Node.js application created (v20+)
- [ ] Dependencies installed (npm install completed)
- [ ] Application status shows "Running"
- [ ] SSL certificate installed (padlock visible)
- [ ] .htaccess file configured correctly
- [ ] Website loads at https://olshaniproperties.co.ke
- [ ] Homepage displays correctly
- [ ] All project pages work
- [ ] Images load properly
- [ ] Navigation menu works
- [ ] Search/filters function
- [ ] WhatsApp button works
- [ ] No console errors (F12)
- [ ] Mobile responsive
- [ ] All pages tested

---

# FUTURE UPDATES

## How to Update Your Website Later

### When You Make Changes:

1. **On Your Computer:**
   ```bash
   cd "g:\Etcetera\Ben\Olshani\Olshani Listings"
   npm run build
   ```

2. **Create New ZIP:**
   - Zip only the changed files
   - Or create full deployment ZIP again

3. **Upload to cPanel:**
   - File Manager → Upload ZIP
   - Extract (overwrite existing files)

4. **Restart Application:**
   - Setup Node.js App → Restart

5. **Test:**
   - Visit website
   - Verify changes appear

---

# SUPPORT CONTACTS

## HostPinnacle Support
- **Email:** support@hostpinnacle.co.ke (check your welcome email)
- **Phone:** Check your hosting account
- **Live Chat:** Usually available in cPanel

## Common Support Requests
- "Please enable Node.js version 20"
- "Please enable mod_rewrite for my domain"
- "Please increase memory limit to 512MB"
- "Please enable SSH access"

---

# CONGRATULATIONS! 🎉

If you've completed all steps and your website is live at:

**https://olshaniproperties.co.ke**

**YOU'VE SUCCESSFULLY DEPLOYED YOUR WEBSITE!**

---

**Created:** December 6, 2025  
**Version:** 1.0 - Crystal Clear Edition  
**Total Steps:** 16 main steps  
**Estimated Time:** 30-45 minutes  
**Difficulty:** Beginner-Friendly

---

**Questions? Issues? Check the Troubleshooting section above!**
