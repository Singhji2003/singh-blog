"use client";
import serverUrl from "@/utils/serverUrl";
import axios from "axios";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import BlogChatBot from "@/componenets/Blogchatbot";

/* ─── Types ─────────────────────────────────────────────── */
interface FAQ {
  question: string;
  answer: string;
}

interface Comment {
  name: string;
  comment: string;
  createdAt: ReactNode;
  id: string;
}
interface BlogData {
  _id: string;
  title: string;
  metaDescription: string;
  metaTitle: string;
  category: string;
  image: string;
  htmlBody: string;
  faq: FAQ[];
  saved: boolean;
  likes: string[];
  comments: Comment[];
}

/* ─── Helpers ────────────────────────────────────────────── */
const userId = () => Cookies.get("Id") ?? "";

/* ─── Main Component ─────────────────────────────────────── */
export default function BlogPage() {
  const params = useParams();
  const link = params?.link as string;

  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingLoading, setSavingLoading] = useState(false);
  const [liking, setLiking] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [saved, setSaved] = useState(false);

  /* ── Fetch ── */
  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}api/v1/blog/${link}?id=${userId()}`,
      );
      const blog: BlogData = data?.data;

      setBlogData(blog);
      setComments(blog.comments || []); // ✅ ADD THIS

      setLikeCount(blog.likes?.length ?? 0);
      setLiked(blog.likes?.includes(userId()) ?? false);
      setSaved(blog.saved ?? false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (link) fetchBlog();
  }, [link]);

  /* ── Save ── */
  const handleSave = async () => {
    if (!userId()) return toast.error("Please login first to save the blog");
    setSavingLoading(true);
    // Optimistic update
    const nextSaved = !saved;
    setSaved(nextSaved);
    try {
      await axios.post(`${serverUrl}api/v1/save-blog`, {
        id: userId(),
        blogId: blogData?._id,
      });
    } catch {
      setSaved(!nextSaved); // rollback
    } finally {
      setSavingLoading(false);
    }
  };

  /* ── Like ── */
  const handleLike = async () => {
    if (!userId()) return toast.error("Please login first to like the blog");
    if (liking) return;
    setLiking(true);
    // Optimistic update
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikeCount((c) => c + (nextLiked ? 1 : -1));
    try {
      await axios.post(`${serverUrl}api/v1/like-blog`, {
        id: userId(),
        blogId: blogData?._id,
      });
    } catch {
      setLiked(!nextLiked); // rollback
      setLikeCount((c) => c + (nextLiked ? -1 : 1));
    } finally {
      setLiking(false);
    }
  };

  /* ── Comment ── */
  const handleCommentSubmit = async () => {
    if (!commentName.trim() || !commentText.trim()) return;
    if (Cookies.get("Id")) {
    }
    setSubmitting(true);

    const newComment = {
      id: Date.now().toString(), // temp id
      name: commentName,
      comment: commentText,
      createdAt: new Date().toLocaleString(),
    };

    try {
      // ✅ Optimistic UI update
      setComments((prev) => [newComment, ...prev]);

      await axios.post(`${serverUrl}api/v1/post-comment`, {
        name: commentName,
        comment: commentText,
        id: Cookies.get("Id"),
        blogId: blogData?._id,
      });

      setCommentName("");
      setComment("");
    } catch (err) {
      // rollback if needed
      setComments((prev) => prev.filter((c) => c.id !== newComment.id));
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Render ── */
  if (loading) return <BlogSkeleton />;
  if (!blogData) return null;

  const displayTitle = blogData.metaTitle || blogData.title;
  const displayDesc = blogData.metaDescription || blogData.title;

  return (
    <>
      {/* SEO */}
      <Head>
        <title>{displayTitle}</title>
        <meta name="description" content={displayDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={displayTitle} />
        <meta property="og:description" content={displayDesc} />
        {blogData.image && (
          <meta property="og:image" content={blogData.image} />
        )}
        <meta property="og:url" content={`${serverUrl}blog/${link}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={displayTitle} />
        <meta name="twitter:description" content={displayDesc} />
        {blogData.image && (
          <meta name="twitter:image" content={blogData.image} />
        )}
        <link rel="canonical" href={`${serverUrl}blog/${link}`} />
      </Head>

      <article className="w-[90%] md:w-[70%] lg:w-[58%] flex flex-col mx-auto px-4 md:px-6 py-12">
        {/* Category */}
        <span className="flex w-max mx-auto items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
          ✦ {blogData.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-gray-950 mb-6 text-center">
          {blogData.title}
        </h1>

        {/* Action bar */}
        <div className="flex items-center justify-center gap-3 mb-8 pb-6 border-b border-gray-100">
          {/* Like button */}
          <button
            onClick={handleLike}
            disabled={liking}
            title={liked ? "Unlike" : "Like"}
            className={`group relative cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 select-none
              ${
                liked
                  ? "bg-rose-500 text-white shadow-sm shadow-rose-200"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50"
              }`}
          >
            {liking ? (
              <Spinner
                cls={
                  liked
                    ? "border-white/40 border-t-white"
                    : "border-rose-200 border-t-rose-500"
                }
              />
            ) : (
              <svg
                className={`w-4 h-4 transition-transform duration-150 ${!liked ? "group-hover:scale-110" : ""}`}
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
            <span
              className={`text-xs font-semibold tabular-nums ${liked ? "text-white" : ""}`}
            >
              {likeCount}
            </span>
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-200" />

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={savingLoading}
            title={saved ? "Unsave" : "Save for later"}
            className={`group flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 select-none
              ${
                saved
                  ? "bg-indigo-50 text-indigo-600 border-indigo-200 shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50"
              }`}
          >
            {savingLoading ? (
              <Spinner
                cls={
                  saved
                    ? "border-indigo-200 border-t-indigo-500"
                    : "border-gray-300 border-t-gray-600"
                }
              />
            ) : (
              <svg
                className={`w-4 h-4 transition-transform duration-150 ${!saved ? "group-hover:scale-110" : ""}`}
                fill={saved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            )}
            <span className="text-xs font-semibold">
              {savingLoading ? "Saving…" : saved ? "Saved" : "Save"}
            </span>
          </button>
        </div>

        {/* Hero Image */}
        {blogData.image && (
          <img
            src={blogData.image}
            alt={displayTitle}
            className="w-full aspect-video object-cover rounded-xl mb-10"
          />
        )}

        {/* Body */}
        <div
          className="blog-content w-full"
          dangerouslySetInnerHTML={{ __html: blogData.htmlBody }}
        />

        {/* Bottom Like CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 py-10 border-y border-gray-100">
          <p className="text-sm text-gray-400 tracking-wide uppercase font-medium text-xs">
            Was this helpful?
          </p>
          <button
            onClick={handleLike}
            disabled={liking}
            className={`group flex items-center gap-2.5 px-7 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm
              ${
                liked
                  ? "bg-rose-500 text-white shadow-rose-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50 hover:shadow-rose-100"
              }`}
          >
            {liking ? (
              <Spinner
                cls={
                  liked
                    ? "border-white/40 border-t-white"
                    : "border-rose-200 border-t-rose-500"
                }
              />
            ) : (
              <svg
                className={`w-5 h-5 transition-transform duration-150 ${!liked ? "group-hover:scale-110" : "animate-[heartbeat_0.3s_ease-out]"}`}
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
            {liked
              ? `Liked · ${likeCount}`
              : `Like this article · ${likeCount}`}
          </button>
        </div>

        {/* FAQ */}
        {blogData.faq?.length > 0 && (
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
                    <ChevronIcon open={openFaq === idx} />
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

        {/* Comments */}
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
                placeholder="Write your thoughts…"
                value={commentText}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition resize-none"
              />
              <button
                onClick={handleCommentSubmit}
                disabled={
                  submitting || !commentName.trim() || !commentText.trim()
                }
                className="self-end cursor-pointer flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {submitting && <Spinner cls="border-white/40 border-t-white" />}
                {submitting ? "Posting…" : "Post comment"}
              </button>
            </div>
          </div>

          {/* List */}
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
                      <span className="text-gray-400 text-xs">
                        {c.createdAt}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {c.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </article>
      <BlogChatBot blogId={blogData._id} blogTitle={blogData.title} />
    </>
  );
}

/* ─── Tiny reusable components ───────────────────────────── */

function Spinner({ cls }: { cls: string }) {
  return (
    <span className={`w-4 h-4 border-2 rounded-full animate-spin ${cls}`} />
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* ─── Skeleton (matches actual layout to prevent flicker) ── */
function BlogSkeleton() {
  return (
    <div className="w-[90%] md:w-[70%] lg:w-[58%] mx-auto px-4 md:px-6 py-12 animate-pulse">
      {/* Category pill */}
      <div className="h-5 w-24 bg-gray-200 rounded-full mb-5 mx-auto" />
      {/* Title */}
      <div className="h-9 bg-gray-200 rounded mb-3 w-4/5 mx-auto" />
      <div className="h-9 bg-gray-200 rounded mb-6 w-3/5 mx-auto" />
      {/* Action bar — right-aligned, no author */}
      <div className="flex justify-end gap-2 mb-8 pb-6 border-b border-gray-100">
        <div className="h-9 w-16 bg-gray-200 rounded-full" />
        <div className="h-9 w-20 bg-gray-200 rounded-full" />
      </div>
      {/* Hero image */}
      <div className="w-full aspect-video bg-gray-200 rounded-xl mb-10" />
      {/* Body lines */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-200 rounded mb-3 ${i % 4 === 3 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
}
