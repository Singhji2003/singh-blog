"use client";

// AddBlog.tsx
// Next.js + Tailwind CSS + TypeScript + MUI Icons
// Install: npm install @mui/icons-material @mui/material @emotion/react @emotion/styled

import React, { useState, useRef, useCallback, useEffect } from "react";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import serverUrl from "@/utils/serverUrl";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface FAQ {
  question: string;
  answer: string;
}

interface BlogForm {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  link: string;
  category: string;
  htmlBody: string;
  image: File | null;
  keywords: string;
  faq: FAQ[];
}

// Serialisable draft (File cannot be stored in localStorage)
interface BlogDraft {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  link: string;
  category: string;
  htmlBody: string;
  keywords: string;
  faq: FAQ[];
  savedAt: string; // ISO timestamp
}

type SubmitStatus = "idle" | "loading" | "success" | "error";
type DraftStatus = "idle" | "saving" | "saved" | "error";

const DRAFT_KEY = "blog_draft";

const CATEGORIES = [
  "Technology",
  "AI",
  "Career",
  "Health",
  "Lifestyle",
  "Education",
  "Finance",
];

const EMPTY_FORM: BlogForm = {
  title: "",
  description: "",
  metaTitle: "",
  metaDescription: "",
  link: "",
  category: "",
  htmlBody: "",
  image: null,
  keywords: "",
  faq: [],
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function formToDraft(form: BlogForm): BlogDraft {
  return {
    title: form.title,
    description: form.description,
    metaTitle: form.metaTitle,
    metaDescription: form.metaDescription,
    link: form.link,
    category: form.category,
    htmlBody: form.htmlBody,
    keywords: form.keywords,
    faq: form.faq,
    savedAt: new Date().toISOString(),
  };
}

function draftToForm(draft: BlogDraft): BlogForm {
  return { ...draft, image: null };
}

function formatRelativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

function isFormEmpty(form: BlogForm): boolean {
  return (
    !form.title &&
    !form.description &&
    !form.htmlBody &&
    !form.keywords &&
    !form.link &&
    !form.category &&
    !form.metaTitle &&
    !form.metaDescription &&
    form.faq.length === 0
  );
}

// ─────────────────────────────────────────────
// Reusable field wrapper
// ─────────────────────────────────────────────
const FieldLabel: React.FC<{ label: string; required?: boolean }> = ({
  label,
  required,
}) => (
  <label className="mb-1.5 block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
    {label} {required && <span className="text-blue-500">*</span>}
  </label>
);

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition";

// ─────────────────────────────────────────────
// Section card wrapper
// ─────────────────────────────────────────────
const SectionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}> = ({ icon, title, subtitle, children }) => (
  <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden">
    <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
        {icon}
      </span>
      <div>
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
    <div className="p-6 space-y-5">{children}</div>
  </div>
);

