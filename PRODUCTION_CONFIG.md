# 📋 Production Deployment Configuration

## Overview
All configurations for deploying MedXClaim to production on Netlify with the domain **medxclaim.com**.

## Files & Configuration Status

### ✅ Core Configuration Files

#### 1. `netlify.toml` (Primary Configuration)
**Purpose:** Tells Netlify how to build and deploy the site

**Key Settings:**
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Node version: 18.16.0
- Environment: Production
- React Router: Configured with proper redirects

**Features Enabled:**
- ✅ SPA routing (all routes → index.html)
- ✅ Security headers (XSS, clickjacking protection)
- ✅ Smart caching (assets cached 1 year, HTML cached 1 hour)
- ✅ Error handling

#### 2. `vite.config.js` (Build Optimization)
**Purpose:** Optimizes the build for production

**Optimizations:**
- Minification: Terser
- Code splitting: vendor/motion/icons chunks
- Source maps: Disabled (production)
- Asset directory: `/assets`
- No console dropping (keep logs)

#### 3. `.github/workflows/deploy.yml` (CI/CD)
**Purpose:** Automates testing and deployment on every push

**Workflow:**
- Checks code with ESLint
- Runs security audit
- Builds the project
- Deploys to Netlify (automatic)

### ✅ SEO & Metadata Files

#### 4. `public/robots.txt`
**Purpose:** Guides search engines on what to crawl

**Content:**
- Allows crawling of public pages
- Disallows: /admin, /private
- Points to sitemap.xml
- Crawl delay: 1 second

#### 5. `public/sitemap.xml`
**Purpose:** Provides XML sitemap for search engines

**Included Routes:**
- Home (priority: 1.0)
- Services (priority: 0.8)
- Industries (priority: 0.8)
- Why Choose Us (priority: 0.8)
- About (priority: 0.7)
- FAQ (priority: 0.6)
- Contact (priority: 0.7)

#### 6. `public/_redirects`
**Purpose:** Backup SPA routing configuration

**Function:**
- Ensures all routes fall back to index.html
- Backup to netlify.toml redirects
- Netlify processes this automatically

### ✅ Environment Files

#### 7. `.env.example`
**Purpose:** Template for environment variables

**Usage:**
1. Copy `.env.example` → `.env`
2. Fill in your values:
   - `VITE_API_URL` - Your API endpoint
   - `VITE_API_KEY` - API key
   - Other variables as needed
3. **Never commit `.env` to Git**

**Netlify Environment Variables:**
- Set in: Netlify Dashboard → Site Settings → Build & Deploy → Environment
- Accessible in app as `import.meta.env.VITE_*`

## Domain Configuration: medxclaim.com

### Current Setup Steps

**Step 1: In Netlify Dashboard**
1. Visit: https://app.netlify.com
2. Select your MedXClaim site
3. Go to: **Site Settings** → **Domain Management**
4. Click: **Add Custom Domain**
5. Enter: `medxclaim.com`
6. Netlify shows DNS records needed

**Step 2: With Your Domain Registrar**
1. Log in to your registrar (GoDaddy, Namecheap, etc.)
2. Find: DNS or Nameserver settings
3. Update nameservers to:
   - NS1.NETLIFY.COM
   - NS2.NETLIFY.COM
   - NS3.NETLIFY.COM
4. Save changes

**Step 3: Verify & Wait**
1. Return to Netlify
2. DNS status shows "pending" initially
3. Wait 24-48 hours for propagation
4. Netlify updates status to "verified"

### DNS Records

Netlify will provide specific DNS records or ask you to update nameservers:

**Option A: Nameserver Changes (Recommended)**
```
NS1.NETLIFY.COM
NS2.NETLIFY.COM
NS3.NETLIFY.COM
```

**Option B: CNAME Records** (if nameservers not available)
```
www CNAME medxclaim.netlify.app
```

### SSL Certificate

