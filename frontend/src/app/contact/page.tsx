"use client";

// ContactAndFAQ.tsx
// Requires: Tailwind CSS, @mui/icons-material, @mui/material (for icons only)
// Install: npm install @mui/icons-material @mui/material @emotion/react @emotion/styled

import React, { useState } from "react";
import ContactIMG from "@/assets/images/contact.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InstagramIcon from "@mui/icons-material/Instagram";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import serverUrl from "@/utils/serverUrl";
import { toast } from "react-toastify";
// ─────────────────────────────────────────────
// FAQ Section
// ─────────────────────────────────────────────
const faqs = [
  "How can I become a guest writer?",
  "Do you offer sponsored content options?",
  "How do I manage my newsletter subscription?",
  "Can I use your articles for educational purposes?",
];

const FAQSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  const answers: Record<number, string> = {
    0: "We welcome guest writers! Please send your pitch and writing samples to our editorial team at hello@thecurator.com. We review all submissions within 5–7 business days.",
    1: "Yes, we offer sponsored content opportunities that align with our editorial standards. Reach out to our partnerships team for media kit and pricing.",
    2: "You can manage your newsletter preferences via the unsubscribe link at the bottom of any email, or by visiting your account settings on our website.",
    3: "Our articles are available for educational use with proper attribution. Please contact us for commercial or large-scale distribution rights.",
  };

  return (
    <section className="bg-[#f5f5f0] py-16 mt-16 px-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl mt-2 font-bold text-center">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Everything you need to know before reaching out.
        </p>

        <div className="mt-10 space-y-3">
          {faqs.map((q, i) => (
            <div
              key={i}
              className="overflow-hidden  rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-all"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none"
                aria-expanded={open === i}
              >
                <span>{q}</span>
                <span className="ml-4 shrink-0 text-gray-400">
                  {open === i ? (
                    <RemoveIcon fontSize="small" />
                  ) : (
                    <AddIcon fontSize="small" />
                  )}
                </span>
              </button>
              {open === i && (
                <div className="border-t border-gray-100 transition duration-150 px-5 pb-4 pt-3 text-sm text-gray-500 leading-relaxed">
                  {answers[i]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// CTA Section
// ─────────────────────────────────────────────
const CTASection: React.FC = () => (
  <section className="bg-[#f5f5f0] py-16 px-6 mt-24  text-center">
    <div className="mx-auto max-w-xl">
      <h2 className="md:text-3xl text-xl mt-2 font-bold text-center ">
        Ready to dive back into the stories?
      </h2>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Browse Blogs
        </button>
        <button className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer focus:ring-offset-2">
          View Categories
        </button>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Contact Section
// ─────────────────────────────────────────────
const contactCards = [
  {
    icon: <EmailOutlinedIcon className="text-blue-500" />,
    bg: "bg-blue-50",
    title: "Email Us",
    subtitle: "General inquiries and story pitches.",
    link: "arpansinghrajput123@gmail.com",
    href: "mailto:arpansinghrajput123@gmail.com",
  },
  {
    icon: <HeadsetMicOutlinedIcon className="text-purple-500" />,
    bg: "bg-purple-50",
    title: "Support",
    subtitle: "Technical issues and account help.",
    link: "support@singhblog.in",
    href: "mailto:support@singhblog.in",
  },
  {
    icon: <LocationOnOutlinedIcon className="text-orange-400" />,
    bg: "bg-orange-50",
    title: "Office",
    subtitle: "Visit our creative studio in Berlin.",
    link: "Gurgaon Haryana 122002",
    href: "https://maps.google.com",
  },
];

const HeroSection: React.FC = () => (
  <section className="relative overflow-hidden bg-[#dce8f5] py-28 px-6 text-center">
    {/* subtle grid texture */}
    <div
      className="pointer-events-none absolute inset-0 opacity-10"
      style={{
        background: "linear-gradient(114.82deg, #005EA3 0%, #0077CC 100%)",
        backgroundSize: "32px 32px",
      }}
    />

    <h1 className="mx-auto   text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
      Contact Us
    </h1>

    <p className="mx-auto mt-5 max-w-xl text-base text-gray-600 leading-relaxed">
      Have a question, feedback, or a story to share? Reach out to our editorial
      team and let's start a meaningful conversation.
    </p>

    <div className="mt-8 ">
      <Link
        href={"/category"}
        className="rounded-md cursor-pointer bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white  transition hover:bg-blue-700   shadow-[0px_8px_10px_-6px_#005EA333,0px_20px_25px_-5px_#005EA333]"
      >
        Explore Blogs
      </Link>
    </div>
  </section>
);

const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post(`${serverUrl}api/v1/contact`, {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
    toast.success("Message sent! We'll get back to you soon.");
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="bg-white   px-12">
      <div className="mx-auto  ">
        {/* Contact cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center gap-2 rounded-2xl bg-gray-50 p-6 text-center shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full ${card.bg}`}
              >
                {card.icon}
              </span>
              <h3 className="mt-1 text-lg font-bold text-gray-900">
                {card.title}
              </h3>
              <p className="text-base text-gray-500">{card.subtitle}</p>
              <a
                href={card.href}
                className="mt-1 text-sm font-medium text-blue-500 hover:underline"
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                {card.link}
              </a>
            </div>
          ))}
        </div>

        {/* Drop us a line */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                Get in Touch
              </p>
              <h2 className="text-3xl mt-2 font-bold ">Drop us a line</h2>
              <p className="mt-2 text-sm text-gray-500">
                We typically respond within 24 hours on business days.
              </p>

              {/* Social icons */}
              <div className="mt-6 flex gap-3">
                {[
                  {
                    icon: <ShareOutlinedIcon fontSize="small" />,
                    label: "Share",
                  },
                  {
                    icon: <AlternateEmailIcon fontSize="small" />,
                    label: "Email",
                  },
                  {
                    icon: <InstagramIcon fontSize="small" />,
                    label: "Instagram",
                  },
                ].map((s) => (
                  <button
                    key={s.label}
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-50 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Building image */}

            {/* Placeholder building image using SVG */}
            <Image
              src={ContactIMG}
              alt="contact"
              className="md:w-[70%] w-full object-cover mt-4 rounded-xl md:h-[300px] h-[200px]  "
            />
          </div>

          {/* Right – Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {(
              [
                {
                  id: "name",
                  label: "FULL NAME",
                  placeholder: "Jane Doe",
                  type: "text",
                },
                {
                  id: "email",
                  label: "EMAIL ADDRESS",
                  placeholder: "john@example.com",
                  type: "email",
                },
                {
                  id: "subject",
                  label: "SUBJECT",
                  placeholder: "Partnership inquiry",
                  type: "text",
                },
              ] as {
                id: keyof typeof form;
                label: string;
                placeholder: string;
                type: string;
              }[]
            ).map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="mb-1 block text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.id]}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-[10px] font-bold tracking-widest text-gray-400 uppercase"
              >
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <button
              type="submit"
              className="flex w-full cursor-pointer outline-none items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <SendIcon fontSize="small" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// Default export – all sections composed
// ─────────────────────────────────────────────
const ContactAndFAQPage: React.FC = () => (
  <main className="min-h-screen font-sans antialiased">
    <HeroSection />
    <ContactSection />
    <FAQSection />
    <CTASection />
  </main>
);

export default ContactAndFAQPage;
