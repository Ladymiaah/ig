"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError(null);

    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Server error");

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="mt-12">
      <div className="max-w-5xl mx-auto bg-card rounded-2xl p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <h2 className="text-primary text-2xl font-extrabold mb-2">Contact Us</h2>
            <p className="text-muted mb-4">Have questions or need help? Send us a message <br/> and we’ll get back to you within 24 hours.</p>

            <div className="space-y-3 text-sm text-muted">
              <div>
                <div className="font-semibold text-primary">Email</div>
                <a href="mailto:support@invoice.example" className="text-gray-600 hover:underline">support@invoice.example</a>
              </div>
              <div>
                <div className="font-semibold text-primary">Phone</div>
                <div className="text-gray-600">+1 (555) 123-4567</div>
              </div>
              <div>
                <div className="font-semibold text-primary">Support Hours</div>
                <div className="text-gray-600">Mon–Fri, 9AM–6PM</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-[var(--color-subtle)] rounded-lg p-4">
            {success ? (
              <div className="text-green-600 font-medium">Thanks — your message was sent successfully.</div>
            ) : (
              <>
                {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

                <label className="block text-sm mb-1">Name</label>
                <input
                  className="w-full rounded-md border p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Name"
                  required
                />

                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full rounded-md border p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                  required
                />

                <label className="block text-sm mb-1">Message</label>
                <textarea
                  className="w-full rounded-md border p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary h-28"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-label="Message"
                  required
                />

                <button
                  type="submit"
                  className="inline-block bg-primary text-[#6b21a8] px-4 py-2 rounded-md font-semibold disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
