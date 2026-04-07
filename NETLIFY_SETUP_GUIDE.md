# 🚀 MedXClaim Netlify Production Checklist

Complete this checklist to ensure your site is production-ready on Netlify with medxclaim.com domain.

## ✅ Build & Deployment Setup

- [x] Netlify account created
- [x] GitHub repository connected to Netlify
- [x] Build command configured: `npm ci && npm run build`
- [x] Publish directory configured: `dist`
- [x] Node version set: 18.16.0
- [x] netlify.toml configured with all settings
- [x] GitHub Actions CI/CD workflow ready

## 🌐 Domain Configuration (medxclaim.com)

### In Netlify Dashboard:
1. Go to your MedXClaim project
2. Click **"Site settings"**
3. Go to **"Domain management"**
4. Click **"Add custom domain"**
5. Enter: **medxclaim.com**

### Netlify will show you nameservers:
```
DNS Records Type 1 (Netlify Nameservers):
NS1.NETLIFY.COM
NS2.NETLIFY.COM
NS3.NETLIFY.COM
```

### Steps to Update Domain (Where you bought domain):
1. Log in to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find **DNS Settings** or **Nameservers**
3. Replace existing nameservers with Netlify's:
   - NS1.NETLIFY.COM
   - NS2.NETLIFY.COM
   - NS3.NETLIFY.COM
4. Save changes
5. Wait **24-48 hours** for DNS propagation

**Status Check:**
- [ ] DNS nameservers updated at registrar
- [ ] Waiting for Netlify to verify domain (24-48 hours)
- [ ] Domain management shows "medxclaim.com" connected

## 🔐 SSL/HTTPS Configuration

