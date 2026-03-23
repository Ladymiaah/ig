import Link from "next/link";
import { ArrowRight, Layout, Zap, ShoppingBag } from "lucide-react";

export default function InvoiceTemplatePage() {
  const templates = [
    {
      title: "Service Invoice",
      description: "Best for freelancers, consultants, and contractors.",
      link: "/invoice/services",
      img: "/service-img.png",
      icon: <Zap size={18} />,
      tag: "Popular"
    },
    {
      title: "Retail Invoice",
      description: "Perfect for physical goods and e-commerce stores.",
      link: "/invoice/new",
      img: "/retail-img.png",
      icon: <ShoppingBag size={18} />,
      tag: "Essential"
    },
    {
      title: "Event Planner",
      description: "Itemized billing for venues, catering, and decor.",
      link: "/invoice/new", // Update this when you create the event page
      img: "/retail-img.png",
      icon: <Layout size={18} />,
      tag: "Detailed"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 sm:px-20 py-16">
      {/* HEADER SECTION */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-[#1e293b] tracking-tight">
          Select a Template
        </h1>
        <p className="text-[#64748b] mt-2 text-lg">
          Choose the best layout for your business needs and start billing.
        </p>
      </div>

      {/* TEMPLATE GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, index) => (
          <div 
            key={index} 
            className="group bg-[#ffffff] rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#7e22ce] transition-all duration-300 flex flex-col"
          >
            {/* IMAGE PREVIEW AREA */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f5f9]">
              <img 
                src={template.img} 
                alt={template.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-[#ffffff]/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#7e22ce] uppercase tracking-wider border border-[#e9d5ff]">
                {template.tag}
              </div>
            </div>

            {/* CARD CONTENT */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-2 text-[#7e22ce]">
                {template.icon}
                <h2 className="text-xl font-bold text-[#334155]">{template.title}</h2>
              </div>
              <p className="text-[#64748b] text-sm leading-relaxed mb-6">
                {template.description}
              </p>

              {/* CTA BUTTON */}
              <Link 
                href={template.link} 
                className="mt-auto flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] font-bold rounded-xl group-hover:bg-[#7e22ce] group-hover:text-[#ffffff] group-hover:border-[#7e22ce] transition-all"
              >
                Use Template
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}