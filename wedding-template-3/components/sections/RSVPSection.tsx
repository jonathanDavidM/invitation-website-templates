"use client";
import { useState } from "react";
import { WEDDING } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import type { RSVPFormData, FormStatus } from "@/lib/types";
import styles from "@/styles/modules/rsvp.module.css";

const DEFAULT: RSVPFormData = {
  name: "", email: "", attending: "yes",
  guests: "1", meal: "meat", song: "", message: "",
};

export function RSVPSection() {
  const [form, setForm] = useState<RSVPFormData>(DEFAULT);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [err, setErr] = useState("");

  const set = <K extends keyof RSVPFormData>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value as RSVPFormData[K] }));

  const toggle = <K extends keyof RSVPFormData>(k: K, v: RSVPFormData[K]) =>
    () => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting"); setErr("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setErr("Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <section id="rsvp" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.eyebrow}>Join Us</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={styles.heading}>RSVP</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className={styles.subheading}>
            Kindly respond by{" "}
            <span className={styles.deadline}>{WEDDING.rsvpDeadline}</span>
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="gold-line" style={{ marginBottom: 56 }}><span /><i /><span /></div>
        </Reveal>

        <Reveal delay={0.25} animation="fadeIn">
          <div className={styles.formCard}>
            {status === "success" ? (
              <div className={styles.success}>
                <div className={styles.successCheck}>
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className={styles.successTitle}>See you there!</h3>
                <p className={styles.successBody}>
                  Thank you for your RSVP. We&apos;re so excited to celebrate with you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Name + Email */}
                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="rsvp-name">Full Name</label>
                    <input
                      id="rsvp-name" className={styles.input} type="text"
                      placeholder="Your full name" value={form.name}
                      onChange={set("name")} required autoComplete="name"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="rsvp-email">Email</label>
                    <input
                      id="rsvp-email" className={styles.input} type="email"
                      placeholder="you@email.com" value={form.email}
                      onChange={set("email")} required autoComplete="email"
                    />
                  </div>
                </div>

                {/* Attending toggle */}
                <div className={styles.field}>
                  <span className={styles.label}>Attendance</span>
                  <div className={styles.toggle}>
                    {(["yes", "no"] as const).map(v => (
                      <button key={v} type="button"
                        className={`${styles.toggleBtn} ${form.attending === v ? styles.toggleActive : ""}`}
                        onClick={toggle("attending", v)}
                        aria-pressed={form.attending === v}
                      >
                        {v === "yes" ? "Joyfully Accepts" : "Regretfully Declines"}
                      </button>
                    ))}
                  </div>
                </div>

                {form.attending === "yes" && (
                  <>
                    {/* Guests + Meal */}
                    <div className={styles.row2}>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="rsvp-guests">No. of Guests</label>
                        <div className={styles.selectWrap}>
                          <select id="rsvp-guests" className={styles.select} value={form.guests} onChange={set("guests")}>
                            <option value="1">1 – Just me</option>
                            <option value="2">2 – Plus one</option>
                            <option value="3">3 – Three guests</option>
                            <option value="4">4 – Four guests</option>
                          </select>
                          <span className={styles.selectCaret} aria-hidden>▾</span>
                        </div>
                      </div>
                      <div className={styles.field}>
                        <span className={styles.label}>Meal Preference</span>
                        <div className={styles.mealRow}>
                          {(["meat", "fish", "vegetarian"] as const).map(v => (
                            <button key={v} type="button"
                              className={`${styles.mealBtn} ${form.meal === v ? styles.mealActive : ""}`}
                              onClick={toggle("meal", v)}
                              aria-pressed={form.meal === v}
                            >
                              {v === "meat" ? "🥩" : v === "fish" ? "🐟" : "🌿"}
                              <span>{v.charAt(0).toUpperCase() + v.slice(1)}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Song request */}
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="rsvp-song">Song Request (optional)</label>
                      <input
                        id="rsvp-song" className={styles.input} type="text"
                        placeholder="What song will get you on the dance floor?"
                        value={form.song} onChange={set("song")}
                      />
                    </div>
                  </>
                )}

                {/* Message */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="rsvp-msg">Message to the Couple (optional)</label>
                  <textarea
                    id="rsvp-msg" className={styles.textarea} rows={3}
                    placeholder="A note, a wish, or just some love…"
                    value={form.message} onChange={set("message")}
                  />
                </div>

                {err && <p className={styles.errMsg} role="alert">{err}</p>}

                <button
                  type="submit" className={styles.submit}
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Confirm RSVP"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
