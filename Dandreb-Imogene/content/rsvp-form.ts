/**
 * RSVP → Google Form wiring.
 *
 * Your on-site form quietly submits into a Google Form you create, so
 * responses collect in that form's linked Google Sheet — no Google Cloud
 * project, no service account, no private keys.
 *
 * Fields match your form: Name of Guest, Contact Number, Email,
 * Will you attend?, Message.
 *
 * Fill in the ids below, then the RSVP goes live.
 * Step-by-step: docs/GOOGLE_FORM_SETUP.md
 */
export const rsvpForm = {
  /**
   * The form's response id — the token in the live (responder) URL:
   * https://docs.google.com/forms/d/e/THIS_PART/viewform
   */
  formId: "1FAIpQLSfXeUu47M0bKT6tkssrgGULevhAHW8vmv5sYLvavz_J01i5NA",

  /**
   * Each question's entry id (looks like "entry.123456789"), from the form's
   * "Get pre-filled link". Leave a field "" to skip sending it.
   */
  entries: {
    guestName: "entry.179966949",
    contactNumber: "entry.1324522517",
    email: "entry.1917254771",
    attendance: "entry.817793193",
    message: "entry.1679184069",
  },

  /**
   * The "Will you attend?" question is multiple-choice, so Google needs the
   * EXACT option text. Set these to match your form's two options
   * (or change your form's options to match these).
   */
  optionLabels: {
    attendance: {
      yes: "Joyfully accepts",
      no: "Regretfully declines",
    },
  },
} as const;

/** True once the form id and the name entry are filled in. */
export function rsvpFormConfigured(): boolean {
  return Boolean(rsvpForm.formId && rsvpForm.entries.guestName);
}