Netlify automatically provisions a free SSL certificate (Let's Encrypt):
- [ ] SSL certificate auto-provisioned
- [ ] HTTPS enabled by default
- [ ] HTTP redirects to HTTPS automatically

Your site will be accessible at:
- `https://medxclaim.com` ✅
- `https://www.medxclaim.com` (optional subdomain)
- `https://medxclaim.netlify.app` (fallback)

## 📄 Configuration Files ✅ Verified

| File | Purpose | Status |
|------|---------|--------|
| `netlify.toml` | Build & deployment config | ✅ Setup |
| `vite.config.js` | Optimized Vite build | ✅ Setup |
| `.env.example` | Environment template | ✅ Created |
| `public/_redirects` | SPA routing backup | ✅ Created |
| `public/robots.txt` | SEO crawling rules | ✅ Created |
| `public/sitemap.xml` | XML sitemap for SEO | ✅ Created |

## 🔄 Automatic Deployment Workflow ✅

**Development Workflow:**
```bash
# Make changes locally
git add .
git commit -m "Your message"
git push origin master
```

**What happens automatically:**
1. ✅ GitHub receives your push
2. ✅ Netlify webhook triggered
3. ✅ `npm ci` - Dependencies installed
4. ✅ `npm run build` - Project built to `/dist`
5. ✅ `/dist` deployed to Netlify CDN
6. ✅ Site updates live in 30-120 seconds

**Monitor in Netlify:**
- Visit: `https://app.netlify.com`
- Dashboard → Your Site → **"Deploys"** tab
- Green ✅ = Deployed successfully
- Red ❌ = Build failed (check logs)

## 🎯 Pre-Production Checks

### Functionality
- [ ] All pages load correctly
- [ ] Navigation (React Router) works on all routes
- [ ] Mobile responsive (test on phone)
- [ ] Animations work smoothly
- [ ] Forms work (if applicable)
- [ ] Contact form submissions work
- [ ] Links are functional

### Performance
- [ ] Page loads in under 3 seconds
- [ ] Images optimized (use WebP where possible)
- [ ] No console errors
- [ ] No 404 errors
- [ ] Lighthouse score: 80+

### SEO & Meta Tags
- [ ] Page titles descriptive for each route
- [ ] Meta descriptions added
- [ ] Open Graph meta tags (social media preview)
- [ ] robots.txt accessible at `/robots.txt`
- [ ] sitemap.xml accessible at `/sitemap.xml`

### Security
- [ ] No sensitive data in code
- [ ] No API keys exposed
- [ ] Security headers configured (in netlify.toml)
- [ ] HTTPS enforced
- [ ] No mixed content warnings

### Monitoring
- [ ] Netlify analytics enabled (optional)
- [ ] Error tracking set up (optional)
- [ ] Contact form notifications working

## 📊 Netlify Dashboard Checklist

In your Netlify dashboard:

### Site Settings
- [ ] Site name: `medxclaim`
- [ ] Domain: `medxclaim.com`
- [ ] Build command: `npm ci && npm run build`
- [ ] Publish directory: `dist`
- [ ] Node version: 18.x

### Build Settings (Site Settings → Build & Deploy → Build settings)
- [ ] Repository connected
- [ ] Branch to deploy: `master`
- [ ] Build command: `npm ci && npm run build`
- [ ] Publish directory: `dist`

### Environment Variables (if needed)
- [ ] Add any `.env` variables here:
  - Go to: **Site settings** → **Build & deploy** → **Environment**
  - Add variables like `VITE_API_URL`, etc.

### Domain Settings
- [ ] Custom domain: `medxclaim.com`
- [ ] SSL certificate: Provisioned automatically
- [ ] DNS: Configured with Netlify nameservers

## 🚨 Troubleshooting

### Build Fails on Netlify
**Check:**
1. Netlify **Deploys** tab → Click failed deploy
2. Look at build log for error message
3. Compare with `npm run build` locally
4. Common issues:
   - Missing dependencies: Run `npm ci` locally
   - Node version mismatch: Update netlify.toml
   - File encoding issues: Check `.gitignore`

### Site Shows Old Version
**Solution:**
1. Hard refresh: `Ctrl+Shift+Delete` (clear cache)
2. Wait 5 minutes for CDN update
3. Check Netlify **Deploys** tab for status
4. Purge cache: Visit https://purge.netlify.com

### Domain Not Working After 48 Hours
**Check:**
1. Netlify shows "DNS verification pending"?
2. Verify nameservers at domain registrar
3. Use DNS checker: https://www.whatsmydns.net
4. Search for "medxclaim.com"
5. All records should show Netlify nameservers

### 404 Errors on Routes
**Cause:** SPA routing not configured  
**Solution:**
1. Check `netlify.toml` has redirects configured
2. Verify `public/_redirects` file exists
3. Both should redirect `/* → /index.html`

## 📞 Quick Support Links

| Resource | Link |
|----------|------|
| Netlify Docs | https://docs.netlify.com |
| Create Deploy Key | https://docs.netlify.com/cli/get-started |
| DNS Setup Help | https://docs.netlify.com/domains-https/custom-domains/configure-external-dns |
| Domain Registrar Help | Contact your registrar support |
| Verify DNS | https://www.whatsmydns.net |

## 🎉 Final Setup Steps

1. **Update DNS at Registrar**
   ```
   Registrar: [GoDaddy/Namecheap/etc]
   Nameservers:
   - NS1.NETLIFY.COM
   - NS2.NETLIFY.COM
   - NS3.NETLIFY.COM
   ```

2. **Wait for DNS Propagation** (24-48 hours)

3. **Verify Domain Connected**
   - Netlify dashboard should show: ✅ medxclaim.com

4. **Check Site Live**
   - Visit: https://medxclaim.com
   - Should load your site (not Netlify 404)

5. **Monitor First Deployment**
   - First deployment might take 2-5 minutes
   - Check **Deploys** tab for progress
   - CSS/JS should load properly

6. **Test All Features**
   - All routes working?
   - Mobile responsive?
   - No console errors?
   - Contact form working?

## ✨ Success Indicators

✅ **You're done when:**
- Site loads at https://medxclaim.com
- All pages accessible
- Mobile view works
- No console errors
- Netlify shows green deploy status
- DNS shows Netlify nameservers

---

**Questions?** Check [docs.netlify.com](https://docs.netlify.com) or your registrar's support.
