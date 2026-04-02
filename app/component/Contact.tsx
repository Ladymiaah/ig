"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = (ev: React.FormEvent) => {
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

    // 1. Define your support email
    const recipient = "zamtinvoice@gmail.com"; 
    
    // 2. Construct the subject and body
    // encodeURIComponent ensures spaces and symbols don't break the URL
    const subject = encodeURIComponent(`New Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`
    );

    // 3. Open the mail client
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="mt-12 w-full rounded-2xl p-6 sm:p-10 shadow-sm">
      <div className="max-w-7xl mx-auto bg-card rounded-2xl p-6 sm:p-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <h2 className="text-primary text-2xl font-extrabold mb-2">Contact Us</h2>
            <p className="text-muted text-sm md:text-base mb-4">Have questions or need help? Fill out the form <br className="hidden md:block"/> and we’ll open your mail app to send the request.</p>

            <div className="space-y-3 text-sm text-muted">
              <div>
                <div className="font-semibold text-primary">Email</div>
                <a href="mailto:zamtinvoice@gmail.com" className="text-gray-600 hover:underline">Zamtinvoice@gmail.com</a>
              </div>
              <div>
                <div className="font-semibold text-primary">Support Hours</div>
                <div className="text-gray-600">Mon–Fri, 9AM–6PM</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            {error && <div className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">Full Name</label>
                <input
                  className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-primary">Your Email</label>
                <input
                  type="email"
                  className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-primary">Message</label>
                <textarea
                  className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-32 transition-all"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#a45ca9] text-white  px-6 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
               Send Mail
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}