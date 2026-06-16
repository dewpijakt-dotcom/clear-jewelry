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

## Connecting the booking form

The /book form already submits successfully without any setup — entries are saved to Vercel server logs even if nothing else is configured. To get bookings into a Google Sheet **and** a notification to your admin LINE Group, complete A + B below.

### A · Google Sheets (Sheet + Apps Script Web App)

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
6. Copy the **Web app URL**. Paste it to the developer — it goes into Vercel as `GOOGLE_SHEETS_WEBHOOK_URL`.

### B · LINE Group notification (admin group)

The site pushes a card-style text message to your admin LINE Group every time a booking arrives. Setup is a one-time, three-step flow:

#### B.1 — Issue the Channel Access Token

1. https://developers.line.biz/console
2. Select your provider → channel **2010419323**
3. **Messaging API** tab → scroll to **Channel access token (long-lived)** → click **Issue** (or **Reissue**)
4. Copy the long token (~170 characters)
5. Send it to the developer. It goes into Vercel as `LINE_CHANNEL_ACCESS_TOKEN`.

Different from the **Channel Secret** (32 hex chars on the Basic Settings tab) — the secret is only used to validate webhook signatures (see B.3).

#### B.2 — Create the admin group and capture its Group ID

1. On your phone, open LINE. Create a new group called **Clear Jewelry Bookings**. Invite your admins.
2. Invite your LINE Official Account (the OA — search by `@clearjewelry`) into the group. The OA must be a member to receive pushes.
3. In LINE Developers Console → channel 2010419323 → **Messaging API** tab → **Webhook URL** → paste:
   `https://clear-jewelry.vercel.app/api/line-webhook`
4. Toggle **Use webhook** ON, then click **Verify** (should succeed).
5. Send any message in the group (e.g. "hi"). The webhook fires.
6. Open Vercel → **Functions** → `/api/line-webhook` → look for a log line:
   `[LINE-WEBHOOK] captured groupId=C…………………` (33 chars starting with `C`)
7. Copy that groupId. It goes into Vercel as `LINE_GROUP_ID`.
8. After capture, you can leave the webhook on (no harm) or toggle it off — we don't actively use it post-setup.

#### B.3 — (Optional) set the Channel Secret for webhook hygiene

Copy the **Channel secret** from Basic Settings (32 hex chars) and have the developer add it as `LINE_CHANNEL_SECRET`. The webhook will then verify every incoming event's signature. Without it the webhook still works but accepts any caller.

### C · Vercel env vars (developer does this once Kirby provides the values)

1. https://vercel.com/kirbykung168-arts-projects/clear-jewelry → **Settings** → **Environment Variables**
2. Add three (four with the optional secret), all environments:

   | Name | From |
   |---|---|
   | `GOOGLE_SHEETS_WEBHOOK_URL` | Apps Script web-app URL (A.6) |
   | `LINE_CHANNEL_ACCESS_TOKEN` | LINE Developers Console (B.1) |
   | `LINE_GROUP_ID` | captured via webhook log (B.2.7) |
   | `LINE_CHANNEL_SECRET` *(optional)* | LINE Basic Settings (B.3) |

3. Trigger a redeploy: Deployments → click the latest → **Redeploy**.
4. Verify with `curl https://clear-jewelry.vercel.app/api/book/health` — all three (or four) should report `set` and `ready: true`.

## How the booking flow works (post-setup)

1. Visitor fills /book → submits → immediately sees the editorial confirmation block ("Thank you, [Name]…"). Their experience never depends on the backend.
2. The site appends a row to your Google Sheet **and** pushes a card to the **Clear Jewelry Bookings** LINE Group within ~2 seconds. Either failure is non-fatal — Sheets is the canonical record, LINE is the live notification.
3. Admins in the group see the notification with name, contact, date, time, and message.
4. Reply directly via LINE/WhatsApp from there. Mark the row in the Sheet when handled.
