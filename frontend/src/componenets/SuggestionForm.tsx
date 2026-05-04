"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { SuggestionFormData, ApiResponse } from "../types/suggestion";
import ThankYou from "./ThankYou";
import serverUrl from "@/utils/serverUrl";
const initialForm: SuggestionFormData = {
  name: "",
  email: "",
  category: "",
  message: "",
};

export default function SuggestionForm() {
  const [form, setForm] = useState<SuggestionFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange: any = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${serverUrl}api/v1/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: ApiResponse = await res.json();
      console.log(data);
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err + "Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-[540px] mx-auto">
      {submitted ? (
        <ThankYou onSubmitAnother={handleReset} />
      ) : (
        <form onSubmit={handleSubmit} className="px-8 py-8 sm:px-10">
          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Email Address */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Category Name */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g., Technology, Health, Finance"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Message */}
          <div className="mb-7">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Describe what topic you want us to cover"
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-500 mb-4 -mt-3">{error}</p>}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
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
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Submitting…
                </span>
              ) : (
                "Submit Suggestion"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
