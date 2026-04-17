# MedXClaim - Cloudflare Pages Deployment Guide

This guide walks you through hosting MedXClaim on **Cloudflare Pages** — a global CDN with automatic builds and deployments.

## 🚀 Quick Setup (5 minutes)

### Step 1: Push Code to GitHub ✓

Your code is already in Git. Push latest changes:

```bash
cd c:\Users\mufad\MedxClaim
git push origin master
```

### Step 2: Create Cloudflare Account

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with email or Google
3. Complete verification

### Step 3: Connect GitHub Repository

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages**
3. Click **Create** → **Pages** → **Connect to Git**
4. Select **GitHub** and authorize Cloudflare
5. Choose your repository: `MedxClaim`
6. Click **Begin setup**

### Step 4: Configure Build Settings

In the deployment configuration:

- **Project name**: `medxclaim` (or your choice)
- **Production branch**: `master`
- **Framework**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave blank)

**Environment Variables** (add these):
```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

Get these values from your Firebase Console → Project Settings.

### Step 5: Deploy

1. Click **Save and Deploy**
2. Cloudflare builds your site automatically
3. Your site goes live at: `https://medxclaim-RANDOMID.pages.dev`

---

## 🌍 Custom Domain Setup

### Connecting Your Domain

1. Go to **Cloudflare Dashboard** → **Workers & Pages** → **medxclaim**
2. Click **Custom domain**
3. Enter your domain (e.g., `medxclaim.com`)
4. Follow DNS setup for your registrar

### DNS Configuration

If your domain is NOT on Cloudflare DNS:

1. Add Cloudflare nameservers at your registrar:
   - `nora.ns.cloudflare.com`
   - `omar.ns.cloudflare.com`
   
2. OR add CNAME record:
   - **Name**: `@` (or your subdomain)
   - **Type**: `CNAME`
   - **Value**: `medxclaim-RANDOMID.pages.dev`

---

## 🔐 Environment Variables & Secrets

### Add Firebase Environment Variables

1. Pages project → **Settings** → **Environment variables**
2. Add each Firebase credential:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_PROJECT_ID`
   - etc.

3. Set for both **Production** and **Preview** environments

### .env File (Local Development)

Already created as `.env.development` — Vite loads this automatically.

---

## 🔄 Automatic Deployments

Cloudflare Pages automatically redeploys when you:

- Push to `master` branch
- Make PRs (creates preview deployment)
- Merge PRs to master

### Preview Deployments

Every pull request gets a unique preview URL:
- `https://pr-XXX---medxclaim-RANDOMID.pages.dev`

---

## 📊 Monitor Deployments

1. Go to **Workers & Pages** → **medxclaim**
2. Click **View details** on any deployment
3. See build logs, status, and performance metrics

---

## 🚨 Troubleshooting

### Build Fails

Check build logs in Cloudflare Dashboard:
- Common issue: Missing environment variables
- Check `.env.development` is in your repo
- Run `npm run build` locally first to verify

### Firebase Not Working

1. Verify environment variables are set correctly
2. Check Firebase credentials in Cloudflare
3. Ensure CORS is configured in Firebase
4. Test locally: `npm run dev`

### Site Shows 404

- Check `vite.config.js` — ensure build output is `dist`
- Verify all assets are in `public/` folder
- Check routing in `src/App.jsx` for SPA configuration

### Slow Performance

- Cloudflare provides global CDN by default
- Enable **Rocket Loader** in Cloudflare Settings for JS optimization
- Check **Analytics** tab for performance metrics

---

## 📈 Performance Optimization (Cloudflare)

### Enable Caching

1. **Rules** → **Cache Rules**
2. Add rule:
   - **Path**: `/*`
   - **Cache Level**: `Cache Everything`
   - **Browser TTL**: `30 minutes`

### Minification

1. **Speed** → **Optimization**
2. Enable:
   - ✅ Minify JavaScript
   - ✅ Minify CSS
   - ✅ Minify HTML

### Image Optimization

1. **Speed** → **Image Optimization**
2. Enable:
   - ✅ Polish (auto image compression)
   - ✅ WebP conversion

---

## 💡 Advanced: Cloudflare Workers Functions

For serverless APIs (contact form, etc.), use **Functions** in the same Pages project:

```bash
# Create Functions directory
mkdir functions

# Function: functions/contact.js
export async function onRequest(context) {
  if (context.request.method === 'POST') {
    // Handle contact form
    const data = await context.request.json();
    // Process...
    return new Response(JSON.stringify({ success: true }));
  }
}
```

---

## 🔗 Useful Links

- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **Cloudflare Workers Docs**: https://developers.cloudflare.com/workers/
- **Custom Domain**: https://developers.cloudflare.com/pages/platform/custom-domains/
- **Build Configuration**: https://developers.cloudflare.com/pages/platform/build-configuration/

---

## ✅ Deployment Checklist

- [ ] GitHub repository is public (or authorized for Cloudflare)
- [ ] Cloudflare account created
- [ ] Repository connected to Cloudflare Pages
- [ ] Build settings configured correctly
- [ ] Firebase environment variables added
- [ ] First deployment successful
- [ ] Custom domain connected (optional)
- [ ] SSL/TLS certificate active
- [ ] DNS propagated (if using custom domain)

---

## 📞 Support

For Cloudflare Pages support: https://support.cloudflare.com

For MedXClaim issues: Refer to README.md and deployment guides.

---

**Happy hosting! 🎉**
