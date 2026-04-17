# ✅ Firebase Credentials Setup Verification

## Your Firebase API Key Received

You've provided one Firebase credential. To complete the deployment, you need **all 6 values**:

### Required Firebase Values

1. ✅ **API Key**: `BGTh8xRsgolG_z10azT-fPYw6pgFQhf1Lfa_x-ICr83bP9T2AeFQldNMZjHjwuho6L554kEXKCIUHp0BbfanC0c`
2. ❓ **Auth Domain**: `your-project-id.firebaseapp.com`
3. ❓ **Project ID**: `your-project-id`
4. ❓ **Storage Bucket**: `your-project-id.appspot.com`
5. ❓ **Messaging Sender ID**: `123456789012`
6. ❓ **App ID**: `1:123456789012:web:abcdef1234567890`

---

## 🔒 Security: Regenerate Your API Key

Since you shared it in chat (even in a secure context), regenerate it:

1. Go to: https://console.firebase.google.com
2. Select your **MedXClaim** project
3. **Settings** ⚙️ → **Project Settings**
4. **Service Accounts** tab (not Web API)
5. Look for your current key
6. Click **Delete** (🗑️)
7. Click **Add Key** → **Create new key**
8. A new API Key is generated - use this new one instead

---

## 📋 Gather Remaining 5 Credentials

Go to: https://console.firebase.google.com

1. **Settings** ⚙️ → **Project Settings**
2. Scroll to **"Web API configuration"**
3. Copy remaining values:
   - Auth Domain
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID

---

## ☁️ Add to Cloudflare (Secure Method)

**NEVER share credentials in chat again.** Add them directly in Cloudflare:

1. https://dash.cloudflare.com
2. **Workers & Pages** → **medxclaim**
3. **Settings** → **Environment variables**
4. **Click "+ Add variable"** for each:

```
VITE_FIREBASE_API_KEY = [NEW regenerated key, not the old one]
VITE_FIREBASE_AUTH_DOMAIN = [your auth domain]
VITE_FIREBASE_PROJECT_ID = [your project id]
VITE_FIREBASE_STORAGE_BUCKET = [your storage bucket]
VITE_FIREBASE_MESSAGING_SENDER_ID = [your sender id]
VITE_FIREBASE_APP_ID = [your app id]
```

**Set each for BOTH**: Production + Preview

---

## ✅ Deployment Checklist

- [ ] Regenerated Firebase API Key (don't use the one you shared)
- [ ] Gathered all 6 Firebase credentials
- [ ] Added all 6 variables to Cloudflare
- [ ] Set for both Production AND Preview
- [ ] Updated Hostinger nameservers to Cloudflare
- [ ] Connected medxclaim.com domain in Cloudflare Pages
- [ ] Website loads at https://medxclaim.com

---

## 🎉 You're Ready

Once you complete the checklist above, your site goes live at **https://medxclaim.com**

**Reference**: [HOSTINGER_CLOUDFLARE_SETUP.md](HOSTINGER_CLOUDFLARE_SETUP.md)
