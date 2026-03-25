"use client";
import Image from "next/image";
import Link from "next/link";
import FAQ from "./Faq";
import Contact from "./Contact";

export default function HeroSection() {
  const features = [
    { title: 'Customizable Templates', desc: 'Brand invoices with your logo, colors, and custom notes.', icon: '🎨' },
    { title: 'Client & Item Management', desc: 'Save clients and products/services for fast reuse.', icon: '👥' },
    { title: 'Export & Send', desc: 'Download PDF invoices or email them directly to customers.', icon: '📤' },
    { title: 'Taxes & Discounts', desc: 'Apply tax rates and discounts per line or invoice-level.', icon: '📊' },
    { title: 'Secure Storage', desc: 'Your data is protected with industry-standard security practices.', icon: '🔒' },
  ];
  return (
    <section id="hero" className=" px-10 sm:px-20  mt-10">
      <div className="text-center">
            <h1 className="text-2xl sm:text-7xl text-accent">Powerful Invoicing Platform <br/> for Your Business</h1>
            <p className="text-accent/80 mt-5 sm:text-lg mb-10">Our user-friendly invoicing platform designed to revolutionized the way you handle <br/>
            your invoicing tasks with our intuitive interface and powerful features.</p>
            <Link href="/InvoiceTemplate" className="mt-6 inline-block bg-black shadow-xl p-4 text-[#b9b4b4] rounded-xl text-xl font-semibold hover:brightness-95 transition">
                Create your first Invoice
            </Link>
<div className=" shadow-md border-8 border-[#642eb8] rounded-xl mt-10 p-6">
            <Image
            src="/hero-img.png"
            alt="Hero Image"
            width={1500}
            height={600}
            className="mx-auto rounded-xl"
          />
          </div>
        </div>

        {/* about section */}
        <div id="about" className="mt-16 bg-gradient-to-r from-[var(--color-subtle)] to-white rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-primary text-3xl font-extrabold mb-2">About Us</h2>
              <p className="mt-2 text-base text-muted">We empower small businesses and freelancers to create professional invoices quickly and efficiently. Our platform focuses on simplicity, reliability, and security so you can spend less time on paperwork and more time growing your business.</p>
              <div className="mt-4 flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">1k+</div>
                  <div className="text-sm text-muted">Happy users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">99.9%</div>
                  <div className="text-sm text-muted">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-muted">Support</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Image src="/logo.png" alt="About" width={400} height={250} className="rounded-xl shadow-lg" />
            </div>
          </div>
        </div>

        {/* feature section */}
        <div id="feature" className="mt-12">
          <h2 className="text-primary text-3xl font-extrabold mb-6 text-center">Features</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-card rounded-lg p-5 shadow hover:shadow-lg transform hover:-translate-y-1 transition">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-subtle)] to-[#fde8f6] rounded-full flex items-center justify-center text-accent mb-4">
                  <span className="text-xl">{f.icon}</span>
                </div>
                <h3 className="font-semibold text-lg text-primary">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* pricing section */}
        <div id="pricing" className="mt-12">
          <h2 className="text-primary text-3xl font-extrabold mb-6 text-center">Pricing</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-6 text-center bg-card shadow-sm">
              <div className="text-sm font-medium text-muted">Free</div>
              <div className="mt-4 text-4xl font-extrabold">Free</div>
              <div className="mt-4 text-sm text-muted">Create and send unlimited invoices. No credit card required.</div>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Unlimited invoices</li>
                <li>PDF export & email</li>
                <li>Basic templates</li>
              </ul>
              <Link href="/SignIn" className="mt-6 inline-block bg-[var(--color-subtle)] text-primary px-6 py-2 rounded-lg font-semibold">Get Started</Link>
            </div>
            <div className="border-2 border-accent rounded-xl p-6 text-center bg-gradient-to-b from-white to-[#fff7ff] shadow-xl transform scale-105">
              <div className="inline-block px-3 py-1 bg-accent text-white rounded-full text-sm font-medium">Most Popular</div>
              <div className="mt-4 text-sm font-medium text-muted">Pro</div>
              <div className="mt-4 text-4xl font-extrabold">$9<span className="text-base font-medium">/mo</span></div>
              <div className="mt-4 text-sm text-muted">Everything in Free plus advanced features for growing teams.</div>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Everything in Free</li>
                <li>Custom templates</li>
                <li>Team access & roles</li>
                <li>Priority support</li>
              </ul>
              <Link href="/SignIn" className="mt-6 inline-block bg-accent text-white px-6 py-2 rounded-lg font-semibold">Choose Pro</Link>
            </div>
            <div className="border rounded-xl p-6 text-center bg-card shadow-sm">
              <div className="text-sm font-medium text-muted">Enterprise</div>
              <div className="mt-4 text-4xl font-extrabold">$Custom</div>
              <div className="mt-4 text-sm text-muted">Custom solutions for large teams and enterprises.</div>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>All Pro features</li>
                <li>Custom integrations</li>
                <li>Dedicated support</li>
              </ul>
              <Link href="/SignIn" className="mt-6 inline-block bg-[#f3f3e6] text-primary px-6 py-2 rounded-lg font-semibold">Contact Sales</Link>
            </div>
          </div>
        </div>

        {/* contact section */}

        <Contact />

        {/* faq section */}

        <FAQ />

       

    </section>
  );
}