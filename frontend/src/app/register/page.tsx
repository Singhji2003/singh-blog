"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import serverUrl from "../../utils/serverUrl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [shakeFields, setShakeFields] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{
    name: string | null;
    email: string | null;
    password: string | null;
    confirmpassword: string | null;
    agreed: string | null;
  }>({
    name: null,
    email: null,
    password: null,
    confirmpassword: null,
    agreed: null,
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const handleSubmit = async () => {
    if (loading) return; // prevent double click
    let newErrors = {
      name: null as string | null,
      email: null as string | null,
      password: null as string | null,
      confirmpassword: null as string | null,
      agreed: null as string | null,
    };

    if (!data.name.trim() || data.name.length <= 4) {
      newErrors.name = "*Full name should be more than 4 character";
    }

    if (!data.email.trim()) {
      newErrors.email = "*Email is required";
    }

    if (!data.password.trim()) {
      newErrors.password = "*Password is required";
    }

    if (!data.confirmpassword.trim()) {
      newErrors.confirmpassword = "*Confirm your password";
    }

    if (
      data.password &&
      data.confirmpassword &&
      data.password !== data.confirmpassword
    ) {
      newErrors.confirmpassword = "Passwords do not match";
    }
    if (!agreed) {
      newErrors.agreed = "*You must accept Terms & Privacy Policy";
    }

    setErrors(newErrors);

    // collect all invalid fields
    const invalidFields = Object.keys(newErrors).filter(
      (key) => newErrors[key as keyof typeof newErrors],
    );

    if (invalidFields.length > 0) {
      setShakeFields(invalidFields);

      setTimeout(() => {
        setShakeFields([]);
      }, 400);

      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${serverUrl}api/v1/auth-register`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        toast.success(response?.data?.message);
        router.push("/login");
      }
    } catch (err: any) {
      if (err.response) {
        // Server responded with error status (400, 401, 500 etc.)
        toast.dismiss();
        toast.error(err.response.data.message);
      } else if (err.request) {
        // Request sent but no response received
        toast.dismiss();
        toast.error("Server not responding");
      } else {
        // Something else happened
        toast.dismiss();
        toast.error("Something went wrong");
      }

      console.error("Error Detected:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 pb-18 -mb-18 bg-[#f0f0ed] flex items-center justify-center  font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-10">
          {/* Logo */}
          <div className="mb-6">
            <p className="text-xl text-black font-semibold mt-1">
              Create your account to start curating.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-semibold tracking-widest text-gray-500 uppercase mb-1.5">
                Full Name
              </label>
              <input
                name="name"
                onChange={handleChange}
                value={data.name}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6fd4]/30 focus:border-[#1a6fd4] transition"
              />
              <p
                className={`text-[11px] text-red-500 mt-1 transition-all duration-300
  ${errors.name ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
  ${shakeFields.includes("name") ? "animate-shake" : ""}
`}
              >
                {errors.name || "placeholder"}
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-semibold tracking-widest text-gray-500 uppercase mb-1.5">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={data.email}
                placeholder="name@gmail.com"
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6fd4]/30 focus:border-[#1a6fd4] transition"
              />
              <p
                className={`text-[11px] text-red-500 mt-1 transition-all duration-300 ${
                  errors.email
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-1"
                } ${shakeFields.includes("email") ? "animate-shake" : ""}`}
              >
                {errors.email || "placeholder"}
              </p>
            </div>

            {/* Password Row */}
            <div className="flex gap-3">
              {/* Password */}
              <div className="flex-1">
                <label className="block text-[10px] font-semibold tracking-widest text-gray-500 uppercase mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6fd4]/30 focus:border-[#1a6fd4] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                <p
                  className={`text-[11px] text-red-500 mt-1 transition-all duration-300 ${
                    errors.password
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-1"
                  } ${shakeFields.includes("password") ? "animate-shake" : ""}`}
                >
                  {errors.password || "placeholder"}
                </p>
              </div>

              {/* Confirm Password */}
              <div className="flex-1">
                <label className="block text-[10px] font-semibold tracking-widest text-gray-500 uppercase mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    name="confirmpassword"
                    onChange={handleChange}
                    value={data.confirmpassword}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6fd4]/30 focus:border-[#1a6fd4] transition"
                  />
                  <p
                    className={`text-[11px] text-red-500 mt-1 transition-all duration-300 ${
                      errors.confirmpassword
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-1"
                    } ${shakeFields.includes("confirmpassword") ? "animate-shake" : ""}`}
                  >
                    {errors.confirmpassword || "placeholder"}
                  </p>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="pt-1">
              <div
                onClick={() => {
                  setAgreed((prev) => !prev);

                  setErrors((prev) => ({
                    ...prev,
                    agreed: null,
                  }));
                }}
                className={`flex items-center gap-2 cursor-pointer transition
    ${shakeFields.includes("agreed") ? "animate-shake" : ""}
    `}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition
${
  errors.agreed && !agreed
    ? "border-red-500"
    : agreed
      ? "bg-[#1a6fd4] border-[#1a6fd4]"
      : "border-gray-300 bg-white"
}
`}
                >
                  {agreed && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 10 8"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        d="M1 4l3 3 5-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                <p
                  className={`text-xs transition ${
                    errors.agreed ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  I agree to the Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 cursor-pointer rounded-xl text-white font-semibold text-sm transition duration-200 mt-1 flex items-center justify-center gap-2
  ${
    loading
      ? "bg-[#155bb5] cursor-not-allowed"
      : "bg-[#1a6fd4] hover:bg-[#155bb5]"
  }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-xs text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#1a6fd4] font-semibold hover:underline"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Panel - Features */}
        <div className="w-full md:w-1/2 bg-[#f7f7f5] p-8 lg:p-10 flex flex-col justify-center">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight mb-3">
            Elevate your digital reading experience.
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Join a community of thought leaders and curious minds curated for
            quality.
          </p>

          <div className="space-y-5">
            <FeatureItem
              icon={<BookmarkIcon />}
              iconBg="bg-[#1a6fd4]"
              title="Save favorite articles"
              description="Build your personal library of insights to revisit anytime."
            />
            <FeatureItem
              icon={<ChatIcon />}
              iconBg="bg-[#7c5cbf]"
              title="Join the conversation"
              description="Engage with authors and peers in high-signal discussions."
            />
            <FeatureItem
              icon={<FeedIcon />}
              iconBg="bg-[#c49a6c]"
              title="Personalized feed"
              description="Algorithmically refined to match your intellectual interests."
            />
            <FeatureItem
              icon={<StarIcon />}
              iconBg="bg-[#1a6fd4]"
              title="Exclusive insights"
              description="Access member-only long-reads and deep-dive editorials."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  icon,
  iconBg,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`${iconBg} w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

// Icons
function EyeIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.293-3.95M6.938 6.938A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-4.423 5.283M3 3l18 18"
      />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      className="w-4 h-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      className="w-4 h-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function FeedIcon() {
  return (
    <svg
      className="w-4 h-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
