"use client";
// components/sections/RsvpSection.tsx
import { useState } from "react";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { WEDDING } from "@/lib/wedding-data";
import { Send, Check } from "lucide-react";

type AttendanceStatus = "attending" | "not-attending" | "";

interface FormState {
  name: string;
  email: string;
  guests: string;
  status: AttendanceStatus;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  guests: "1",
  status: "",
  message: "",
};

export function RsvpSection() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, wire this to an API route or form service (Formspree, etc.)
    console.log("RSVP submitted:", form);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <SectionWrapper id="rsvp">
        <div className="text-center py-16">
          <div className="w-16 h-16 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-7 h-7 text-gold" />
          </div>
          <h3 className="font-display italic text-cream text-4xl mb-4">Thank You!</h3>
          <p className="font-body text-cream/50 text-sm max-w-sm mx-auto">
            We have received your RSVP. We cannot wait to celebrate with you on{" "}
            {WEDDING.date.display}.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm(INITIAL_STATE); }}
            className="mt-8 font-heading text-[10px] tracking-widest uppercase text-gold/60 hover:text-gold transition-colors"
          >
            Submit another response
          </button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="rsvp">
      <SectionHeader
        eyebrow="Kindly Reply"
        title="RSVP"
        subtitle={`Please respond by ${WEDDING.rsvp.deadline}`}
      />

      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-heading text-[9px] tracking-[0.3em] uppercase text-gold/60 mb-2">
              Full Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full bg-transparent border border-gold/20 px-4 py-3 font-body text-cream text-sm placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-heading text-[9px] tracking-[0.3em] uppercase text-gold/60 mb-2">
              Email Address *
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full bg-transparent border border-gold/20 px-4 py-3 font-body text-cream text-sm placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>

          {/* Attendance status */}
          <div>
            <label className="block font-heading text-[9px] tracking-[0.3em] uppercase text-gold/60 mb-3">
              Will you be attending? *
            </label>
            <div className="flex gap-4">
              {[
                { value: "attending", label: "Joyfully Accepts" },
                { value: "not-attending", label: "Regretfully Declines" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex-1 border cursor-pointer py-3 px-4 text-center transition-all duration-200 ${
                    form.status === option.value
                      ? "border-gold/60 bg-gold/10 text-gold"
                      : "border-gold/15 text-cream/40 hover:border-gold/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={form.status === option.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-body text-xs">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Number of guests */}
          {form.status === "attending" && (
            <div>
              <label className="block font-heading text-[9px] tracking-[0.3em] uppercase text-gold/60 mb-2">
                Number of Guests
              </label>
              <select
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="w-full bg-forest-deep border border-gold/20 px-4 py-3 font-body text-cream text-sm focus:outline-none focus:border-gold/50 transition-colors"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block font-heading text-[9px] tracking-[0.3em] uppercase text-gold/60 mb-2">
              Message for the Couple
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Share your wishes or any special notes..."
              className="w-full bg-transparent border border-gold/20 px-4 py-3 font-body text-cream text-sm placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!form.name || !form.email || !form.status}
            className="w-full flex items-center justify-center gap-3 border border-gold text-gold font-heading tracking-[0.3em] text-[10px] uppercase py-4 hover:bg-gold hover:text-forest-dark transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            Send RSVP
          </button>
        </form>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-gold/10 text-center">
          <p className="font-heading text-[9px] tracking-[0.25em] uppercase text-gold/40 mb-3">
            Questions? Reach us at
          </p>
          <a
            href={`mailto:${WEDDING.rsvp.email}`}
            className="font-body text-cream/50 text-sm hover:text-gold transition-colors"
          >
            {WEDDING.rsvp.email}
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
