# 🚀 GitHub + Netlify Continuous Deployment Guide

## Overview

Your MedXClaim project is now set up for **automatic continuous deployment**. Here's how it works:

1. **You make changes** to your code
2. **You push to GitHub** (master branch)
3. **Netlify automatically detects** the change
4. **Netlify builds and deploys** your site
5. **Live site updates** automatically in seconds

## ✅ Setup Status

- ✅ GitHub repository configured: `https://github.com/medxclaim-site/MedXClaim`
- ✅ `netlify.toml` configuration created
- ✅ Project pushed to GitHub
- ⏳ **NEXT:** Connect Netlify to GitHub (see instructions below)

## 🔗 How to Connect Netlify to GitHub (One-Time Setup)

### Step 1: Go to Netlify Dashboard
1. Visit [https://app.netlify.com](https://app.netlify.com)
2. Click **"New site from Git"** button

### Step 2: Connect GitHub
1. Click **"GitHub"** under "Connect to Git provider"
2. Authorize Netlify to access your GitHub account
3. Choose the repository: **`medxclaim-site/MedXClaim`**

### Step 3: Configure Build Settings
Netlify should auto-detect these settings:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18 (automatically set)

Leave these as-is. If Netlify doesn't auto-detect:
- Manually set Build command to: `npm run build`
- Manually set Publish directory to: `dist`

### Step 4: Deploy
1. Click **"Deploy site"**
2. Wait for the build to complete (usually 1-2 minutes)
3. Your site will be live at a `.netlify.app` domain

### Step 5: Custom Domain (Optional)
1. In Netlify site settings, go to **"Domain management"**
2. Click **"Add custom domain"**
3. Enter your domain and follow the DNS setup

## 🔄 Automatic Deployment Workflow

### After initial Netlify setup, here's your workflow:

**Local Development:**
```bash
# Make changes to your code
git add .
git commit -m "feat: Add new feature"
git push origin master
```

**What happens automatically:**
1. ✅ GitHub receives the push
2. ✅ Netlify webhook is triggered
3. ✅ Netlify pulls latest code from GitHub
4. ✅ Netlify runs: `npm run build`
5. ✅ Netlify deploys `dist` folder
6. ✅ Your site is LIVE (visible in seconds)

## 📊 Deployment Logs

To monitor deployments:
1. Go to Netlify dashboard
2. Click your site: **MedXClaim**
3. Go to **"Deploys"** tab
4. View build logs by clicking on any deployment
5. Check status: Success ✅ or Failed ❌

## 🎯 Creating a Custom Domain

If you have a domain (e.g., `medxclaim.com`):

1. In Netlify site settings → **Domain management**
2. Click **"Add custom domain"**
3. Netlify will show your nameservers
4. Update your domain registrar with Netlify's nameservers
5. Wait 24-48 hours for DNS to propagate

## ⚙️ netlify.toml Configuration

The `netlify.toml` file in your repo contains:

- **Build command:** How to build the project
- **Publish directory:** `dist` - the folder Netlify deploys
- **Redirects:** All routes → `/index.html` (for React Router)
- **Security headers:** Protection against XSS, clickjacking, etc.
- **Cache control:** Smart caching for assets and HTML

## 🚨 Troubleshooting

### Build Fails on Netlify
**Problem:** Build works locally but fails on Netlify  
**Solution:**
1. Check Netlify build logs for errors
2. Ensure `npm install` completes successfully
3. Check environment variables if needed
4. Verify Node version matches (18+)

### Site Shows Old Version After Push
**Problem:** Code updated but site unchanged  
**Solution:**
1. Wait 2-3 minutes for build to complete
2. Hard refresh browser: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
3. Check Netlify deploy status in dashboard
4. Clear browser cache at: [https://purge.netlify.com](https://purge.netlify.com)

### Build Takes Too Long
**Solution:** This is normal for first deployment (2-5 minutes)  
Subsequent deployments are faster due to caching

## 📝 Making Changes and Deploying

### Workflow Example:

1. **Make changes** in VS Code
2. **Test locally:**
   ```bash
   npm run dev
   # Visit http://localhost:5173 to test
   ```
3. **Commit changes:**
   ```bash
   git add .
   git commit -m "fix: Update homepage content"
   ```
4. **Push to GitHub:**
   ```bash
   git push origin master
   ```
5. **Monitor Netlify:**
   - Go to Netlify dashboard
   - Watch the "Deploys" tab
   - Site updates automatically when build completes

## 🔐 Environment Variables (If Needed)

If you need environment variables (API keys, etc.):

1. Create a `.env` file locally (not committed to Git)
2. In Netlify dashboard → **Site settings** → **Build & deploy** → **Environment**
3. Add your variables there
4. They'll be available during builds

Example `.env`:
```
VITE_API_URL=https://api.example.com
VITE_API_KEY=your-secret-key
```

## ✅ Deployment Checklist

- [x] Repository on GitHub
- [x] `netlify.toml` configured
- [ ] **Connect Netlify to GitHub** (do this now!)
- [ ] Set custom domain (optional)
- [ ] Test deployment workflow
- [ ] Update site URL in GitHub repo description

## 🎉 Next Steps

1. **Go to Netlify:** [https://app.netlify.com](https://app.netlify.com)
2. **Click:** "New site from Git"
3. **Select:** GitHub → medxclaim-site/MedXClaim
4. **Click:** "Deploy site"
5. **Done!** Your site is now live and auto-deploying

## 📞 Netlify Support

- **Documentation:** [https://docs.netlify.com](https://docs.netlify.com)
- **Support:** [https://app.netlify.com/support](https://app.netlify.com/support)

---

Once you complete the Netlify setup, every push to the master branch will automatically deploy your site! 🚀
