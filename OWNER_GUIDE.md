# CLEAR JEWELRY · Owner guide

Everything you can change on the website yourself — no developer required.

The website reads its content from **Sanity Studio**. You open Studio in your browser, edit something, click **Publish**, and the live site updates within about a minute.

---

## How to open Studio

1. Go to **https://clear-jewelry.vercel.app/studio**
2. Sign in with the email that owns the Sanity project (kirbykung168@gmail.com).
3. You'll see a left-hand panel called **Content** with all the editable areas.

If you ever lose your way, click the CLEAR JEWELRY logo at the top to return to the Content list.

---

## Changing the hero image

The hero is the first photograph on the homepage.

1. In Studio, click **Homepage**.
2. Scroll to the **Hero image — desktop** field.
3. Click the image to replace it. Choose a new file from your computer.
4. After it uploads, click the image *again* and drag the crosshair to the part of the photograph you want centered (the **hotspot**). The site crops around that point on different screen sizes.
5. **Important:** fill in **Hero image — alt text** with a short description of what's in the picture (for screen readers).
6. Optional: upload a different image to **Hero image — mobile** if the desktop crop doesn't work well on phones. Leave it empty to use the same image on both.
7. Click **Publish** at the bottom-right. The live site updates within ~60 seconds.

---

## Adding a new gallery piece

1. Click **Gallery pieces** in the left panel.
2. Click **+ Create** at the top.
3. Upload the photograph in the **Photograph** field, then click it again to set the hotspot.
4. Fill in:
   - **Alt text** — what the picture shows
   - **Display name** — the piece name (shown on hover and in the lightbox)
   - **Description** — a short editorial caption (the stone, the setting, the metal)
   - **Categories** — pick one or more from the list (Rings, Necklaces, Sapphires, etc.)
   - **Feature on homepage?** — toggle on if this is one of your strongest pieces
5. Click **Publish**.

The new piece automatically appears in the Gallery page. If you flagged it as "Feature on homepage", it's eligible for the homepage wall (see next section).

---

## Managing the homepage featured pieces

The homepage shows a 12-tile wall of your strongest work. You control which pieces appear and the order.

1. Click **Homepage featured pieces** in the left panel.
2. The **Featured pieces** field shows the currently featured pieces in order.
3. To add a piece: click **+ Add item** at the bottom. Search for the piece by name, click it.
4. To remove a piece: hover over it, click the three-dots menu, choose **Remove**.
5. To reorder: drag the handle on the left of each piece up or down.
6. **8–12 pieces** is recommended. If you put fewer than 8, the system fills the remaining spots from pieces flagged "Feature on homepage". If you put more than 12, only the first 12 show.
7. Click **Publish**.

---

## Editing homepage text (headline, intro, CTAs)

1. Click **Homepage**.
2. Scroll through the fields — everything is labelled with where it appears on the site.
3. Edit any of the text. **Publish** to save.

---

## Adding a new category

1. Click **Categories** in the left panel.
2. Click **+ Create**.
3. Fill in **Category name** (e.g. "Bracelets", "Engagement", "Bridal").
4. **URL slug** auto-fills — leave it.
5. Optional: set a **Tab order** number (lower = appears earlier in the tab strip).
6. **Publish**.

The new tab appears immediately on the Gallery page. To assign existing pieces to it, open each piece and add the new category to its **Categories** field.

---

## Updating contact details

1. Click **Site settings**.
2. Edit phone, LINE, Instagram, address, hours.
3. **Publish**.

These show up everywhere on the site: footer, contact page, social-share previews.

---

## Updating the About / Information pages

1. Click **About page** or **Information page** in the left panel.
2. Each section (Maison title, Philosophy, Bespoke steps, etc.) is editable.
3. **Publish**.

---

## What you cannot change yourself

These are intentional brand identity locks. Email your developer if you need them changed:

- The favicon (small icon in browser tabs)
- The logotype glyph in the navigation
- The fonts (Cormorant Garamond + Jost)
- Page layouts and animations

---

## If something looks broken

1. Wait 90 seconds — the site rebuilds in the background after each publish.
2. Hard-refresh your browser (Ctrl+Shift+R / Cmd+Shift+R).
3. Open Studio and check that the document is **Published** (not just **Draft**). A green check next to the document name = published.

Still broken? Email kirbykung168@gmail.com.

---

## Studio URL

**https://clear-jewelry.vercel.app/studio**

Bookmark it. Sign in with kirbykung168@gmail.com (or invite other editors from **Manage members** in Studio settings).

---

## Editing in two languages (EN / TH)

The live site is **English and Thai only**. The language toggle in the
top-right of the site is an EN ⇄ TH switch.

