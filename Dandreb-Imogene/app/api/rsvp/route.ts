import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/rsvp-schema";
import { submitToGoogleForm, rsvpFormConfigured } from "@/lib/google-form";

export const runtime = "nodejs";

/**
 * POST /api/rsvp
 * Validates the payload (zod) and forwards it into the configured Google Form.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = rsvpSchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Please review the highlighted fields.",
        fieldErrors,
      },
      { status: 422 },
    );
  }

  // Honeypot tripped — pretend success so bots move on.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, message: "Thank you!" });
  }

  if (!rsvpFormConfigured()) {
    console.error(
      "RSVP received but the Google Form is not configured. See content/rsvp-form.ts + docs/GOOGLE_FORM_SETUP.md",
    );
    return NextResponse.json(
      {
        ok: false,
        message:
          "The RSVP service is not available right now. Please message us directly — we would still love to hear from you.",
      },
      { status: 503 },
    );
  }

  try {
    await submitToGoogleForm(parsed.data);
  } catch (error) {
    console.error("Failed to submit RSVP to Google Form:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Something went wrong saving your response. Please try again in a moment.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      parsed.data.attendance === "yes"
        ? "Thank you! We can't wait to celebrate with you."
        : "Thank you for letting us know — you will be missed.",
  });
}
