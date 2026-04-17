# 🌍 Hostinger + Cloudflare Pages: Complete Setup Guide

## Your Setup
- **Domain**: medxclaim.com (registered at Hostinger)
- **Hosting**: Cloudflare Pages
- **Account**: medxclaim@gmail.com

---

## 📋 STEP 1: Update Hostinger Nameservers (15 minutes)

### In Hostinger Control Panel

1. Go to: https://hpanel.hostinger.com
2. Log in with your Hostinger account
3. Find your domain: **medxclaim.com**
4. Click on it
5. Go to **DNS records** or **Nameservers**
6. Look for the nameserver section

### Replace Nameservers

Delete any existing nameservers and add **EXACTLY these two**:

```
nora.ns.cloudflare.com
omar.ns.cloudflare.com
```

**Save/Update**

⏳ **Wait 5-48 hours** for DNS to propagate globally

---

## 🔧 STEP 2: Get Your Firebase Credentials (5 minutes)

### Open Firebase Console

1. Go to: https://console.firebase.google.com
2. Select your **MedXClaim** project
3. Click ⚙️ **Settings** (top-left, gear icon)
4. Click **Project Settings**
5. Scroll down to find **"Web API configuration"**

### Copy These Values

You'll see something like this. **Copy all 6 values**:

```
API Key: AIzaSyD_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
Auth Domain: medxclaim-xxxxx.firebaseapp.com
Project ID: medxclaim-xxxxx
Storage Bucket: medxclaim-xxxxx.appspot.com
Messaging Sender ID: 123456789012
App ID: 1:123456789012:web:abcdef1234567890abcd
```

**KEEP THIS SAFE** - Don't share these with anyone

---

## ☁️ STEP 3: Deploy to Cloudflare Pages (10 minutes)

### Check If Already Deployed

1. Go to: https://dash.cloudflare.com
2. Log in with **medxclaim@gmail.com**
3. Left sidebar → **Workers & Pages**
4. Do you see **"medxclaim"** project?
   - **YES** → Skip to STEP 4
   - **NO** → Follow below

### Deploy (If Not Already Done)

1. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Click **GitHub**
3. Authorize Cloudflare (follow prompts)
4. Select **MedxClaim** repository
5. Click **Begin setup**

### Configure Build

- **Project name**: `medxclaim`
- **Production branch**: `master`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: (leave blank)

### Click **Save and Deploy**

⏳ Wait 2-3 minutes for the build to complete

Your temporary URL: `https://medxclaim-RANDOMID.pages.dev`

---

## 🔐 STEP 4: Add Firebase Environment Variables (10 minutes)

### In Cloudflare Dashboard

1. **Workers & Pages** → **medxclaim**
2. **Settings** → **Environment variables**

### Add 6 Variables

For **each** of the values from Firebase (STEP 2), add them:

**Click "+ Add variable"** and enter:

| Variable Name | Value (from Firebase) |
|---|---|
| `VITE_FIREBASE_API_KEY` | Paste your API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Paste your Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | Paste your Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Paste your Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Paste your Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | Paste your App ID |

**IMPORTANT**: Set each variable for **BOTH**:
- ✅ Production
- ✅ Preview

**Click Save after each variable**

---

## 🌐 STEP 5: Connect medxclaim.com Domain (5 minutes)

### In Cloudflare Pages

1. **Workers & Pages** → **medxclaim**
2. **Custom domain** (or **Settings** → **Domain**)
3. Type: `medxclaim.com`
4. Click **Continue**

### Verify Domain

Cloudflare will verify your domain. Once verified:
- Status should show: **✅ Active**
- SSL Certificate: Applied automatically (**Free!**)

---

## ⏳ Wait for DNS Propagation (5 minutes to 48 hours)

The nameserver change takes time to propagate worldwide. You can check:

1. Go to: https://www.whatsmydns.net/
2. Enter: `medxclaim.com`
3. Select: **NS** record
4. When **all green checkmarks** appear, DNS is ready

---

## 🎉 Your Site is LIVE!

Once DNS propagates, visit: **https://medxclaim.com**

You should see:
- ✅ Your MedXClaim website
- ✅ 🔒 HTTPS (secure, shows lock icon)
- ✅ Public pages work (Home, Services, About, etc.)
- ✅ Login/Register works
- ✅ Admin portal accessible at `/portal`

---

## 🧪 Test Checklist

After launch, verify:

- [ ] Website loads at https://medxclaim.com
- [ ] Public pages (Home, Services, About, Industries, etc.)
- [ ] Contact form works
- [ ] Login page displays
- [ ] Firebase authentication works
- [ ] Admin portal accessible (`/portal`)
- [ ] Agencies display correctly in portal
- [ ] SSL certificate active (lock icon 🔒)

---

## 🚨 Troubleshooting

### Site shows "404 Not Found"
- DNS hasn't propagated yet — wait 24 hours
- Nameservers in Hostinger not updated — check STEP 1 again
- Build failed — check Cloudflare Pages deployment logs

### Firebase not working
- Verify all 6 Firebase credentials added correctly
- Check credential values don't have extra spaces
- Verify environment variables set for BOTH Production and Preview

### Slow performance
- Wait for DNS to fully propagate (up to 48 hours)
- Check Cloudflare **Analytics** for performance metrics
- Enable caching in Cloudflare **Speed** settings

### Still stuck?
- Cloudflare Support: https://support.cloudflare.com
- Firebase Support: https://firebase.google.com/support
- Check Cloudflare Pages deployment logs for errors

---

## 📊 After Going Live

### Monitor Your Site
1. Cloudflare Dashboard → **Analytics**
2. Track visitors, performance, cache hits

### Optimize Performance
1. **Speed** → Enable:
   - ✅ Minify JavaScript
   - ✅ Minify CSS
   - ✅ Minify HTML
2. **Caching** → Set up cache rules for faster loads

### Email Setup (Contact Form)
- Ensure `BREVO_API_KEY` is set on your server
- Contact form auto-replies configured

---

## 🎓 Your URL Structure

Once live:
- **Website**: https://medxclaim.com
- **Public Pages**: 
  - https://medxclaim.com/
  - https://medxclaim.com/services
  - https://medxclaim.com/about
  - https://medxclaim.com/contact
- **Admin Portal**: https://medxclaim.com/portal (requires login)

---

## ✅ Complete Checklist

- [ ] Hostinger nameservers updated to Cloudflare
- [ ] Firebase credentials copied (all 6 values)
- [ ] Cloudflare Pages project created and deployed
- [ ] Firebase environment variables added (6 total)
- [ ] medxclaim.com domain connected to Cloudflare
- [ ] DNS propagation verified (all green on whatsmydns.net)
- [ ] Website loads at https://medxclaim.com
- [ ] All public pages work
- [ ] Firebase auth (login/register) works
- [ ] Admin portal accessible
- [ ] SSL certificate active

---

## 📞 Questions?

1. **Hostinger nameserver help**: Hostinger Support Chat
2. **Cloudflare Pages help**: https://support.cloudflare.com
3. **Firebase help**: Firebase Console Support

---

**🚀 You're ready to go live! Follow these steps in order and your site will be live at medxclaim.com**
