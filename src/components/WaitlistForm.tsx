"use client";

import { FormEvent, useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [project, setProject] = useState("");
  const [footage, setFootage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, project, footage }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(
          data?.error ?? "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setError(
        "We could not reach the server. Check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="mt-8 border border-ember/40 bg-ember/[0.08] p-5"
        role="status"
      >
        <p className="text-lg font-medium text-foreground">
          You are on the list. We are looking for people with footage worth
          finding.
        </p>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full border border-line bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted/50 focus:border-ember"
          autoComplete="email"
          aria-describedby={error ? "email-error" : undefined}
          required
        />
        {error ? (
          <p id="email-error" className="mt-2 text-sm text-ember">
            {error}
          </p>
        ) : null}
      </Field>
      <Field label="Role" htmlFor="role">
        <input
          id="role"
          name="role"
          type="text"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="w-full border border-line bg-background px-4 py-3 text-foreground outline-none transition focus:border-ember"
          autoComplete="organization-title"
        />
      </Field>
      <Field label="What are you trying to cut?" htmlFor="project">
        <textarea
          id="project"
          name="project"
          rows={4}
          value={project}
          onChange={(event) => setProject(event.target.value)}
          className="w-full resize-none border border-line bg-background px-4 py-3 text-foreground outline-none transition focus:border-ember"
        />
      </Field>
      <Field
        label="How many hours of footage are you sitting on?"
        htmlFor="footage"
      >
        <input
          id="footage"
          name="footage"
          type="text"
          value={footage}
          onChange={(event) => setFootage(event.target.value)}
          className="w-full border border-line bg-background px-4 py-3 text-foreground outline-none transition focus:border-ember"
        />
      </Field>
      <button
        type="submit"
        disabled={submitting}
        className="w-full border border-ember/50 bg-ember px-5 py-3 text-sm font-medium text-background transition hover:bg-foreground focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ember"
      >
        {submitting ? "Sending…" : "Request access"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
