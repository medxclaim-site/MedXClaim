# 🌍 medxclaim.com Domain Setup Guide

## Your Domain Registration Status

**Check your domain registration:**
- [ ] Already registered elsewhere (GoDaddy, Namecheap, etc.)
- [ ] Not registered yet — need to buy it
- [ ] Registered with Cloudflare

---

## ⚡ Quick Domain Connection (5 minutes)

### If Domain is Registered Elsewhere

**Step 1: Get Cloudflare Nameservers**
1. Cloudflare Dashboard → Pages → medxclaim (project)
2. Go to **Settings** → look for **Nameservers**
3. Copy:
   - `nora.ns.cloudflare.com`
   - `omar.ns.cloudflare.com`

**Step 2: Update Your Registrar**
1. Log into your domain registrar (GoDaddy, Namecheap, etc.)
2. Find **DNS Settings** or **Nameservers**
3. Replace existing nameservers with Cloudflare ones from Step 1
4. Save

**Step 3: Add Domain in Cloudflare**
1. Cloudflare Pages → medxclaim → **Custom domain**
2. Type: `medxclaim.com`
3. Verify → Done! ✅

**Wait 5-48 hours for DNS to propagate, then visit: https://medxclaim.com**

---

### If Domain Not Registered Yet

**Register at any of these:**
- Cloudflare Registrar (easiest, auto-connects): https://www.cloudflare.com/products/registrar/
- GoDaddy: https://www.godaddy.com
- Namecheap: https://www.namecheap.com
- Google Domains: https://domains.google

Once registered, follow the steps above to connect to Cloudflare.

---

## 🔗 With Cloudflare Registrar (Fastest)

If you register with **Cloudflare Registrar**:

1. Buy domain at: https://www.cloudflare.com/products/registrar/
2. It auto-connects to your Cloudflare account
3. Go to your Pages project → **Custom domain** → type `medxclaim.com`
4. **Done** — live immediately on Cloudflare DNS

---

## ✅ Verify It Works

Once DNS propagates:
1. Visit: https://medxclaim.com
2. Should see your site live
3. Check SSL certificate: 🔒 should appear in browser

---

## 🚨 If medxclaim.com Shows Someone Else's Site

- DNS hasn't propagated yet (wait 5-48 hours)
- Wrong nameservers entered — double-check in registrar
- Cloudflare domain not verified yet in Pages

**Check status**: Cloudflare Pages → medxclaim → **Custom domain** → should say "Active"

---

## 📞 Support

- Cloudflare: https://support.cloudflare.com
- Your registrar's support chat

---

**Once your domain is registered, share the registrar name and I can provide specific steps!**
