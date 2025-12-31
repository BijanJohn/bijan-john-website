# Comment System Options for Blog

**Date:** 2025-11-22

## Requirements

1. No Facebook/Google/social account linking required
2. Free (no ongoing costs)
3. Acceptable if pull request workflow is used for comment approval
4. Support for anonymous or verified users

---

## Best Options

### **1. Staticman (Recommended for Your Needs)**

**How it works:**
- Comments submitted via form on your blog post
- Staticman processes the comment and creates a pull request to your GitHub repo
- You review and approve the PR
- Comment is added as a YAML/JSON file in your repo
- Site rebuilds and comment appears on the post

**Pros:**
- ✅ Completely free (self-hosted)
- ✅ No third-party accounts required
- ✅ Comments stored in your Git repository (you own the data)
- ✅ PR approval workflow built-in
- ✅ Supports moderation, notifications, email replies
- ✅ reCAPTCHA integration for spam protection
- ✅ Can require email (verified) or allow anonymous with just name
- ✅ Privacy-friendly (no tracking)

**Cons:**
- ❌ Initial setup is more complex than third-party widgets
- ❌ Requires deploying Staticman API (free on Heroku or as Netlify Function)
- ❌ Comments not instant (delayed until you approve PR)
- ❌ Each comment triggers a site rebuild (can be slow if many comments)

**Technical Requirements:**
- Deploy Staticman API instance (Heroku free tier or Netlify Functions)
- Add configuration file to your repo
- Add comment form component to blog template
- Setup GitHub bot/app for PR creation

**User Experience:**
- User fills out: Name, Email (optional), Comment
- User submits form
- Message: "Comment submitted for moderation"
- You get PR notification
- You approve/reject PR
- Site rebuilds and comment appears

**Best for:** Bloggers who want full control, don't mind PR approval workflow, and value data ownership

**Documentation:** https://staticman.net/

---

### **2. Utterances (Simpler Alternative)**

**How it works:**
- Comments stored as GitHub Issues on your repo
- Users must have GitHub account to comment
- No PR workflow - comments appear immediately
- You moderate via GitHub Issues interface

**Pros:**
- ✅ Completely free
- ✅ Extremely easy setup (5 minutes)
- ✅ Lightweight and fast
- ✅ Comments stored in your GitHub repo
- ✅ Markdown support in comments
- ✅ No tracking/ads

**Cons:**
- ❌ **Requires GitHub account** (doesn't meet requirement #1)
- ❌ No anonymous comments
- ❌ Not ideal for non-technical audience

**Verdict:** Doesn't fully meet your requirements due to GitHub account requirement

---

### **3. Custom Netlify Functions + Git Solution**

**How it works:**
- Build your own comment form
- Form submits to Netlify Function
- Function creates a PR or commit to your repo
- You approve PR or comments auto-commit to separate branch

**Pros:**
- ✅ Completely free (within Netlify limits)
- ✅ Full control over UX and data
- ✅ Can support anonymous or named comments
- ✅ No third-party dependencies
- ✅ Flexible approval workflow

**Cons:**
- ❌ Requires custom development
- ❌ Need to build spam protection
- ❌ Need to handle moderation logic yourself
- ❌ More maintenance burden

**Technical Requirements:**
- Create Netlify Function for comment submission
- Build comment form React component
- Setup GitHub API integration for PR/commit creation
- Implement spam filtering (reCAPTCHA, Akismet, etc.)
- Create comment display component

**Best for:** Developers who want complete control and enjoy building

---

### **4. Webmention (Decentralized)**

**How it works:**
- Uses open web standards (IndieWeb)
- Collects mentions from other websites
- People comment on their own blog/site, and it appears on yours
- Can also aggregate Twitter/Mastodon mentions

**Pros:**
- ✅ Free
- ✅ Decentralized and open
- ✅ No third-party lock-in
- ✅ Own your data

**Cons:**
- ❌ Requires commenters to have their own website
- ❌ Not practical for general audience
- ❌ Complex setup
- ❌ Limited adoption

**Verdict:** Not suitable for general blog audience

---

## Comparison Table

| Feature | Staticman | Utterances | Custom Solution | Webmention |
|---------|-----------|------------|-----------------|------------|
| **Cost** | Free | Free | Free | Free |
| **No Account Required** | ✅ Yes | ❌ No (GitHub) | ✅ Yes | ❌ No (Website) |
| **PR Approval Workflow** | ✅ Yes | ❌ No | ✅ Configurable | N/A |
| **Anonymous Comments** | ✅ Yes | ❌ No | ✅ Yes | ❌ No |
| **Setup Difficulty** | Medium | Easy | Hard | Hard |
| **Data Ownership** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Spam Protection** | ✅ reCAPTCHA | ✅ GitHub | ⚠️ Manual | ⚠️ Manual |
| **General Audience Friendly** | ✅ Yes | ❌ No | ✅ Yes | ❌ No |

---

## Final Recommendation

**For your requirements, Staticman is the best option.**

### Why Staticman?

1. ✅ Meets all your requirements
2. ✅ Free and open-source
3. ✅ No account required for commenters
4. ✅ PR approval workflow built-in
5. ✅ You own all comment data (stored in Git)
6. ✅ Can support anonymous or email-verified comments
7. ✅ Spam protection via reCAPTCHA
8. ✅ Works well with static Gatsby sites

### Implementation Overview

**Step 1:** Deploy Staticman API
- Option A: Heroku free tier
- Option B: Netlify Functions (better integration)
- Option C: Use public instance (not recommended for production)

**Step 2:** Add Configuration
- Create `staticman.yml` in repo root
- Configure moderation settings
- Set up comment structure

**Step 3:** Build Comment Form
- Create React component with form fields
- Add to `blog-post.js` template
- Style to match your site

**Step 4:** Display Comments
- Create component to render existing comments
- Query comment files via GraphQL
- Add to blog post template

**Step 5:** Setup Moderation
- Configure GitHub webhooks
- Enable PR notifications
- Create approval workflow

### Estimated Implementation Time
- 3-5 hours for initial setup
- Additional time for styling/customization

---

## Alternative: Hybrid Approach

If Staticman proves too complex, consider:

**Formspree + Manual Workflow**
1. Use Formspree (free tier) for comment submissions
2. Receive comments via email
3. Manually add approved comments to markdown files
4. Commit and deploy

**Pros:**
- Very simple setup (15 minutes)
- Free tier sufficient for blogs
- No API deployment needed

**Cons:**
- Fully manual approval process
- No automated PR creation
- More work for you per comment

---

## Next Steps

1. Try Staticman first (best fit for requirements)
2. If setup is too complex, fall back to Formspree + manual workflow
3. If you want help implementing either solution, I can assist with the code

## Resources

- **Staticman:** https://staticman.net/
- **Staticman + Gatsby Guide:** https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-comments/
- **Staticman GitHub:** https://github.com/eduardoboucas/staticman
- **Alternative Implementations:** https://github.com/topics/staticman
