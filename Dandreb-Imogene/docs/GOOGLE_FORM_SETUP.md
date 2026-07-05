# RSVP setup — Google Form (no Cloud, no keys)

Your on-site RSVP form submits into a **Google Form** you create. Responses
collect in that form's linked Google Sheet, with Google's built-in summary
charts. There's **no Google Cloud project, no service account, and no private
keys** — you just paste a few IDs into `content/rsvp-form.ts`.

Flow: guest fills your form → `/api/rsvp` (validates) → posts into your Google
Form → Google records it in Responses + linked Sheet.

---

## 1. Create the Google Form

1. Go to [forms.new](https://forms.new). Title it e.g. "Dandreb & Imogin Rose — RSVP".
2. Add these questions **in any order** (the exact question titles don't matter,
   only the answer types):

   | Question | Type | Notes |
   |---|---|---|
   | Name of Guest | Short answer | |
   | Contact Number | Short answer | |
   | Email | Short answer | |
   | Will you attend? | **Multiple choice** | Options **exactly**: `Yes` and `No` |
   | Message | Paragraph | |

   The "Will you attend?" option labels must match the site exactly. If you'd
   rather use different wording, change it in both places — the form **and**
   `optionLabels.attendance` in `content/rsvp-form.ts`.

3. (Optional) In **Responses**, click the Sheets icon to link a spreadsheet —
   that's where you'll watch RSVPs arrive.

4. **Allow anonymous responses** (critical — the site submits without anyone
   signed in). In the form's **Settings**:
   - **Collect email addresses** → Off (email is already a normal question).
   - **Limit to 1 response** → Off (it would force Google sign-in).
   - Not restricted to your organization.

5. **Publish / turn on "Accepting responses"** so the form is live. In the
   newer Forms UI click **Publish**; older UI is live by default.

## 2. Get the form id

Use the **responder link** — NOT the editor URL.

- ✅ Responder link (from **Publish** or **Send → 🔗 link**):
  `https://docs.google.com/forms/d/e/1FAIpQLSxxxxxxxxxxxxxxxxxxxx/viewform`
  The part between `/d/e/` and `/viewform` is your **form id**.
- ❌ The editor URL `.../forms/d/SOME_OTHER_ID/edit` has a *different* id that
  will **not** work with the submit endpoint.

(The "Get pre-filled link" in step 3 below also produces a `/d/e/…` URL, so you
can read the form id from there too.)

## 3. Get each question's entry id

1. In the form editor, click the **⋮** menu (top-right) → **Get pre-filled link**.
2. Fill every field with a throwaway value (e.g. type the field's name into it).
3. Click **Get link** → **Copy link**. The copied URL looks like:

   ```
   .../viewform?entry.1111111111=First&entry.2222222222=Last&entry.3333333333=...
   ```

4. Each `entry.NNNNNNNNNN` is the id for the field whose value you typed. Match
   them up to the fields by the throwaway values you entered.

## 4. Fill in `content/rsvp-form.ts`

```ts
export const rsvpForm = {
  formId: "1FAIpQLSxxxxxxxxxxxxxxxxxxxx",
  entries: {
    guestName: "entry.1111111111",
    contactNumber: "entry.2222222222",
    email: "entry.3333333333",
    attendance: "entry.4444444444",
    message: "entry.5555555555",
  },
  optionLabels: {
    attendance: { yes: "Yes", no: "No" },
  },
} as const;
```

Save. In dev the site hot-reloads; on Vercel, redeploy.

## 5. Test

Run `npm run dev`, submit the RSVP form on the site, then check your form's
**Responses** tab (and linked Sheet). A row should appear.

---

## Notes & troubleshooting

- **No secrets needed.** The form id and entry ids aren't sensitive, so they
  live in `content/rsvp-form.ts` (they're only used server-side anyway).
- **A field isn't saving** → its `entry.*` id is wrong, or (for the two
  multiple-choice questions) the option text doesn't match `optionLabels`
  exactly (watch for stray spaces / capitalization).
- **Everything blank but a row appears** → all entry ids are wrong; re-grab them
  via the pre-filled link.
- **Confirmation caveat:** Google's endpoint doesn't return a structured
  "saved OK", so the site's success message is optimistic. Always do one real
  test submission after changing the form. If you need guaranteed confirmation,
  the service-account Google Sheets route is the alternative.
- **Timestamp** is added automatically by Google in the linked Sheet — you don't
  send one.
