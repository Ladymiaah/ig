import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number>(0); // first is active by default

    const faqs = [
        {
            q: "How do I create an invoice?",
            a: `Click the "Create Invoice" button, fill in your customer details, items, prices, taxes, and due date, then Save or Export to generate a PDF you can download or email directly.`,
        },
        {
            q: "Can I customize my invoices (logo, company info, currency)?",
            a: `Yes — add your company name, address, logo, and default currency in settings. You can also choose from templates and include custom notes on each invoice.`,
        },
        {
            q: "Can I save clients and items for reuse?",
            a: `Absolutely — save client records and item/service lines to reuse them when creating future invoices and speed up invoicing.`,
        },
        {
            q: "How do I send invoices to my customers?",
            a: `Export invoices as PDF to attach to email, or use the built-in email option to send invoices directly from the app.`,
        },
        {
            q: "Is my invoice data secure?",
            a: `Yes — we use secure storage and standard best practices to protect your data. You control your business and client information.`,
        },
        {
            q: "How much does it cost to use the invoice generator?",
            a: `It’s free — create, manage, and send unlimited invoices at no cost.`,
        },
    ];

    const toggleFAQ = (index: number) => setActiveIndex((prev) => (prev === index ? -1 : index));

    return (
    <section id="faq">
        
            <h1 className="text-center pt-10 sm:pt-25 text-3xl sm:text-5xl text-primary font-heading">
                Got Questions & <br/> We've got answers!
            </h1>
         <div className=" pt-5 sm:pt-10 text-left ">
        
                    {faqs.map((item, index) => {
                        const isOpen = activeIndex === index;
                        const cardBase = "w-full sm:w-full md:w-[40rem] lg:w-[50rem] mx-auto mt-5 rounded-xl p-4 transition-all duration-200";
                        const openClasses = "bg-[var(--color-subtle)] border border-accent/20"; 
                        const closedClasses = "bg-[var(--color-card)] border border-gray-100"; 
                        return (
                            <div
                                key={index}
                                className={`${cardBase} ${isOpen ? openClasses : closedClasses}`}
                                aria-expanded={isOpen}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left flex justify-between items-center gap-6"
                                    aria-controls={`faq-body-${index}`}
                                    aria-expanded={isOpen}
                                >
                                    <h3 className="text-sm sm:text-xl font-semibold">{item.q}</h3>
                                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                                </button>
                                <div
                                    id={`faq-body-${index}`}
                                    className={`text-sm text-muted mt-4 ${isOpen ? "block" : "hidden"}`}
                                >
                                    {item.a.split("\n").map((line, i, arr) => (
                                        <span key={i}>
                                            {line}
                                            {i < arr.length - 1 && <br className="hidden sm:block" />}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
        </div>
    </section>
    );
}