Every text field in Studio still has three inputs (en, th, zh) but the
website only reads en and th. The zh fields are preserved from earlier
translation work — they aren't deleted — but they don't appear on the
live site. If you want to bring Chinese back later, the developer can
re-enable it in one commit.

| Field | English (en) | ภาษาไทย (th) | 中文 (zh) |
|---|---|---|---|
| Required | yes | optional | not rendered on site |

The English value is the authoritative source. Leave the Thai blank to
fall back to English. The site never breaks on an empty translation.

To translate something, type the Thai version next to the English one
and **Publish**. The change is live in ~60 seconds.

> Tip: leave brand-specific words (CLEAR, 1993, the address "Gaysorn
> Centre, 3rd Floor") in their original spelling. Numbers, phone, email
> and URLs don't need translating.

---

## Editing UI labels (buttons, nav, footer copy)

Every short piece of text on the chrome — nav items, button labels, eyebrows, footer copy, booking-form labels, lightbox controls, the loading screen — lives in a single Sanity document called **UI Labels**.

1. In Studio, open **UI Labels**.
2. You'll see a long list of rows, one per label. Each row shows:
   - **Key** — internal identifier (don't change unless a developer asks you to).
   - **Where this appears** — a one-line description so you can find the right one.
   - **Translation** — the EN and TH values side-by-side.
3. Search the list (top of the array editor in Sanity) by key (e.g. type "nav.home") or by description (e.g. "Top navigation").
4. Edit the EN or TH value and **Publish**.
5. Within ~60 seconds the live site picks up the new label.

If a translation is left blank, the live site falls back to the built-in default — the site can never break on an empty label. To restore a default, delete the value (or the whole row); the developer's hard-coded fallback takes over.

> Tip: the order of rows in the list doesn't affect the site. Drag them around for your own convenience.

---

## Connecting the booking form (one-time setup)

The /book form already submits successfully without this — entries are
saved in our Vercel server logs even if nothing else is configured. But
you probably want them in a Google Sheet and pinged to LINE. Here's how.

### A · Google Sheets (you do this once)

1. Open https://sheets.new and create a blank spreadsheet. Title it **Clear Jewelry — Bookings**.
2. Click **Extensions → Apps Script**. A new editor tab opens.
3. Delete the placeholder `Code.gs` content and paste the script from `scripts/google-apps-script.js` in this repo. Save (⌘S / Ctrl+S).
4. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Description: "Clear Jewelry bookings"
   - Execute as: **Me** (your Google account)
   - Who has access: **Anyone**
   - Click **Deploy**.
5. Authorise the script when prompted.
6. Copy the **Web app URL** that appears at the end. Paste it to the developer — it goes into Vercel as `GOOGLE_SHEETS_WEBHOOK_URL`.

That's it. New form submissions will append a row in the "Bookings" tab.

### B · LINE Messaging API (developer needs from you)

To push a notification to your phone when a new booking arrives, the
developer needs two things from your LINE Developers Console:

1. **Channel Access Token (long-lived)**
   - Open https://developers.line.biz/console
   - Select your provider → channel **`2010419323`**
   - **Messaging API** tab → scroll to **Channel access token (long-lived)**
   - Click **Issue** (or **Reissue** if one exists)
   - Copy the long token (a string of ~170 characters)
   - **Important:** this is different from the **Channel secret** (32 hex chars). The access token is what's needed; the secret is only used for webhook signature checks.

2. **Your LINE user ID**
   - Same console, same channel → **Basic settings** tab
   - Scroll to the bottom → **Your user ID** (starts with `U` + 32 hex characters)
   - Copy it

Send those two values to the developer. They go into Vercel as
`LINE_CHANNEL_ACCESS_TOKEN` and `LINE_OWNER_USER_ID`. Both stay secret;
never paste them into chat, email, or commit them to GitHub.


### C · Vercel env vars (developer does this once Kirby provides the values)

After Kirby pastes the LINE access token, his user ID, and the Sheets web-app URL, set them in Vercel:

1. https://vercel.com/kirbykung168-arts-projects/clear-jewelry → **Settings** → **Environment Variables**
2. Add three variables, all environments (Production + Preview + Development):

   | Name | Value source |
   |---|---|
   | `LINE_CHANNEL_ACCESS_TOKEN` | the long-lived token from LINE Developers Console |
   | `LINE_OWNER_USER_ID` | the `U…` user ID from LINE Developers Console → Basic settings |
   | `GOOGLE_SHEETS_WEBHOOK_URL` | the Apps Script web-app URL from the Sheet |

3. Trigger a redeploy (Deployments → click the latest → **Redeploy**) so the running functions pick up the new env values.
4. Verify with `curl https://clear-jewelry.vercel.app/api/book/health` — all three should report `set` and `ready: true`.

That's it. From the next /book submission, the LINE OA pings your phone and the row appears in the Google Sheet within ~1 second.