- ✅ Automatically provisioned by Netlify (Let's Encrypt)
- ✅ HTTPS enabled automatically
- ✅ HTTP redirects to HTTPS
- ✅ Certificate renews automatically

**Your Site URLs:**
- Primary: `https://medxclaim.com`
- With www: `https://www.medxclaim.com`
- Fallback: `https://medxclaim.netlify.app`

## Deployment Workflow

### Local Changes → Live Site (Automatic)

```bash
# 1. Make changes locally
# 2. Test: npm run dev
# 3. Commit changes
git add .
git commit -m "feat: Update feature"

# 4. Push to GitHub
git push origin master

# Automatic steps (no action needed):
# - Netlify webhook triggered
# - npm ci (installs dependencies)
# - npm run build (builds to dist/)
# - Netlify deploys dist/ folder
# - Site updates live in 30-120 seconds
```

### Monitor Deployment

```
Netlify Dashboard → Your Site → "Deploys" Tab
↓
Shows all deployments with timestamps
↓
Green ✅ = Success
Red ❌ = Failed (check logs)
```

## Build Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Build time | < 2 minutes | ✅ Expected |
| Site speed | < 3 seconds | 📊 Monitor |
| Lighthouse | > 80 | 📊 Monitor |
| Bundle size | < 150KB (gzipped) | 📊 Monitor |

## Security Configuration

### Headers Enabled (netlify.toml)

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Secrets Management

**Never commit to Git:**
- `.env` files
- API keys
- Database credentials
- Authentication tokens

**Instead, use Netlify Environment Variables:**
1. Netlify Dashboard → Site Settings → Build & Deploy
2. Add environment variables there
3. They're injected during build time
4. Use: `import.meta.env.VITE_*` in code

## Caching Strategy

### Configured in netlify.toml

| Resource | Cache Duration | Strategy |
|----------|-----------------|----------|
| `/assets/*` | 1 year | Immutable (long-lived) |
| `/*.html` | 1 hour | Must revalidate |
| `/index.html` | 1 hour | Must revalidate |
| `/robots.txt` | 1 hour | Must revalidate |
| Font files | 1 year | Immutable |
| SVG images | 1 year | Immutable |

This ensures:
- ✅ Users get updates to HTML quickly
- ✅ Assets cached for performance
- ✅ No stale content served

## Pre-Launch Checklist

### Functionality
- [ ] All pages load without errors
- [ ] Navigation works on all routes
- [ ] Mobile responsive on all devices
- [ ] Contact form functional
- [ ] All links internal & external working
- [ ] Images loading properly

### Performance
- [ ] Page load time < 3 seconds
- [ ] No console errors
- [ ] No 404 errors
- [ ] Animations smooth (60fps)
- [ ] CSS properly loaded

### SEO
- [ ] Each page has unique title
- [ ] Meta descriptions added
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible
- [ ] Open Graph tags (social preview)

### Security
- [ ] HTTPS enabled
- [ ] No sensitive data in frontend
- [ ] No API keys visible in code
- [ ] Security headers present
- [ ] No third-party vulnerabilities

### Monitoring
- [ ] Netlify analytics enabled (optional)
- [ ] Uptime monitoring set (optional)
- [ ] Deploy notifications enabled

## Troubleshooting

### Build Fails
1. Check: Netlify "Deploys" tab → Failed deploy
2. View build logs for error
3. Fix locally, test with `npm run build`
4. Push fix to GitHub

### DNS Not Working
1. Check: https://www.whatsmydns.net
2. Search: `medxclaim.com`
3. Nameservers should show Netlify
4. If not, recheck registrar DNS settings

### Site Shows Old Version
1. Clear browser cache: Ctrl+Shift+Delete
2. Hard refresh: Ctrl+F5
3. Wait 2-3 minutes for deployment
4. Check Netlify deploy status

### 404 on Routes
1. Verify `netlify.toml` has redirects
2. Check `public/_redirects` exists
3. Both redirect `/* → /index.html`
4. Redeploy after fixing

## Deployment Commands

### Local Testing
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview build locally
npm run lint       # Check code quality
```

### Git Commands
```bash
git status         # Check changes
git add .          # Stage all
git commit -m "msg"  # Commit
git push origin master  # Push (triggers deploy)
```

## Support & Resources

| Resource | Link |
|----------|------|
| Netlify Docs | https://docs.netlify.com |
| Vite Docs | https://vitejs.dev |
| Domain DNS | https://www.whatsmydns.net |
| SSL Info | https://www.ssllabs.com |
| Performance | https://web.dev/measure |

## Final Verification

**After domain setup (24-48 hours):**

1. Visit: `https://medxclaim.com`
   - [ ] Site loads
   - [ ] No SSL errors
   - [ ] Correct content shows

2. Try all routes:
   - [ ] /services
   - [ ] /industries
   - [ ] /about
   - [ ] /faq
   - [ ] /contact

3. Test responsiveness:
   - [ ] Desktop view
   - [ ] Tablet view
   - [ ] Mobile view

4. Monitor first week:
   - [ ] No errors in console
   - [ ] Images load properly
   - [ ] Forms work
   - [ ] Analytics tracking

---

**Deployment is complete when your site is live at https://medxclaim.com! 🚀**
