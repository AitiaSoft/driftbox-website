# DriftBox Marketing Operations Guide

**Product:** DriftBox - AI Communication Intelligence Platform
**Website:** driftbox.ai
**Stage:** Pre-launch / Waitlist
**Last Updated:** March 2026

---

## Table of Contents

1. [Google Search Ads Setup](#google-search-ads-setup)
2. [Reddit Ads Setup](#reddit-ads-setup)
3. [Google Search Console Setup](#google-search-console-setup)
4. [Email Service Setup](#email-service-setup)
5. [Automation & Scheduling Tools](#automation--scheduling-tools)
6. [Recommended Minimal Stack](#recommended-minimal-stack)
7. [Scaling Plan](#scaling-plan)

---

## Google Search Ads Setup

### Step 1: Create a Google Ads Account

1. Go to https://ads.google.com and click "Start now"
2. Sign in with the Google account you want to manage billing (use a company Google Workspace account, not personal)
3. When prompted, select "Switch to Expert Mode" at the bottom of the setup wizard — do NOT use Smart Campaign mode, it limits your control
4. Click "Create an account without a campaign" to skip the guided setup
5. Confirm your business information: country (United States), time zone (your local), currency (USD)
6. Click "Submit" to create the account

### Step 2: Set Up Billing

1. Go to Tools & Settings (wrench icon) > Billing > Settings
2. Click "Add payment method"
3. Enter a credit card or link a bank account
4. Set billing threshold to "Automatic payments" (you pay after costs accrue)
5. Recommended: set a monthly budget cap of $150-$210/month ($5-7/day) under Account Settings > Budget
6. Save billing information

### Step 3: Campaign Structure

Create one campaign with two ad groups:

**Campaign: DriftBox - Search - Waitlist**
- Campaign type: Search
- Networks: Google Search only (uncheck Display Network and Search Partners)
- Locations: United States (or expand to US, UK, Canada, Australia if you want English-speaking markets)
- Language: English
- Bidding strategy: Maximize Clicks with a maximum CPC bid limit of $2.50
- Daily budget: $5.00 (start here, increase to $7.00 after first week if CTR > 3%)
- Start date: immediately
- End date: none (run continuously)

**Ad Group 1: Problem-Aware Keywords**
Target people searching for the problem DriftBox solves.

**Ad Group 2: Solution-Aware Keywords**
Target people searching for tools/solutions in the space.

### Step 4: Keywords

**Ad Group 1: Problem-Aware (Exact + Phrase Match)**

Exact match (wrapped in brackets):
```
[lost messages at work]
[can't find messages slack]
[missed messages teams]
[communication overload work]
[too many communication tools]
[information scattered across apps]
[can't find old slack messages]
[searching for emails wastes time]
[team communication problems]
[messages falling through cracks]
```

Phrase match (wrapped in quotes):
```
"lost messages across apps"
"communication tool overload"
"can't find work messages"
"scattered team communication"
"searching for information at work"
"missed important message"
"slack email teams too many tools"
"communication chaos at work"
```

**Ad Group 2: Solution-Aware (Exact + Phrase Match)**

Exact match:
```
[unified communication search]
[search across slack and email]
[ai communication assistant]
[communication intelligence tool]
[slack teams email integration]
[unified inbox for work]
[ai message summary tool]
[cross platform message search]
[team communication dashboard]
[communication analytics tool]
```

Phrase match:
```
"search all communication tools"
"ai for team communication"
"unified communication platform"
"cross platform search work messages"
"communication intelligence software"
"ai message organizer"
```

**Negative Keywords (add at campaign level):**
```
-free
-download
-open source
-tutorial
-how to use slack
-how to use teams
-microsoft teams download
-slack pricing
-discord
-gaming
-personal
```

### Step 5: Ad Copy (3 Variants)

**Variant A: Problem-Focused**
```
Headline 1: Stop Losing Important Messages
Headline 2: AI Finds What Slack, Teams & Email Bury
Headline 3: Join the DriftBox Waitlist — Free
Description 1: You use 5+ communication tools. Important info gets lost daily. DriftBox AI searches across all of them so nothing slips through the cracks.
Description 2: 96% of professionals lose critical messages across platforms. DriftBox catches what falls through. Join the waitlist for early access.
Display URL: driftbox.ai/waitlist
Final URL: https://driftbox.ai?utm_source=google&utm_medium=cpc&utm_campaign=search-waitlist
```

**Variant B: Solution-Focused**
```
Headline 1: Search Slack, Teams & Email at Once
Headline 2: AI Communication Intelligence Platform
Headline 3: DriftBox — Early Access Waitlist
Description 1: One search across every communication tool you use. Daily AI briefs. Drift alerts when important items slip. DriftBox is the layer you've been missing.
Description 2: Built for professionals drowning in Slack, Teams, and email. DriftBox AI ensures no decision, action item, or deadline gets lost. Join the waitlist.
Display URL: driftbox.ai
Final URL: https://driftbox.ai?utm_source=google&utm_medium=cpc&utm_campaign=search-waitlist
```

**Variant C: Authority-Focused**
```
Headline 1: $12K/yr Lost to Communication Chaos
Headline 2: DriftBox AI Fixes That
Headline 3: From a 35-Year Software Veteran
Description 1: The average employee wastes 2.5 hours/day searching across communication tools. DriftBox AI sits on top of Slack, Teams, and email to surface what matters.
Description 2: Built by a founder with 35 years in software. DriftBox is the AI communication intelligence platform you've been waiting for. Join the waitlist.
Display URL: driftbox.ai/waitlist
Final URL: https://driftbox.ai?utm_source=google&utm_medium=cpc&utm_campaign=search-waitlist
```

**Ad Extensions to Add:**
- Sitelink 1: "How It Works" -> driftbox.ai/#features
- Sitelink 2: "Communication Cost Calculator" -> driftbox.ai/calculator
- Sitelink 3: "About the Founder" -> driftbox.ai/#about
- Callout extensions: "Free During Beta" | "No Credit Card Required" | "AI-Powered" | "Works With Slack, Teams, Gmail"
- Structured snippet (Type: Features): "Daily Briefs, Smart Search, Drift Alerts, Action Tracking"

### Step 6: Link GA4 for Conversion Tracking

1. In Google Ads: Tools & Settings > Linked accounts > Google Analytics (GA4)
2. Click "Link" and select your GA4 property for driftbox.ai
3. Enable auto-tagging (should be on by default)
4. In GA4: Admin > Events > mark "waitlist_signup" as a conversion (you should already be tracking this event when users submit the waitlist form)
5. In Google Ads: Tools & Settings > Conversions > Import > Google Analytics 4 properties
6. Select the "waitlist_signup" conversion event
7. Set conversion window to 30 days
8. Set attribution model to "Data-driven" (or "Last click" if not enough data)
9. Save and verify conversions are recording within 24-48 hours

### Step 7: Weekly Optimization Checklist

Run this every Monday morning:

- [ ] **Check spend:** Are you on track for $35-49/week ($5-7/day)? Adjust daily budget if over/under.
- [ ] **Review CTR:** Target 3-5% CTR. If below 3%, pause underperforming ads and test new copy.
- [ ] **Check CPC:** Average CPC should be $1.00-2.50. If consistently above $2.50, review keyword bids and add more negative keywords.
- [ ] **Review search terms report:** Go to Keywords > Search Terms. Add irrelevant terms as negative keywords. Look for high-performing terms to add as exact match keywords.
- [ ] **Check conversions:** Are waitlist signups tracking? What's the cost per conversion? Target under $15/signup initially.
- [ ] **Quality Score:** Check Quality Score for top keywords. If below 5/10, improve ad relevance and landing page experience.
- [ ] **Pause losers:** Pause any keyword with 50+ clicks and zero conversions.
- [ ] **Test new ads:** If running fewer than 3 active ads per ad group, write a new variant.
- [ ] **Device performance:** Check performance by device. If mobile converts poorly, reduce mobile bid adjustment.
- [ ] **Location performance:** If running in multiple countries, check cost per conversion by location. Pause underperforming regions.

---

## Reddit Ads Setup

### Step 1: Create a Reddit Ads Account

1. Go to https://ads.reddit.com
2. Click "Start Now" and sign in with a Reddit account (create one if needed — use a branded username like u/DriftBoxApp or u/DriftBoxAI)
3. Complete business profile: Company name (AitiaSoft / DriftBox), website (driftbox.ai), industry (Technology / Software)
4. Add billing: credit card
5. Accept terms and conditions

### Step 2: Understand Placement Options

Reddit offers two main placement types:

- **Feed Placement:** Your ad appears in the Reddit feed alongside organic posts. Looks like a regular Reddit post with a small "Promoted" label. Best for awareness and traffic.
- **Conversation Placement:** Your ad appears within comment threads of relevant posts. More contextual, feels native. Best for DriftBox because our audience is actively discussing communication problems.

**Recommendation:** Start with Feed Placement in targeted subreddits. Add Conversation Placement after 2 weeks once you see which subreddits perform best.

### Step 3: Campaign Setup

**Campaign: DriftBox Waitlist - Reddit**
- Objective: "Traffic" (drive clicks to driftbox.ai waitlist)
- Funding: Credit card on file
- Campaign budget: $5/day ($150/month)
- Schedule: Run continuously

**Ad Group: Communication & Productivity Professionals**

**Targeting by Subreddit Interest:**

Target these communities:
```
r/productivity
r/Slack
r/MicrosoftTeams
r/SaaS
r/startups
r/Entrepreneur
r/projectmanagement
r/remotework
r/WorkReform
r/digitalnomad
r/sysadmin
r/ITManagers
r/software
r/smallbusiness
```

**Targeting by Interest:**
- Technology
- Business & Finance
- Software & Apps
- Entrepreneurship

**Location:** United States, United Kingdom, Canada, Australia
**Device:** All (desktop tends to convert better on Reddit)
**Schedule:** All day (Reddit peaks 8-10am and 6-10pm, but targeting all day is fine at this budget)

### Step 4: Promoted Post Creative

Reddit ads work best when they look and feel like organic Reddit posts. Avoid corporate-sounding copy. Write like a real person sharing something interesting.

**Promoted Post Option A: Problem-First**
```
Title: We analyzed how much time knowledge workers waste searching for messages across Slack, Teams, and email. The number is $12,467/year per person.

Body: I've been building software for 35 years and the one problem I see everywhere is important messages getting lost across communication tools. We're building DriftBox — an AI that sits on top of your existing tools and surfaces what matters. Currently in pre-launch. If this resonates, we'd love your feedback.

CTA Button: Learn More
URL: https://driftbox.ai?utm_source=reddit&utm_medium=cpc&utm_campaign=waitlist
```

**Promoted Post Option B: Question-Led**
```
Title: How many times a week do you know you saw an important message but can't remember if it was in Slack, Teams, or email?

Body: We surveyed 50 professionals and 96% said this happens regularly. We're building DriftBox to fix it — one AI-powered search across all your communication tools, daily briefs, and alerts when important stuff is slipping. Pre-launch waitlist is open.

CTA Button: Join Waitlist
URL: https://driftbox.ai?utm_source=reddit&utm_medium=cpc&utm_campaign=waitlist
```

**Promoted Post Option C: Founder Story**
```
Title: After 35 years in software, I'm building the tool I wished existed for every team I've ever been on

Body: Every team I've worked with has the same problem: important information gets lost between Slack, Teams, email, and whatever else the company uses. I'm building DriftBox — an AI communication intelligence layer that sits on top of your existing tools. No new inbox, no habit changes. Just a safety net for your important conversations. We're in pre-launch and I'm looking for feedback from people who feel this pain.

CTA Button: Join Waitlist
URL: https://driftbox.ai?utm_source=reddit&utm_medium=cpc&utm_campaign=waitlist
```

### Step 5: Budget and Schedule

- Daily budget: $5.00
- Bid strategy: Automatic (let Reddit optimize)
- Expected CPC: $0.50-1.50 (Reddit is cheaper than Google for B2B)
- Expected CTR: 0.5-1.5% (lower than Google Search, but traffic is cheaper)
- Run dates: Continuous, review weekly
- Optimization: After 7 days, pause any creative with CTR below 0.3% and test replacements

### Step 6: Weekly Reddit Ads Checklist

- [ ] Check spend vs budget
- [ ] Review CTR by creative (pause below 0.3%)
- [ ] Review CPC (target $0.50-1.50)
- [ ] Check conversion rate on landing page from Reddit traffic in GA4
- [ ] Review comments on promoted posts (respond authentically, don't be defensive)
- [ ] Test one new creative variant per week
- [ ] Review subreddit performance — double down on top performers

---

## Google Search Console Setup

### Step 1: Domain Verification (DNS Method)

1. Go to https://search.google.com/search-console
2. Click "Add property"
3. Select "Domain" property type (covers all subdomains and protocols)
4. Enter: `driftbox.ai`
5. Google will provide a TXT record. It will look like: `google-site-verification=XXXXXXXXXXXXXXXXXXXX`
6. Log into your domain registrar (wherever driftbox.ai is registered — likely Namecheap, Cloudflare, GoDaddy, or Vercel Domains)
7. Go to DNS settings for driftbox.ai
8. Add a new TXT record:
   - **Host/Name:** `@` (or leave blank, depending on registrar)
   - **Type:** TXT
   - **Value:** The full google-site-verification string from step 5
   - **TTL:** 3600 (or Auto)
9. Save the DNS record
10. Go back to Google Search Console and click "Verify"
11. Note: DNS propagation can take 10 minutes to 48 hours. If verification fails, wait and try again.

### Step 2: Submit Sitemap

1. Once verified, go to your Search Console property
2. In the left sidebar, click "Sitemaps"
3. In the "Add a new sitemap" field, enter: `sitemap.xml`
   - This will submit: `https://driftbox.ai/sitemap.xml`
4. Click "Submit"
5. Status should change to "Success" within a few hours
6. If it shows "Couldn't fetch," verify that https://driftbox.ai/sitemap.xml is accessible in a browser
7. If your Next.js site doesn't have a sitemap yet, add one:
   - Create `app/sitemap.ts` (or `app/sitemap.xml/route.ts`) in your Next.js project
   - Include all public pages: `/`, `/calculator`, `/audit-template`, any blog posts
   - Rebuild and deploy

**Sitemap best practices:**
- Update sitemap automatically on deploy (Next.js dynamic sitemaps handle this)
- Include `<lastmod>` dates for each URL
- Keep it under 50,000 URLs (not a concern at your size)

### Step 3: Monitor Indexing

Check Search Console weekly for:

1. **Coverage/Indexing report:** Left sidebar > Pages
   - "Indexed" = pages Google has found and can show in search results
   - "Not indexed" = pages Google found but chose not to index (review reasons)
   - Goal: All important pages should be indexed within 2-4 weeks of launch

2. **Request indexing for new pages:**
   - Go to the URL Inspection tool (top search bar)
   - Enter the URL of any new page
   - Click "Request Indexing" to fast-track Google's crawler

3. **Search performance:** Left sidebar > Performance
   - See which search queries are showing your site
   - Track impressions, clicks, CTR, and average position
   - Filter by date range to see trends
   - Export data monthly for tracking

### Step 4: Ongoing Search Console Checklist (Weekly)

- [ ] Check for new indexing errors under Pages report
- [ ] Review search queries — look for new keywords to target in content or ads
- [ ] Monitor average position for target keywords (track week over week)
- [ ] Submit sitemap again after major site updates
- [ ] Check Core Web Vitals report (left sidebar > Core Web Vitals) for page speed issues
- [ ] Review any manual actions or security issues (left sidebar > Security & Manual Actions)

---

## Email Service Setup

### Comparison: Resend vs Mailchimp

| Feature | Resend | Mailchimp |
|---------|--------|-----------|
| **Free Tier** | 3,000 emails/month, 100/day | 500 contacts, 1,000 sends/month |
| **Best For** | Transactional email, developer-first | Marketing automation, drip campaigns |
| **Drip/Automation** | No built-in automation (need Zapier or custom code) | Full visual automation builder |
| **Email Builder** | Code-based (React Email) | Drag-and-drop visual editor |
| **Analytics** | Basic (opens, clicks) | Detailed (opens, clicks, revenue, A/B testing) |
| **Audience Management** | Minimal (API-driven) | Full CRM-lite (segments, tags, scoring) |
| **API Quality** | Excellent, modern REST API | Good, well-documented |
| **Deliverability** | Excellent (built on AWS SES) | Excellent (established reputation) |
| **Learning Curve** | Higher (developer-oriented) | Lower (marketer-oriented) |
| **Pricing (Paid)** | $20/month for 50K emails | $13/month for 500 contacts (Essentials) |

### Recommendation: Start with Mailchimp

For the 7-email nurture sequence with timed delays, audience segmentation, and performance tracking, **Mailchimp is the right choice.** Resend is better for transactional emails (password resets, confirmations) and developer-driven flows, but it lacks the visual automation builder you need for a marketing drip sequence.

**Alternative consideration:** If your list stays under 500 contacts and you want to keep everything code-driven, use the Zapier + Resend approach described in the Alternative Setup section below.

### Step-by-Step: Mailchimp Setup

**Step 1: Create Account**
1. Go to https://mailchimp.com and click "Sign Up Free"
2. Create account with your business email (rvaldez@aitiasoft.com)
3. Complete onboarding: Business name = "DriftBox by AitiaSoft", website = driftbox.ai
4. Verify your email address
5. Go to Account > Settings > Sender Information and set:
   - Default from name: "Roberto from DriftBox"
   - Default from email: rvaldez@aitiasoft.com (you'll need to verify this)
   - Default reply-to: rvaldez@aitiasoft.com

**Step 2: Verify Sending Domain**
1. Go to Account > Settings > Domains
2. Click "Add & Verify Domain"
3. Enter: driftbox.ai
4. Mailchimp will provide DNS records (CNAME and TXT)
5. Add these records in your domain registrar
6. Click "Verify" once DNS propagates
7. This improves deliverability and lets you send from @driftbox.ai addresses

**Step 3: Import Waitlist from Supabase**
1. Export your waitlist from Supabase:
   - Go to the Supabase dashboard for your DriftBox project
   - Navigate to Table Editor > your waitlist table
   - Click "Export to CSV"
   - Or use the SQL editor: `SELECT email, first_name, created_at FROM waitlist_subscribers ORDER BY created_at;`
2. In Mailchimp: Audience > All Contacts > Import Contacts
3. Select "Upload a CSV file"
4. Upload your exported CSV
5. Map fields: email -> Email Address, first_name -> First Name, created_at -> (add as custom field "Signup Date")
6. Tag all imported contacts with "waitlist-import"
7. Confirm import and accept Mailchimp's permission reminder (you have consent since these people signed up on your waitlist)

**Step 4: Create Audience Segments**
1. Go to Audience > Segments
2. Create the following segments:
   - **All Waitlist:** Tag is "waitlist-import" OR source is signup form
   - **Engaged:** Opened 3+ campaigns OR clicked 1+ links
   - **Replied:** Tag "replied" (manually tag when someone replies to an email)
   - **Survey Completed:** Tag "survey-completed"
   - **Beta Confirmed:** Tag "beta-confirmed"

**Step 5: Set Up the 7-Email Automation**
1. Go to Automations > Create Automation
2. Select "Customer Journey" (Mailchimp's automation builder)
3. Starting point: "Contact added to audience" or "Contact tagged with waitlist-import"
4. Build the journey:

```
[Contact joins]
    -> Send Email 1 (Welcome) immediately
    -> Wait 3 days
    -> Send Email 2 ($12K Problem)
    -> Wait 4 days
    -> Send Email 3 (Audit Template)
    -> Wait 7 days
    -> Send Email 4 (Research Insights)
    -> Wait 7 days
    -> Send Email 5 (Product Walkthrough)
    -> Wait 9 days
    -> Send Email 6 (Survey)
    -> Wait 15 days
    -> [IF/ELSE: Engaged?]
        -> YES: Send Email 7 (Beta Access)
        -> NO: Send Re-engagement email
```

5. For each email in the journey:
   - Click the email step and select "Design Email"
   - Choose "Plain Text" template (critical — our sequence is designed for plain text)
   - Copy the email subject and body from the email nurture sequence document
   - Set "From name" to "Roberto from DriftBox"
   - Set "From email" to rvaldez@aitiasoft.com
   - Enable open and click tracking
   - Preview and send a test to yourself before activating

6. Activate the automation

**Step 6: Set Up Ongoing Waitlist Capture**
- Option A: Use Mailchimp's embedded signup form on driftbox.ai (add the Mailchimp form embed code)
- Option B (recommended): Keep your existing Supabase form and use Zapier to sync new signups to Mailchimp (see Automation section)

### Alternative Setup: Zapier + Resend (Simpler, Developer-Friendly)

If you prefer to avoid Mailchimp and keep things minimal:

**Step 1: Set Up Resend**
1. Go to https://resend.com and create an account
2. Add and verify your domain: driftbox.ai (DNS records similar to Mailchimp)
3. Get your API key from the dashboard

**Step 2: Set Up Zapier**
1. Go to https://zapier.com and create a free account
2. Create a new Zap:
   - Trigger: Supabase > New Row (in your waitlist table)
   - Action: Resend > Send Email
3. Map the email content from your nurture sequence

**Step 3: Handle Timing with Zapier Delay**
1. For each email in the sequence, create a separate Zap:
   - Zap 1: Trigger (new row) -> Send Email 1 immediately
   - Zap 2: Trigger (new row) -> Delay (3 days) -> Send Email 2
   - Zap 3: Trigger (new row) -> Delay (7 days) -> Send Email 3
   - ... and so on for all 7 emails
2. Note: Zapier free tier allows 5 Zaps, so you'll need Starter ($19.99/month) for all 7

**Limitation:** This approach lacks open/click tracking, segmentation, and the if/else logic for Email 7. It's simpler but less powerful. Best for very early stage (<100 subscribers) before investing in Mailchimp.

---

## Automation & Scheduling Tools

### Content Publishing

| Tool | What It Does | Cost | Best For |
|------|-------------|------|----------|
| **Buffer** (free) | Schedule posts to up to 3 social channels. Calendar view, basic analytics. | $0/month (free: 3 channels, 10 scheduled posts/channel) | Scheduling LinkedIn, X (Twitter), and one other channel from a single dashboard |
| **Buffer Pro** | More channels, unlimited scheduling, engagement tools, detailed analytics. | $6/month (per channel) | When you need more than 10 queued posts or more than 3 channels |
| **Typefully** | Write, schedule, and publish X (Twitter) threads. Thread editor, analytics, auto-DMs. | $0/month (free: basic scheduling) | Crafting and scheduling multi-tweet threads about DriftBox |
| **LinkedIn Native Scheduler** | Built-in scheduling on LinkedIn. Schedule posts up to 90 days ahead. | $0 (built into LinkedIn) | Simple LinkedIn post scheduling without needing another tool |

### Automation

| Tool | What It Does | Cost | Best For |
|------|-------------|------|----------|
| **Zapier** (free) | Connect apps with automated workflows. "When X happens in App A, do Y in App B." | $0/month (free: 5 Zaps, 100 tasks/month) | Supabase new waitlist signup -> trigger Mailchimp tag or Resend email |
| **Zapier Starter** | More Zaps, multi-step workflows, filters, formatting. | $19.99/month | When you need more than 5 automations or multi-step flows |
| **Make** (formerly Integromat) | Visual automation builder, more complex multi-step workflows than Zapier free tier. | $0/month (free: 1,000 operations/month) | Multi-step automations like: new signup -> add to Mailchimp -> send Slack notification -> log to Google Sheets |

### Content Creation

| Tool | What It Does | Cost | Best For |
|------|-------------|------|----------|
| **Claude** (Anthropic) | AI writing assistant for drafting blog posts, social copy, email sequences, ad copy. | $0-20/month (free tier available) | Drafting all marketing copy, brainstorming angles, rewriting for different platforms |
| **Canva** (free) | Graphic design tool. Templates for social media images, presentations, infographics. | $0/month (free: extensive template library) | Creating social media graphics, the communication audit template PDF, infographics for research data |
| **Canva Pro** | Premium templates, brand kit, background remover, resize for all platforms. | $13/month | When you need consistent branding across all graphics and premium features |

### Analytics

| Tool | What It Does | Cost | Best For |
|------|-------------|------|----------|
| **Google Analytics 4 (GA4)** | Website traffic analytics, user behavior, conversion tracking, audience insights. | $0 | Tracking all website traffic, waitlist signup conversions, traffic sources, user behavior on driftbox.ai |
| **Google Search Console (GSC)** | Search performance, indexing status, keyword rankings, technical SEO issues. | $0 | Monitoring which search queries bring traffic to driftbox.ai, ensuring all pages are indexed, tracking SEO progress |
| **Google Ads Dashboard** | Campaign performance, keyword performance, ad performance, conversion tracking. | $0 (built into Google Ads) | Managing and optimizing your Google Search Ads campaigns |
| **Supabase Dashboard** | Database monitoring, real-time data, API usage, authentication metrics. | $0 (free tier) | Monitoring waitlist signups in real-time, tracking total subscriber count, exporting data for email campaigns |
| **Mailchimp Reports** | Email open rates, click rates, subscriber engagement, A/B test results. | $0 (included in free tier) | Tracking nurture sequence performance against benchmarks |
| **Reddit Ads Dashboard** | Campaign performance, impression/click/conversion metrics, audience insights. | $0 (built into Reddit Ads) | Monitoring Reddit ad performance, reviewing creative performance, optimizing targeting |

---

## Recommended Minimal Stack

### $0/month Stack (Start Here)

This is everything you need to run marketing operations without spending a dollar on tools.

| Function | Tool | Free Tier Limits |
|----------|------|-----------------|
| Social scheduling | Buffer Free | 3 channels, 10 posts queued per channel |
| Email marketing | Mailchimp Free | 500 contacts, 1,000 sends/month |
| Automation | Zapier Free | 5 Zaps, 100 tasks/month |
| Design | Canva Free | Extensive templates, 5GB storage |
| Analytics | GA4 + GSC | Unlimited |
| Database | Supabase Free | 500MB database, 50K auth users |
| Hosting | Vercel Free | 100GB bandwidth |

**Total: $0/month**

This stack supports: weekly social posts on 3 platforms, a 7-email nurture sequence for up to 500 subscribers, basic automations (new signup -> email trigger), branded graphics, and full analytics.

### When to Upgrade ($26/month)

Upgrade when ANY of these happen:

- **Buffer Free -> Buffer Pro ($6/month/channel):** When you need more than 10 queued posts per channel, or you want to add a 4th+ channel
- **Zapier Free -> Zapier Starter ($20/month):** When you need more than 5 Zaps, or you need multi-step automations (e.g., new signup -> tag in Mailchimp -> notify in Slack -> log in Sheets)
- **Mailchimp Free -> Mailchimp Essentials ($13/month):** When you exceed 500 contacts or need A/B testing, custom branding removal, or 24/7 support

**Typical upgrade timeline:** 2-4 months after launch, when waitlist exceeds 500 people and you're posting daily on social.

**Recommended first upgrade:** Zapier Starter ($20/month), because multi-step automations save the most manual time.

---

## Scaling Plan

### Phase 1: $0/month (Months 1-3, Pre-Launch)

**What you're running:**
- Google Search Ads: $5-7/day ($150-210/month in ad spend, not tools)
- Reddit Ads: $5/day ($150/month in ad spend)
- Organic social: 3-5 posts/week on LinkedIn, X, and one other channel via Buffer
- Email nurture sequence via Mailchimp (automated, runs itself)
- SEO: blog posts, GSC monitoring

**Total tool cost:** $0/month
**Total ad spend:** $300-360/month
**Expected waitlist growth:** 50-150 signups/month

---

### Phase 2: $500+/month Ad Spend (Months 3-6, Around Launch)

**Add: LinkedIn Ads**

Why: LinkedIn has the highest-quality B2B audience. DriftBox's target users (product managers, engineering leads, team leads, founders) are highly active on LinkedIn.

Setup:
1. Go to https://business.linkedin.com/marketing-solutions/ads
2. Create Campaign Manager account linked to your LinkedIn company page
3. Campaign objective: "Website visits" (drive to driftbox.ai)
4. Targeting:
   - Job functions: Product Management, Engineering, IT, Operations, Project Management
   - Seniority: Manager, Director, VP
   - Company size: 11-200, 201-500 (mid-market sweet spot)
   - Industries: Technology, Software, SaaS, Professional Services
5. Ad format: Single Image Ad or Text Ad
6. Budget: $15-20/day
7. Expected CPC: $3-8 (LinkedIn is expensive but high-intent)

**Revised budget:**
| Channel | Daily Spend | Monthly Spend |
|---------|------------|---------------|
| Google Search Ads | $7 | $210 |
| Reddit Ads | $5 | $150 |
| LinkedIn Ads | $15 | $450 |
| **Total ad spend** | **$27** | **$810** |

**Tool upgrades:**
- Zapier Starter: $20/month
- Buffer Pro (1 extra channel): $6/month
- Total tools: $26/month

**Total marketing spend: ~$836/month**

---

### Phase 3: $1,000+/month Ad Spend (Months 6-9, Post-Launch)

**Add: Facebook/Instagram Retargeting**

Why: Retargeting website visitors who didn't sign up. Facebook/Instagram retargeting is cheap ($0.50-2.00 CPC) and effective for staying top-of-mind.

Setup:
1. Install Facebook Pixel on driftbox.ai (add the snippet to your Next.js `_document` or use `next/script`)
2. Create a Custom Audience: "Website visitors in the last 30 days who did NOT complete waitlist signup"
3. Create retargeting ads reminding them to join the waitlist or highlighting a new feature
4. Budget: $5-10/day

**Add: X (Twitter) Promoted Posts**

Why: If your organic X content is getting engagement, amplify the best-performing posts.

Setup:
1. Go to https://ads.twitter.com
2. Promote top-performing organic tweets (those with highest engagement rate)
3. Target by interest: Technology, SaaS, Productivity, Remote Work
4. Budget: $5-10/day

**Revised budget:**
| Channel | Daily Spend | Monthly Spend |
|---------|------------|---------------|
| Google Search Ads | $10 | $300 |
| Reddit Ads | $5 | $150 |
| LinkedIn Ads | $20 | $600 |
| Facebook Retargeting | $7 | $210 |
| X Promoted Posts | $7 | $210 |
| **Total ad spend** | **$49** | **$1,470** |

**Tool upgrades:**
- Mailchimp Essentials: $13/month (by now you're past 500 contacts)
- Zapier Starter: $20/month
- Buffer Pro (2 channels): $12/month
- Total tools: $45/month

**Total marketing spend: ~$1,515/month**

---

### Phase 4: $2,000+/month Ad Spend (Months 9-12, Growth)

**Add: Full Multi-Channel + A/B Landing Pages**

At this stage, you're running profitable paid acquisition and need to optimize conversion rates.

**A/B Landing Pages:**
1. Use Vercel's Edge Middleware or a tool like Statsig / LaunchDarkly to serve different landing page variants
2. Test variations of:
   - Headline (problem-focused vs. benefit-focused)
   - CTA copy ("Join the Waitlist" vs. "Get Early Access" vs. "See How It Works")
   - Social proof (testimonials, user count, company logos)
   - Page layout (video demo vs. feature list vs. single CTA)
3. Run each test for at least 2 weeks or 200 conversions per variant before declaring a winner

**Scale what's working:**
- Double budget on channels with lowest cost per acquisition
- Cut channels with CPA above $25
- Test new ad creative monthly on every channel
- Hire a freelance media buyer if managing 5+ channels becomes too time-consuming ($1,500-3,000/month)

**Revised budget:**
| Channel | Daily Spend | Monthly Spend |
|---------|------------|---------------|
| Google Search Ads | $15 | $450 |
| Reddit Ads | $7 | $210 |
| LinkedIn Ads | $25 | $750 |
| Facebook Retargeting | $10 | $300 |
| X Promoted Posts | $10 | $300 |
| A/B Testing Tools | — | $0-50 |
| **Total ad spend** | **$67** | **$2,010** |

**Tool upgrades:**
- Consider Mailchimp Standard: $20/month (advanced automation, send-time optimization)
- Zapier Professional: $49/month (if running 20+ automations)
- Canva Pro: $13/month (brand consistency across all ad creative)
- Analytics: Consider Mixpanel or Amplitude free tier for product analytics
- Total tools: $82-100/month

**Total marketing spend: ~$2,100-2,110/month**

---

## Quick Reference: Key Accounts to Set Up

| Service | URL | Priority |
|---------|-----|----------|
| Google Ads | ads.google.com | Week 1 |
| Google Search Console | search.google.com/search-console | Week 1 |
| Google Analytics 4 | analytics.google.com | Week 1 (if not already set up) |
| Mailchimp | mailchimp.com | Week 1 |
| Buffer | buffer.com | Week 1 |
| Zapier | zapier.com | Week 2 |
| Reddit Ads | ads.reddit.com | Week 2 |
| Canva | canva.com | Week 2 |
| LinkedIn Campaign Manager | business.linkedin.com/marketing-solutions | Month 3+ |
| Facebook Business Manager | business.facebook.com | Month 6+ |
| X Ads | ads.twitter.com | Month 6+ |
