"use client";
import Image from "next/image";
import Link from "next/link";
import FAQ from "./Faq";
import Contact from "./Contact";

export default function HeroSection() {
  const features = [
    {title: 'Instant Setup', desc: 'Get started quickly without any account creation.', icon: '⚡'},
    { title: 'Customizable Templates', desc: 'Brand invoices with your logo, colors, and custom notes.', icon: '🎨' },
    { title: 'Client & Item Management', desc: 'Save clients and products/services for fast reuse.', icon: '👥' },
    { title: 'Export & Send', desc: 'Download PDF invoices or email them directly to customers.', icon: '📤' },
    { title: 'Taxes & Discounts', desc: 'Apply tax rates and discounts per line or invoice-level.', icon: '📊' },
    { title: 'Secure Storage', desc: 'Your data is protected with industry-standard security practices.', icon: '🔒' },
    
  ];
  return (
    <section id="hero" className=" px-10 sm:px-20  mt-10">
      <div className="text-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-accent">Powerful Invoicing Platform <br/> for Your Business</h1>
            <p className="text-accent/80 mt-5 text-sm md:text-lg mb-10">Our user-friendly invoicing platform designed to revolutionized the way you handle <br className="hidden lg:block"/>
            your invoicing tasks with our intuitive interface and powerful features.</p>
            <Link href="/InvoiceTemplate" className="relative z-20 mt-6 inline-block bg-black shadow-xl p-4  text-[#b9b4b4] cursor-pointer rounded-xl text-xl font-semibold hover:brightness-95 transition">
                Create your first Invoice
            </Link>
<div className=" shadow-md border-8 border-[#a45ca9] rounded-xl mt-10 p-6">
            <Image
            src="/hero-img.png"
            alt="Hero Image"
            width={1500}
            height={600}
            className="mx-auto rounded-xl"
          />
          </div>
        </div>

        {/* About section */}
       <div id="about" className="mt-16 bg-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm items-center">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* Left Side: Content */}
    <div className="space-y-6">
      <div>
        <span className="text-accent font-semibold tracking-wider uppercase text-sm">Our Mission</span>
        <h2 className="text-primary text-2xl md:text-3xl lg:text-4xl font-black mt-2 leading-tight">
          Simplifying the way <br /> 
          <span className="text-accent">you get paid.</span>
        </h2>
      </div>
      
      <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
        We built this generator because invoicing shouldn't be a chore. Our mission is to strip away the complexity of traditional accounting software, giving freelancers and small businesses a <strong>fast, reliable, and beautiful</strong> way to bill clients in seconds.
      </p>
       
    </div>

    {/* Right Side: Visual */}
   
  {/* Right Side: Visual */}
<div className="relative group flex justify-center items-center"> {/* Added relative here */}
  <div className="absolute -inset-10 bg-gradient-to-tr from-[#a45ca9]/30 to-primary/10 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition duration-700 pointer-events-none"></div> {/* Added pointer-events-none */}
  
  <div className="relative shadow-2xl transform transition hover:scale-[1.02] duration-500 overflow-hidden rounded-3xl">
    <div className="overflow-hidden">
      <Image 
        src="/about-img.png"
        alt="Modern Invoicing Success" 
        width={600} 
        height={450} 
        className="object-cover"
      />
    </div>
  </div>
</div>
</div>
    
  </div>

        {/* feature section */}
        <div id="feature" className="mt-12 w-full rounded-2xl p-6 sm:p-10 shadow-sm">
          <h2 className="text-primary text-3xl font-extrabold mb-6 text-center">Features</h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div id="pricing" className="mt-20 px-4">
  <div className="text-center mb-12">
    <h2 className="text-primary text-4xl font-black mb-4">Simple, Transparent Pricing</h2>
    <p className="text-muted text-lg max-w-2xl mx-auto">
      Start for free and scale as your business grows. No hidden fees, no credit card required.
    </p>
  </div>

  {/* Max-w-7xl makes it feel much wider/full-screen on desktop */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
    
    {/* FREE PLAN */}
    <div className="group border border-slate-200 rounded-3xl p-8 sm:p-12 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Starter</div>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black text-primary">Free</span>
          <span className="text-muted italic">forever</span>
        </div>
        <p className="mt-6 text-slate-600 text-sm md:text-base leading-relaxed">
          Perfect for freelancers and side-hustlers who need to send professional invoices quickly.
        </p>
        
        <ul className="mt-8 space-y-4">
          {["Unlimited invoices", "PDF export & email", "Basic templates", "Mobile responsive"].map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-slate-600">
              <span className="text-green-500 font-bold">✓</span> {feature}
            </li>
          ))}
        </ul>
      </div>

      <Link 
        href="/firebase-auth/SignIn" 
        className="mt-10 block w-full text-center bg-slate-100 hover:bg-slate-200 text-primary py-4 rounded-xl font-bold transition-colors"
      >
        Get Started Now
      </Link>
    </div>

   {/* ENTERPRISE PLAN */}
<div className="group relative border-none rounded-3xl p-8 sm:p-12 bg-slate-900 text-white shadow-2xl flex flex-col justify-between overflow-hidden transition-transform hover:scale-[1.01]">
  {/* The "Glow" - This makes it look modern, not flat */}
  <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/30 rounded-full blur-[100px]"></div>
  
  <div className="relative z-10">
    <div className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Enterprise</div>
    <div className="flex items-baseline gap-1">
      <span className="text-5xl font-black text-white">Custom</span>
    </div>
    <p className="mt-6 text-slate-400 md:text-lg leading-relaxed">
      Tailored solutions for agencies and high-volume billing teams.
    </p>
    
    <ul className="mt-8 space-y-4">
      {[
        "All Starter features", 
        "Custom branding & logos", 
        "Multi-user team access", 
        "Dedicated Account Manager", 
        "Custom API Integrations"
      ].map((feature) => (
        <li key={feature} className="flex items-center gap-3 text-slate-200">
          {/* Using a bright checkmark for contrast */}
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">✓</span> 
          {feature}
        </li>
      ))}
    </ul>
  </div>

  <Link 
    href="/firebase-auth/SignIn" 
    className="relative z-10 mt-10 block w-full text-center bg-white text-slate-900 hover:bg-accent hover:text-white py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95"
  >
    Contact Sales
  </Link>
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