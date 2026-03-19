import { NextRequest, NextResponse } from "next/server";
import type { RSVPFormData } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: RSVPFormData = await req.json();
    const { name, email, attending } = body;

    if (!name?.trim() || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Name and valid email are required." }, { status: 400 });
    }

    // Log for now — replace with Resend / SendGrid / Nodemailer
    console.log("📩 RSVP:", { name, email, attending, guests: body.guests, meal: body.meal, song: body.song, message: body.message, at: new Date().toISOString() });

    // TODO: integrate email service
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: "...", to: process.env.RSVP_EMAIL!, subject: `RSVP from ${name}`, html: `...` });

    return NextResponse.json({ message: "RSVP received!" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
