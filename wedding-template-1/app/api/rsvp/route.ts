import { NextRequest, NextResponse } from "next/server";
import type { RSVPFormData } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: RSVPFormData = await request.json();

    // ── Validation ──────────────────────────────────────────
    const { firstName, lastName, email, attending } = body;

    if (!firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json(
        { error: "First and last name are required." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!["yes", "no"].includes(attending)) {
      return NextResponse.json(
        { error: "Attendance field is invalid." },
        { status: 400 }
      );
    }

    // ── Log submission (replace with email service in production) ──
    console.log("📩 New RSVP received:", {
      name: `${firstName} ${lastName}`,
      email,
      attending,
      guests: body.guests,
      meal: body.meal,
      notes: body.notes,
      timestamp: new Date().toISOString(),
    });

    // ── TODO: Add email integration ──────────────────────────
    //
    // Option 1 — Resend (recommended):
    //   import { Resend } from "resend";
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: "wedding@yourdomain.com",
    //     to: process.env.RSVP_EMAIL!,
    //     subject: `New RSVP from ${firstName} ${lastName}`,
    //     html: `<p>...</p>`,
    //   });
    //
    // Option 2 — Formspree:
    //   Remove this API route and POST directly to
    //   https://formspree.io/f/YOUR_FORM_ID
    // ────────────────────────────────────────────────────────

    return NextResponse.json(
      { message: "RSVP received successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
