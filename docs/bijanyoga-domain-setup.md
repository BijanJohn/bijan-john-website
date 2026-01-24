# Adding bijanyoga.com as Domain Alias

**Status:** Planned for future implementation  
**Primary Domain:** bijanrahnamai.com (canonical for SEO)  
**Alias Domain:** bijanyoga.com (for social media sharing)

---

## Overview

This guide covers setting up `bijanyoga.com` as a domain alias so that:
- Both domains serve the same website
- Visitors can use either domain and stay on it
- `bijanyoga.com` is used for social media sharing
- `bijanrahnamai.com` remains the canonical URL for SEO

---

## Step 1: Cloudflare Configuration

### 1.1 Add Domain to Cloudflare
1. Log into Cloudflare dashboard
2. Click "Add a Site"
3. Enter `bijanyoga.com`
4. Select plan (Free works fine)
5. Update nameservers at your domain registrar to Cloudflare's

### 1.2 Configure DNS Records
Add these DNS records in Cloudflare for `bijanyoga.com`:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | @ | `[your-netlify-site].netlify.app` | Proxied |
| CNAME | www | `[your-netlify-site].netlify.app` | Proxied |

**Note:** Replace `[your-netlify-site]` with your actual Netlify subdomain (found in Netlify dashboard).

### 1.3 SSL/TLS Settings
1. Go to SSL/TLS settings in Cloudflare
2. Set encryption mode to "Full (strict)"
3. Enable "Always Use HTTPS"

---

## Step 2: Netlify Configuration

### 2.1 Add Domain Alias
1. Log into Netlify dashboard
2. Go to Site settings → Domain management
3. Click "Add domain alias"
4. Enter `bijanyoga.com`
5. Also add `www.bijanyoga.com`

### 2.2 SSL Certificate
Netlify will automatically provision SSL for the new domain. This may take a few minutes.

### 2.3 Verify Setup
After DNS propagation (up to 48 hours, usually faster):
- Visit `https://bijanyoga.com` - should show your site
- Visit `https://www.bijanyoga.com` - should show your site

---

## Step 3: Site Code Changes

### 3.1 Update SEO Component
**File:** `src/components/seo.js`

The canonical URL should remain `bijanrahnamai.com` for SEO purposes, but Open Graph URLs should work with both domains.

```javascript
// No changes needed for canonical - keep pointing to bijanrahnamai.com
// This tells search engines which URL is the "real" one

<link rel="canonical" href={`https://bijanrahnamai.com${slug}`} />

// Open Graph can use the current domain or primary domain
<meta property="og:url" content={`https://bijanrahnamai.com${slug}`} />
```

### 3.2 Update Site Configuration (Optional)
**File:** `src/util/site.json`

Keep as-is:
```json
{
  "meta": {
    "siteUrl": "https://bijanrahnamai.com"
  }
}
```

### 3.3 Social Sharing Consideration
When sharing on social media, use `bijanyoga.com` URLs. The Open Graph preview will still work correctly because:
- The page loads and returns proper OG meta tags
- Social platforms fetch the page content regardless of domain

---

## Step 4: Testing Checklist

After setup, verify:

- [ ] `https://bijanyoga.com` loads the site
- [ ] `https://www.bijanyoga.com` loads the site
- [ ] `https://bijanrahnamai.com` still works
- [ ] SSL certificates valid on both domains
- [ ] Social media preview works when sharing `bijanyoga.com` links
  - Test with: https://developers.facebook.com/tools/debug/
  - Test with: https://cards-dev.twitter.com/validator
- [ ] Google Search Console recognizes both domains (add bijanyoga.com as property)

---

## Step 5: Google Search Console (Optional but Recommended)

1. Add `bijanyoga.com` as a new property in Google Search Console
2. Verify ownership via DNS or HTML file
3. This helps Google understand both domains serve the same content

---

## Troubleshooting

### Domain not loading
- Check DNS propagation: https://dnschecker.org
- Verify Cloudflare proxy is enabled (orange cloud)
- Confirm Netlify domain alias is added

### SSL errors
- Wait for Netlify to provision certificate (can take 10-15 minutes)
- Ensure Cloudflare SSL mode is "Full (strict)"

### Social previews not working
- Clear social platform cache using debug tools above
- Verify OG meta tags are present in page source

---

## Future Consideration: Primary Domain Switch

If you ever want to make `bijanyoga.com` the primary/canonical domain:

1. Update `src/util/site.json` → `siteUrl: "https://bijanyoga.com"`
2. Update canonical tags in `seo.js`
3. Set up 301 redirects from `bijanrahnamai.com` to `bijanyoga.com`
4. Update Google Search Console preferred domain
5. Expect temporary SEO fluctuation during transition

**Recommendation:** Keep `bijanrahnamai.com` as canonical unless you have a strong reason to switch. Using `bijanyoga.com` for social sharing works fine without changing canonical.

---

## Timeline Estimate

| Task | Duration |
|------|----------|
| Cloudflare setup | 15 minutes |
| DNS propagation | 1-48 hours |
| Netlify configuration | 10 minutes |
| SSL provisioning | 10-15 minutes |
| Testing | 30 minutes |

**Total active work:** ~1 hour  
**Total elapsed time:** Up to 48 hours (DNS propagation)
