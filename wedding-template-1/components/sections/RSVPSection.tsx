"use client";

import { useState } from "react";
import { WEDDING, MEAL_OPTIONS, GUEST_OPTIONS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { RSVPFormData, FormStatus } from "@/lib/types";
import styles from "@/styles/modules/rsvp.module.css";

const DEFAULT_FORM: RSVPFormData = {
  firstName: "",
  lastName: "",
  email: "",
  attending: "yes",
  guests: "1",
  meal: "meat",
  notes: "",
};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function RSVPSection() {
  const [form, setForm] = useState<RSVPFormData>(DEFAULT_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const setField =
    <K extends keyof RSVPFormData>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value as RSVPFormData[K] }));
    };

  const setDirect =
    <K extends keyof RSVPFormData>(key: K, value: RSVPFormData[K]) =>
    () => {
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <section id="rsvp" className={styles.rsvp}>
      <div className={styles.inner}>
        <SectionHeader tag="RSVP" title="Will you join us?" light />

        <Reveal delay={0.1}>
          <p className={styles.deadline}>
            Kindly reply by{" "}
            <span className={styles.deadlineDate}>{WEDDING.rsvpDeadline}</span>
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className={styles.formWrap}>
            <div className={styles.innerBorder} aria-hidden="true" />

            {status === "success" ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <CheckIcon />
                </div>
                <h3 className={styles.successTitle}>We can&apos;t wait to see you!</h3>
                <p className={styles.successBody}>
                  Your RSVP has been received.
                  <br />
                  We&apos;ll be in touch with more details soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className={`${styles.row} ${styles.twoCol}`}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      className={styles.input}
                      type="text"
                      placeholder="Eleanor"
                      value={form.firstName}
                      onChange={setField("firstName")}
                      required
                      autoComplete="given-name"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      className={styles.input}
                      type="text"
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={setField("lastName")}
                      required
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className={`${styles.row} ${styles.field}`}>
                  <label className={styles.label} htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    className={styles.input}
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={setField("email")}
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Attendance toggle */}
                <div className={styles.row}>
                  <span className={styles.label}>Will you attend?</span>
                  <div className={styles.attendToggle} role="group" aria-label="Attendance">
                    {(["yes", "no"] as const).map((val) => (
                      <button
                        key={val}
                        type="button"
                        className={`${styles.attendBtn} ${form.attending === val ? styles.attendBtnActive : ""}`}
                        onClick={setDirect("attending", val)}
                        aria-pressed={form.attending === val}
                      >
                        {val === "yes" ? "✓  Joyfully Accepts" : "✗  Regretfully Declines"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditional fields when attending */}
                {form.attending === "yes" && (
                  <div className={`${styles.row} ${styles.twoCol}`}>
                    {/* Guest count */}
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="guests">Number of Guests</label>
                      <div className={styles.selectWrap}>
                        <select
                          id="guests"
                          className={styles.select}
                          value={form.guests}
                          onChange={setField("guests")}
                        >
                          {GUEST_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <span className={styles.selectArrow} aria-hidden="true">▾</span>
                      </div>
                    </div>

                    {/* Meal preference */}
                    <div className={styles.field}>
                      <span className={styles.label}>Meal Preference</span>
                      <div
                        className={styles.mealToggle}
                        role="group"
                        aria-label="Meal preference"
                      >
                        {MEAL_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className={`${styles.mealBtn} ${form.meal === opt.value ? styles.mealBtnActive : ""}`}
                            onClick={setDirect("meal", opt.value)}
                            aria-pressed={form.meal === opt.value}
                          >
                            {opt.emoji}<br />{opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className={`${styles.row} ${styles.field}`}>
                  <label className={styles.label} htmlFor="notes">Dietary Notes & Message</label>
                  <textarea
                    id="notes"
                    className={styles.textarea}
                    placeholder="Allergies, dietary requirements, or a personal note for the couple…"
                    value={form.notes}
                    onChange={setField("notes")}
                    rows={4}
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <p className={styles.errorMsg} role="alert">{errorMsg}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className={`${styles.submitBtn} ${status === "submitting" ? styles.submitBtnLoading : ""}`}
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Send RSVP"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
