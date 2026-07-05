import { rsvpForm, rsvpFormConfigured } from "@/content/rsvp-form";
import type { RsvpData } from "./rsvp-schema";

export { rsvpFormConfigured };

/**
 * Submits one RSVP into the configured Google Form.
 *
 * We post server-side (from the API route) to the form's `/formResponse`
 * endpoint as url-encoded `entry.*` pairs — the same request the public form
 * makes — so there's no CORS, no auth, and responses land in the form's
 * linked Google Sheet. Google returns its confirmation page (200) on success;
 * it does not return structured data, so we treat a non-error status as saved.
 */
export async function submitToGoogleForm(data: RsvpData): Promise<void> {
  const { formId, entries, optionLabels } = rsvpForm;

  const params = new URLSearchParams();
  const set = (entryId: string, value: string | number | undefined) => {
    if (entryId && value !== undefined && value !== "") {
      params.append(entryId, String(value));
    }
  };

  set(entries.guestName, data.guestName);
  set(entries.contactNumber, data.contactNumber);
  set(entries.email, data.email);
  set(entries.attendance, optionLabels.attendance[data.attendance]);
  set(entries.message, data.message);

  const url = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
    // Google answers with a redirect/confirmation page; we don't need to follow it.
    redirect: "manual",
  });

  // 2xx = recorded; 3xx = redirect to the confirmation page (also success).
  if (res.status >= 400) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Google Form submit failed (${res.status}): ${detail.slice(0, 200)}`);
  }
}
