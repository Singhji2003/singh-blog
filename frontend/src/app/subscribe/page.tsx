"use client";

import { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const INTERESTS = ["Tech", "Health", "Finance", "AI", "Lifestyle"];

const COUNTRY_CODES = [
  { code: "+1", label: "US" },
  { code: "+44", label: "UK" },
  { code: "+91", label: "IN" },
  { code: "+61", label: "AU" },
  { code: "+49", label: "DE" },
  { code: "+33", label: "FR" },
  { code: "+81", label: "JP" },
];

type FormData = {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  interests: string[];
  subscriptionType: "free" | "premium";
  frequency: string;
  agreed: boolean;
};

type Status = "idle" | "loading" | "success" | "error";

export default function SubscribeForm() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    countryCode: "+1",
    phone: "",
    interests: [],
    subscriptionType: "free",
    frequency: "Weekly Roundup",
    agreed: false,
  });

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async () => {
    if (!form.fullName.trim()) return setErrorMsg("Full name is required.");
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      return setErrorMsg("A valid email is required.");
    if (!form.agreed)
      return setErrorMsg(
        "Please accept the Privacy Policy and Terms of Service.",
      );
    setErrorMsg("");
    setStatus("loading");

    try {
      const payload = {
        full_name: form.fullName,
        email: form.email,
        phone: form.phone ? `${form.countryCode}${form.phone}` : null,
        interests: form.interests,
        subscription_type: form.subscriptionType,
        frequency_preference: form.frequency,
      };

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Subscription failed.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">
          <CheckCircleOutlineIcon
            className="text-blue-600 mb-4"
            style={{ fontSize: 56 }}
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            You&apos;re subscribed!
          </h2>
          <p className="text-gray-500 text-sm">
            Welcome to{" "}
            <span className="font-semibold text-blue-600">Singh Blog</span>.
            Check your inbox for a confirmation email.
          </p>
          <button
            onClick={() => {
              setStatus("idle");
              setForm({
                fullName: "",
                email: "",
                countryCode: "+1",
                phone: "",
                interests: [],
                subscriptionType: "free",
                frequency: "Weekly Roundup",
                agreed: false,
              });
            }}
            className="mt-6 text-sm text-blue-600 underline hover:text-blue-800 transition"
          >
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="text-center mb-6 max-w-lg">
        <h1 className="text-3xl font-extrabold text-blue-700 leading-tight">
          Stay Updated with Singh Blog
        </h1>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">
          Get the latest articles, insights, and exclusive content delivered
          straight to your inbox. Join a community of thought leaders.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg">
        {/* Row 1: Full Name + Email */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Row 2: Phone */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Phone Number{" "}
            <span className="normal-case font-normal">(Optional)</span>
          </label>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={form.countryCode}
                onChange={(e) =>
                  setForm({ ...form, countryCode: e.target.value })
                }
                className="appearance-none border border-gray-300 rounded-lg pl-3 pr-7 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white cursor-pointer"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
              <ArrowDropDownIcon
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                fontSize="small"
              />
            </div>
            <input
              type="tel"
              placeholder="123 456 7890"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Row 3: Interests */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((interest) => {
              const active = form.interests.includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 4: Subscription Type + Frequency */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Subscription Type
            </label>
            <div className="space-y-2">
              {(["free", "premium"] as const).map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <div
                    onClick={() => setForm({ ...form, subscriptionType: type })}
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
                      form.subscriptionType === type
                        ? "border-blue-600"
                        : "border-gray-400"
                    }`}
                  >
                    {form.subscriptionType === type && (
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <span className="text-sm text-gray-700">
                    {type === "free" ? "Free Newsletter" : "Premium Content"}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Frequency Preference
            </label>
            <div className="relative">
              <select
                value={form.frequency}
                onChange={(e) =>
                  setForm({ ...form, frequency: e.target.value })
                }
                className="appearance-none w-full border border-gray-300 rounded-lg px-3 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white cursor-pointer"
              >
                <option>Daily Digest</option>
                <option>Weekly Roundup</option>
                <option>Bi-Weekly</option>
                <option>Monthly</option>
              </select>
              <ExpandMoreIcon
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                fontSize="small"
              />
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 mb-5">
          <input
            id="agree"
            type="checkbox"
            checked={form.agreed}
            onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
            className="mt-0.5 w-4 h-4 border-gray-300 rounded accent-blue-600 cursor-pointer"
          />
          <label
            htmlFor="agree"
            className="text-xs text-gray-500 leading-relaxed cursor-pointer"
          >
            I agree to receive emails and accept the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>
            .
          </label>
        </div>

        {/* Error */}
        {(status === "error" || errorMsg) && (
          <div className="flex items-center gap-2 text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            <ErrorOutlineIcon fontSize="small" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl text-sm tracking-wide transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe Now"}
        </button>
      </div>
    </div>
  );
}
