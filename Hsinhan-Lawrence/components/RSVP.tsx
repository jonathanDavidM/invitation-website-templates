"use client";
import { useState } from "react";
import { wedding } from "@/wedding.config";

type FormState = "idle" | "submitting" | "success" | "error";

export default function RSVP() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "", email: "", attendance: "", guests: "", dietary: "", message: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    // Simulate network — connect to your own API route or Formspree / EmailJS
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
  }

  return (
    <section className="relative bg-ink py-24 px-6 text-center overflow-hidden">

      {/* Giant background text */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        font-cormorant font-light pointer-events-none select-none whitespace-nowrap text-white/[0.025]"
        style={{ fontSize: "clamp(80px, 22vw, 200px)" }}>
        RSVP
      </span>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <p className="font-jost font-thin text-[9px] tracking-[0.44em] uppercase text-blush mb-3">
          Kindly Reply
        </p>
        <h3 className="font-cormorant font-light text-ivory mb-2"
          style={{ fontSize: "clamp(34px, 7vw, 56px)" }}>
          Will you join us?
        </h3>
        <p className="font-jost font-light text-[12px] tracking-[0.12em] text-ivory/35 mb-12">
          Please respond by {wedding.rsvpDeadline}
        </p>

        {state === "success" ? (
          /* Success state */
          <div className="py-16 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-blush/40 flex items-center justify-center mb-2">
              <span className="text-blush text-2xl">✓</span>
            </div>
            <p className="font-cormorant italic font-light text-ivory text-3xl">Thank you!</p>
            <p className="font-jost font-light text-ivory/40 text-sm tracking-wider">
              Your RSVP has been received. We can't wait to celebrate with you.
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="font-jost font-thin text-[9px] tracking-[0.3em] uppercase text-ivory/30 block mb-1.5">
                  Full Name *
                </label>
                <input
                  className="rsvp-input"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="font-jost font-thin text-[9px] tracking-[0.3em] uppercase text-ivory/30 block mb-1.5">
                  Email Address *
                </label>
                <input
                  className="rsvp-input"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="font-jost font-thin text-[9px] tracking-[0.3em] uppercase text-ivory/30 block mb-1.5">
                  Attendance *
                </label>
                <select
                  className="rsvp-input"
                  value={form.attendance}
                  onChange={(e) => update("attendance", e.target.value)}
                  required
                >
                  <option value="" disabled>Select…</option>
                  <option value="yes">Joyfully Accept</option>
                  <option value="no">Regretfully Decline</option>
                </select>
              </div>

              <div>
                <label className="font-jost font-thin text-[9px] tracking-[0.3em] uppercase text-ivory/30 block mb-1.5">
                  No. of Guests *
                </label>
                <select
                  className="rsvp-input"
                  value={form.guests}
                  onChange={(e) => update("guests", e.target.value)}
                  required
                >
                  <option value="" disabled>Select…</option>
                  {[1,2,3,4].map(n => (
                    <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="font-jost font-thin text-[9px] tracking-[0.3em] uppercase text-ivory/30 block mb-1.5">
                  Dietary Requirements
                </label>
                <input
                  className="rsvp-input"
                  type="text"
                  placeholder="Vegetarian, gluten-free, allergies…"
                  value={form.dietary}
                  onChange={(e) => update("dietary", e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <label className="font-jost font-thin text-[9px] tracking-[0.3em] uppercase text-ivory/30 block mb-1.5">
                  Message for the Couple
                </label>
                <textarea
                  className="rsvp-input resize-none"
                  rows={3}
                  placeholder="Leave a warm message…"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={state === "submitting"}
              className="mt-3 w-full border border-gold text-gold font-jost font-light
                text-[10px] tracking-[0.4em] uppercase py-4
                hover:bg-gold hover:text-ink transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state === "submitting" ? "Sending…" : "Send my RSVP"}
            </button>

            <p className="text-center font-jost font-thin text-[9px] tracking-[0.18em] text-ivory/20 mt-1 uppercase">
              Please respond by {wedding.rsvpDeadline}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
