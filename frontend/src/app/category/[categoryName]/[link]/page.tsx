"use client";
import serverUrl from "@/utils/serverUrl";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";

interface FAQ {
  question: string;
  answer: string;
}

interface Comment {
  id: string;
  name: string;
  text: string;
  date: string;
}

interface BlogData {
  title: string;
  metaDescription: string;
  metaTitle: string;
  category: string;
  image: string;
  htmlBody: string;
  faq: FAQ[];
}

export default function BlogPage() {
  const params = useParams();
  const link = params?.link as string;
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [savingLoading, setSavingLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liking, setLiking] = useState(false);

  const getBlogData = async () => {
    try {
      const response = await axios.get(`${serverUrl}api/v1/blog/${link}`);
      const data = response?.data?.data;
      setBlogData(data);
      setLikeCount(data?.likes ?? 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (link) getBlogData();
  }, [link]);

  const handleSave = async () => {
    setSavingLoading(true);
    try {
      await axios.post(`${serverUrl}api/v1/blog/save`, { link });
      setSaved(true);
    } catch {
    } finally {
      setSavingLoading(false);
    }
  };

  const handleLike = async () => {
    if (liked || liking) return;
    setLiking(true);
    try {
      await axios.post(`${serverUrl}api/v1/blog/${link}/like`);
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    } catch {
    } finally {
      setLiking(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentName.trim() || !commentText.trim()) return;
    setSubmitting(true);
    try {
      await axios.post(`${serverUrl}api/v1/blog/${link}/comments`, {
        name: commentName,
        text: commentText,
      });
      setComments((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: commentName,
          text: commentText,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        },
      ]);
      setCommentName("");
      setCommentText("");
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <BlogSkeleton />;
  if (!blogData) return null;

  return (
    <>
      {/* ── SEO Meta Tags ── */}
      <Head>
        {/* Primary */}
        <title>{blogData.metaTitle || blogData.title}</title>
        <meta
          name="description"
          content={blogData.metaDescription || blogData.title}
        />

        {/* Open Graph (Facebook / LinkedIn / WhatsApp previews) */}
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={blogData.metaTitle || blogData.title}
        />
        <meta
          property="og:description"
          content={blogData.metaDescription || blogData.title}
        />
        {blogData.image && (
          <meta property="og:image" content={blogData.image} />
        )}
        <meta property="og:url" content={`${serverUrl}blog/${link}`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={blogData.metaTitle || blogData.title}
        />
        <meta
          name="twitter:description"
          content={blogData.metaDescription || blogData.title}
        />
        {blogData.image && (
          <meta name="twitter:image" content={blogData.image} />
        )}

        {/* Canonical */}
        <link rel="canonical" href={`${serverUrl}blog/${link}`} />
      </Head>

      <article className="w-[90%] md:w-[70%] lg:w-[60%] flex flex-col mx-auto px-4 md:px-6 py-12">
        {/* Category */}
        <span className="flex w-max mx-auto items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
          ✦ {blogData.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-gray-950 mb-5 text-center">
          {blogData.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
              AU
            </div>
            <span className="font-medium text-gray-700">Author Name</span>
            <span className="text-gray-300">·</span>
            <span>12 min read</span>
          </div>

          {/* Like + Save */}
          <div className="flex items-center gap-2">
            {/* Like button */}
            <button
              onClick={handleLike}
              disabled={liked || liking}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-all duration-200
                ${
                  liked
                    ? "bg-rose-50 text-rose-500 border-rose-200 cursor-default"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 cursor-pointer"
                }`}
            >
              {liking ? (
                <span className="w-4 h-4 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-4 h-4"
                  fill={liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
              <span>{likeCount}</span>
            </button>

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={saved || savingLoading}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium border transition-all duration-200
                ${
                  saved
                    ? "bg-green-50 text-green-600 border-green-200 cursor-default"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
                }`}
            >
              {savingLoading ? (
                <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              ) : saved ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              )}
              {savingLoading ? "Saving..." : saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Hero Image */}
        {blogData.image && (
          <img
            src={blogData.image}
            alt={blogData.metaTitle || blogData.title}
            className="w-full aspect-video object-cover rounded-xl mb-10"
          />
        )}

        {/* HTML Body */}
        <div
          className="blog-content w-full"
          dangerouslySetInnerHTML={{ __html: blogData.htmlBody }}
        />

        {/* ── Like CTA (bottom of article) ── */}
        <div className="mt-12 flex flex-col items-center gap-3 py-8 border-y border-gray-100">
          <p className="text-sm text-gray-500">Did you enjoy this article?</p>
          <button
            onClick={handleLike}
            disabled={liked || liking}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border-2 transition-all duration-300
              ${
                liked
                  ? "bg-rose-500 text-white border-rose-500 cursor-default scale-105"
                  : "bg-white text-gray-600 border-gray-200 hover:border-rose-400 hover:text-rose-500 hover:scale-105 cursor-pointer"
              }`}
          >
            {liking ? (
              <span className="w-4 h-4 border-2 border-rose-200 border-t-white rounded-full animate-spin" />
            ) : (
              <svg
                className="w-5 h-5"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
            {liked ? `Liked · ${likeCount}` : `Like this · ${likeCount}`}
          </button>
        </div>

        {/* ── FAQ Section ── */}
        {blogData.faq && blogData.faq.length > 0 && (
          <section className="mt-14 w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-3">
              {blogData.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-gray-100 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800 text-sm md:text-base">
                      {item.question}
                    </span>
                    <svg
                      className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                        openFaq === idx ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-1 bg-white text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Comments Section ── */}
        <section className="mt-14 w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments{comments.length > 0 && ` (${comments.length})`}
          </h2>

          {/* Form */}
          <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-4">
              Leave a comment
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
              />
              <textarea
                rows={4}
                placeholder="Write your thoughts..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition resize-none"
              />
              <button
                onClick={handleCommentSubmit}
                disabled={
                  submitting || !commentName.trim() || !commentText.trim()
                }
                className="self-end flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {submitting && (
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {submitting ? "Posting..." : "Post comment"}
              </button>
            </div>
          </div>

          {/* Comment list */}
          {comments.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-800 text-sm">
                        {c.name}
                      </span>
                      <span className="text-gray-300 text-xs">·</span>
                      <span className="text-gray-400 text-xs">{c.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </article>
    </>
  );
}

function BlogSkeleton() {
  return (
    <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto px-4 md:px-6 py-12 animate-pulse">
      <div className="h-5 w-24 bg-gray-200 rounded-full mb-5 mx-auto" />
      <div className="h-10 bg-gray-200 rounded mb-3 w-4/5 mx-auto" />
      <div className="h-10 bg-gray-200 rounded mb-8 w-3/5 mx-auto" />
      <div className="flex justify-between mb-6 pb-6 border-b border-gray-100">
        <div className="flex gap-3 items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-gray-200 rounded-full" />
          <div className="h-8 w-16 bg-gray-200 rounded-full" />
        </div>
      </div>
      <div className="h-64 bg-gray-200 rounded-xl mb-10" />
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded mb-3" />
      ))}
    </div>
  );
}