// ─────────────────────────────────────────────
// Image Upload Zone
// ─────────────────────────────────────────────
const ImageUploadZone: React.FC<{
  value: File | null;
  onChange: (file: File | null) => void;
}> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) onChange(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const preview = value ? URL.createObjectURL(value) : null;

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all ${
        drag
          ? "border-blue-400 bg-blue-50"
          : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/40"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {preview ? (
        <div className="relative h-52 w-full overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4">
            <div className="flex items-center gap-2 text-white">
              <CheckCircleOutlineIcon fontSize="small" />
              <span className="text-xs font-semibold">{value?.name}</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="ml-auto rounded-lg bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition"
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-500">
            <CloudUploadOutlinedIcon />
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              Drag & drop your cover image
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              or{" "}
              <span className="text-blue-500 underline">browse to upload</span>{" "}
              · PNG, JPG, WEBP up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// FAQ Builder
// ─────────────────────────────────────────────
const FAQBuilder: React.FC<{
  faqs: FAQ[];
  onChange: (faqs: FAQ[]) => void;
}> = ({ faqs, onChange }) => {
  const add = () => onChange([...faqs, { question: "", answer: "" }]);
  const remove = (i: number) => onChange(faqs.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof FAQ, val: string) => {
    const next = [...faqs];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3 relative"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
              FAQ #{i + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-gray-400 hover:text-red-400 transition"
              aria-label="Remove FAQ"
            >
              <RemoveCircleOutlineIcon fontSize="small" />
            </button>
          </div>
          <div>
            <FieldLabel label="Question" />
            <input
              type="text"
              className={inputCls}
              placeholder="e.g. What is this blog about?"
              value={faq.question}
              onChange={(e) => update(i, "question", e.target.value)}
            />
          </div>
          <div>
            <FieldLabel label="Answer" />
            <textarea
              rows={3}
              className={`${inputCls} resize-none`}
              placeholder="Write the answer here..."
              value={faq.answer}
              onChange={(e) => update(i, "answer", e.target.value)}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="flex items-center gap-2 rounded-xl border border-dashed border-blue-300 bg-blue-50/60 px-4 py-3 text-sm font-semibold text-blue-500 transition hover:bg-blue-100 w-full justify-center"
      >
        <AddCircleOutlineIcon fontSize="small" />
        Add FAQ Entry
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────
// Toast
// ─────────────────────────────────────────────
const Toast: React.FC<{ status: SubmitStatus; onClose: () => void }> = ({
  status,
  onClose,
}) => {
  if (status === "idle" || status === "loading") return null;
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 shadow-xl text-white text-sm font-semibold transition-all ${
        status === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {status === "success" ? (
        <CheckCircleOutlineIcon fontSize="small" />
      ) : (
        <ErrorOutlineIcon fontSize="small" />
      )}
      <span>
        {status === "success"
          ? "Blog published successfully!"
          : "Failed to publish. Please try again."}
      </span>
      <button
        onClick={onClose}
        className="ml-2 opacity-70 hover:opacity-100 transition"
      >
        ✕
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────
// Draft Restore Banner
// ─────────────────────────────────────────────
const DraftRestoreBanner: React.FC<{
  draft: BlogDraft;
  onRestore: () => void;
  onDiscard: () => void;
}> = ({ draft, onRestore, onDiscard }) => (
  <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-6">
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3.5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <RestoreOutlinedIcon fontSize="small" />
        </span>
        <div>
          <p className="text-sm font-semibold text-amber-800">
            Unsaved draft found{draft.title ? ` — "${draft.title}"` : ""}
          </p>
          <p className="text-xs text-amber-600 flex items-center gap-1 mt-0.5">
            <AccessTimeOutlinedIcon sx={{ fontSize: 12 }} />
            Saved {formatRelativeTime(draft.savedAt)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onRestore}
          className="rounded-lg bg-amber-500 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          Restore
        </button>
        <button
          type="button"
          onClick={onDiscard}
          className="rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-50 focus:outline-none"
        >
          Discard
        </button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// Main AddBlog Page
// ─────────────────────────────────────────────
const AddBlog: React.FC = () => {
  const [form, setForm] = useState<BlogForm>(EMPTY_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [draftStatus, setDraftStatus] = useState<DraftStatus>("idle");
  const [savedDraft, setSavedDraft] = useState<BlogDraft | null>(null);
  const [showRestoreBanner, setShowRestoreBanner] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── On mount: check localStorage for existing draft ──
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft: BlogDraft = JSON.parse(raw);
        setSavedDraft(draft);
        setShowRestoreBanner(true);
      }
    } catch {
      // corrupt data — ignore
    }
  }, []);

  // ── Auto-save to localStorage with 1.5s debounce ──
  useEffect(() => {
    if (isFormEmpty(form)) return;

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);

    autoSaveTimer.current = setTimeout(() => {
      try {
        const draft = formToDraft(form);
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        setLastAutoSave(draft.savedAt);
        setDraftStatus("saved");
        setTimeout(() => setDraftStatus("idle"), 3000);
      } catch {
        setDraftStatus("error");
      }
    }, 1500);

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [form]);

  const set = (field: keyof BlogForm, value: BlogForm[keyof BlogForm]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // ── Restore banner actions ──
  const handleRestore = () => {
    if (savedDraft) {
      setForm(draftToForm(savedDraft));
      setLastAutoSave(savedDraft.savedAt);
    }
    setShowRestoreBanner(false);
  };

  const handleDiscard = () => {
    localStorage.removeItem(DRAFT_KEY);
    setSavedDraft(null);
    setShowRestoreBanner(false);
  };

  // ── Build FormData (shared by draft + publish) ──
  const buildFormData = (blogStatus: "draft" | "published"): FormData => {
    const fd = new FormData();
    fd.append("status", blogStatus);
    (Object.keys(form) as (keyof BlogForm)[]).forEach((key) => {
      if (key === "faq") {
        fd.append("faq", JSON.stringify(form.faq));
      } else if (key === "image" && form.image) {
        fd.append("image", form.image);
      } else if (key !== "image" && form[key] !== null) {
        fd.append(key, form[key] as string);
      }
    });
    return fd;
  };

  // ── Save as Draft (manual) ──
  const handleSaveDraft = async () => {
    setDraftStatus("saving");

    // 1. Always persist to localStorage first (instant, offline-safe)
    const draft = formToDraft(form);
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    setLastAutoSave(draft.savedAt);

    // 2. Also send to API with status: "draft"
    try {
      const res = await fetch(`${serverUrl}api/v1/add-blog`, {
        method: "POST",
        body: buildFormData("draft"),
      });
      if (!res.ok) throw new Error("Draft API error");
      const data = await res.json();
      console.log("Draft saved to API:", data);
    } catch (err) {
      // localStorage succeeded so we still show "saved"
      console.warn("Draft API failed (localStorage backup active):", err);
    }

    setDraftStatus("saved");
    setTimeout(() => setDraftStatus("idle"), 3000);
  };

  // ── Publish ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${serverUrl}api/v1/add-blog`, {
        method: "POST",
        body: buildFormData("published"),
      });
      if (!res.ok) throw new Error("Publish API error");
      const data = await res.json();
      console.log("Published:", data);

      // Clear draft after successful publish
      localStorage.removeItem(DRAFT_KEY);
      setLastAutoSave(null);
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  };

  // ── Header badge ──
  const getBadge = () => {
    if (status === "loading")
      return {
        label: "Publishing…",
        dot: "bg-yellow-400 animate-pulse",
        pill: "bg-yellow-100 text-yellow-600",
      };
    if (status === "success")
      return {
        label: "Published",
        dot: "bg-green-400",
        pill: "bg-green-100 text-green-600",
      };
    if (draftStatus === "saving")
      return {
        label: "Saving draft…",
        dot: "bg-blue-400 animate-pulse",
        pill: "bg-blue-100 text-blue-600",
      };
    if (draftStatus === "saved")
      return {
        label: "Draft saved",
        dot: "bg-blue-400",
        pill: "bg-blue-100 text-blue-600",
      };
    return {
      label: "Draft",
      dot: "bg-gray-300",
      pill: "bg-gray-100 text-gray-500",
    };
  };

  const badge = getBadge();

  return (
    <main className="min-h-screen bg-[#f5f5f0] font-sans antialiased">
      {/* ── Sticky Header ── */}
      <div className="border-b border-gray-200 bg-white px-6 py-5 shadow-sm sticky top-0 z-30">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <ArticleOutlinedIcon fontSize="small" />
            </span>
            <div>
              <h1 className="text-lg font-extrabold text-gray-900">
                Publish New Blog
              </h1>
              <p className="text-xs text-gray-400">
                Fill in the details below to publish your article
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {lastAutoSave && (
              <span className="hidden md:flex items-center gap-1 text-[11px] text-gray-400">
                <AccessTimeOutlinedIcon sx={{ fontSize: 13 }} />
                Auto-saved {formatRelativeTime(lastAutoSave)}
              </span>
            )}
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${badge.pill}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
              {badge.label}
            </span>
          </div>
        </div>
      </div>

      {/* ── Draft Restore Banner ── */}
      {showRestoreBanner && savedDraft && (
        <DraftRestoreBanner
          draft={savedDraft}
          onRestore={handleRestore}
          onDiscard={handleDiscard}
        />
      )}

      {/* ── Form Body ── */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl px-4 py-10 sm:px-6"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {/* ── Left column (2/3) ── */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Info */}
            <SectionCard
              icon={<TitleOutlinedIcon fontSize="small" />}
              title="Basic Information"
              subtitle="Core content details for your blog post"
            >
              <div>
                <FieldLabel label="Blog Title" required />
                <input
                  type="text"
                  className={inputCls}
                  placeholder="e.g. The Future of AI in 2025"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  required
                />
              </div>

              <div>
                <FieldLabel label="Description" required />
                <textarea
                  rows={3}
                  className={`${inputCls} resize-none`}
                  placeholder="Brief summary of what this blog covers..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel label="Permalink / Link" />
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                      <LinkOutlinedIcon fontSize="small" />
                    </span>
                    <input
                      type="text"
                      className={`${inputCls} pl-9`}
                      placeholder="the-future-of-ai"
                      value={form.link}
                      onChange={(e) => set("link", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel label="Category" required />
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                      <CategoryOutlinedIcon fontSize="small" />
                    </span>
                    <select
                      className={`${inputCls} pl-9 cursor-pointer`}
                      value={form.category}
                      onChange={(e) => set("category", e.target.value)}
                      required
                    >
                      <option value="">Select category…</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <FieldLabel label="Keywords" />
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <LabelOutlinedIcon fontSize="small" />
                  </span>
                  <input
                    type="text"
                    className={`${inputCls} pl-9`}
                    placeholder="ai, machine learning, future (comma-separated)"
                    value={form.keywords}
                    onChange={(e) => set("keywords", e.target.value)}
                  />
                </div>
                <p className="mt-1.5 text-xs text-gray-400">
                  Separate keywords with commas for better SEO indexing.
                </p>
              </div>
            </SectionCard>

            {/* HTML Body */}
            <SectionCard
              icon={<CodeOutlinedIcon fontSize="small" />}
              title="Blog Body (HTML)"
              subtitle="Paste or write your full blog content as HTML"
            >
              <div>
                <FieldLabel label="HTML Body" />
                <textarea
                  rows={12}
                  className={`${inputCls} resize-y font-mono text-xs`}
                  placeholder={
                    "<h2>Introduction</h2>\n<p>Your blog content goes here...</p>"
                  }
                  value={form.htmlBody}
                  onChange={(e) => set("htmlBody", e.target.value)}
                />
              </div>
            </SectionCard>

            {/* FAQ */}
            <SectionCard
              icon={<QuizOutlinedIcon fontSize="small" />}
              title="FAQ Section"
              subtitle="Add frequently asked questions for this blog"
            >
              <FAQBuilder
                faqs={form.faq}
                onChange={(faqs) => set("faq", faqs)}
              />
            </SectionCard>
          </div>

          {/* ── Right column (1/3) ── */}
          <div className="space-y-6">
            {/* Cover Image */}
            <SectionCard
              icon={<ImageOutlinedIcon fontSize="small" />}
              title="Cover Image"
              subtitle="Upload a high-quality cover photo"
            >
              <ImageUploadZone
                value={form.image}
                onChange={(file) => set("image", file)}
              />
            </SectionCard>

            {/* SEO */}
            <SectionCard
              icon={<SearchOutlinedIcon fontSize="small" />}
              title="SEO Settings"
              subtitle="Optimise for search engine visibility"
            >
              <div>
                <FieldLabel label="Meta Title" />
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <TitleOutlinedIcon fontSize="small" />
                  </span>
                  <input
                    type="text"
                    className={`${inputCls} pl-9`}
                    placeholder="SEO page title"
                    value={form.metaTitle}
                    onChange={(e) => set("metaTitle", e.target.value)}
                    maxLength={60}
                  />
                </div>
                <p className="mt-1 text-right text-[10px] text-gray-400">
                  {form.metaTitle.length}/60
                </p>
              </div>

              <div>
                <FieldLabel label="Meta Description" />
                <div className="relative">
                  <span className="pointer-events-none absolute top-3 left-3 text-gray-400">
                    <DescriptionOutlinedIcon fontSize="small" />
                  </span>
                  <textarea
                    rows={4}
                    className={`${inputCls} pl-9 resize-none`}
                    placeholder="Short description for search engines (155 chars)"
                    value={form.metaDescription}
                    onChange={(e) => set("metaDescription", e.target.value)}
                    maxLength={155}
                  />
                </div>
                <p className="mt-1 text-right text-[10px] text-gray-400">
                  {form.metaDescription.length}/155
                </p>
              </div>

              {/* Live Google Preview */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Google Preview
                </p>
                <p className="text-sm font-semibold text-blue-600 truncate">
                  {form.metaTitle || "Your page title will appear here"}
                </p>
                <p className="mt-0.5 text-xs text-green-700 truncate">
                  thecurator.com/{form.link || "blog-slug"}
                </p>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                  {form.metaDescription ||
                    "Your meta description will appear here. Make it compelling to improve click-through rates."}
                </p>
              </div>
            </SectionCard>

            {/* Actions */}
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 p-6 space-y-3">
              {/* Publish */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Publishing…
                  </>
                ) : (
                  <>
                    <ArticleOutlinedIcon fontSize="small" />
                    Publish Blog
                  </>
                )}
              </button>

              {/* Save as Draft */}
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={draftStatus === "saving" || isFormEmpty(form)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {draftStatus === "saving" ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Saving…
                  </>
                ) : draftStatus === "saved" ? (
                  <>
                    <CheckCircleOutlineIcon
                      fontSize="small"
                      className="text-green-500"
                    />
                    <span className="text-green-600">Draft Saved!</span>
                  </>
                ) : (
                  <>
                    <SaveOutlinedIcon fontSize="small" />
                    Save as Draft
                  </>
                )}
              </button>

              {/* Auto-save timestamp */}
              {lastAutoSave && draftStatus === "idle" && (
                <p className="flex items-center justify-center gap-1 text-[11px] text-gray-400">
                  <AccessTimeOutlinedIcon sx={{ fontSize: 12 }} />
                  Auto-saved {formatRelativeTime(lastAutoSave)}
                </p>
              )}

              <p className="text-center text-xs text-gray-400">
                All fields marked{" "}
                <span className="text-blue-500 font-semibold">*</span> are
                required before publishing.
              </p>
            </div>
          </div>
        </div>
      </form>

      {/* Toast */}
      <Toast status={status} onClose={() => setStatus("idle")} />
    </main>
  );
};

export default AddBlog;
