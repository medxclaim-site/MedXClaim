# 🚀 MedXClaim - Cloudflare Pages One-Click Setup

## Fast Track (3 Steps)

### 1️⃣ Push to GitHub
```bash
git push origin master
```

### 2️⃣ Go to Cloudflare
https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git → Select MedxClaim

### 3️⃣ Configure & Deploy
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Add Environment Variables** (from your Firebase project):
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
  - (Optional) `VITE_SUPER_ADMIN_EMAILS=medxclaim@gmail.com`

**Click Deploy** ✨ — Your site is live in ~2 minutes!

---

## Your URLs After Deployment

- **Default**: `https://medxclaim-RANDOMID.pages.dev`
- **Custom Domain**: `https://medxclaim.com` (after DNS setup)
- **Admin Portal**: `/portal` (requires auth with Firebase)

---

## Firebase Setup (Do This First!)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your MedXClaim project
3. **Settings** → **Project settings**
4. Copy all values from "Web API configuration":
   - API Key
   - Auth Domain
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID
5. **Paste these into Cloudflare Environment Variables** (see Step 3 above)

---

## After Deployment Checklist

- [ ] Site loads at `https://medxclaim-RANDOMID.pages.dev`
- [ ] Public pages work (Home, Services, About, etc.)
- [ ] Firebase Auth works (Login/Register)
- [ ] Admin portal loads (`/portal`)
- [ ] Agencies display correctly
- [ ] Contact form sends emails

---

## If Something Breaks

### 404 Page Not Found
- Check Cloudflare build logs: Pages → Deployments → View build log
- Verify `.env` variables are set
- Run locally: `npm run dev` — does it work?

### Firebase Auth Not Working
- Double-check Firebase credentials in Cloudflare
- Firebase Console → Settings → check credentials match
- Make sure domain is whitelisted in Firebase Auth

### Slow Performance
- Enable **Analytics** in Pages dashboard
- Use **Caching Rules** for static assets
- Check Cloudflare **Speed** settings

---

## Domain Setup (Optional)

If you have a custom domain:

1. **Cloudflare Pages** → medxclaim → **Custom domain**
2. Enter your domain (e.g., `medxclaim.com`)
3. Update DNS at your registrar with Cloudflare nameservers:
   - `nora.ns.cloudflare.com`
   - `omar.ns.cloudflare.com`

(DNS propagates in 5 minutes to 48 hours)

---

## Need More Info?

- **Full Setup Guide**: See [CLOUDFLARE_DEPLOYMENT.md](CLOUDFLARE_DEPLOYMENT.md)
- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **Firebase Setup**: https://firebase.google.com/docs/web/setup

---

## 🎉 You're Live!

Share your URL: `https://medxclaim.com` (once DNS is ready)

Questions? Check the full deployment guide or Cloudflare support.
