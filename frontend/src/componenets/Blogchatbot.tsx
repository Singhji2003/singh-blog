"use client";
import serverUrl from "@/utils/serverUrl";
import { useEffect, useRef, useState, useCallback } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StopCircleIcon from "@mui/icons-material/StopCircle";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface BlogChatBotProps {
  blogId: string;
  blogTitle?: string;
}

export default function BlogChatBot({ blogId, blogTitle }: BlogChatBotProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [appeared, setAppeared] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  /* Greeting on first open */
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Welcome to Singh Blog!\nI'm your AI reading companion. Ask me anything about ${blogTitle ?? "this article"}.`,
        },
      ]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const t = setTimeout(() => setAppeared(true), 800);
    return () => clearTimeout(t);
  }, []);

  /* Stop any ongoing speech when chat closes */
  useEffect(() => {
    if (!open) {
      window.speechSynthesis?.cancel();
      setSpeakingIndex(null);
      stopRecording();
    }
  }, [open]);

  /* ── Speech-to-Text ── */
  const startRecording = useCallback(() => {
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionAPI() as any;
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognition.start();
    recognitionRef.current = recognition;
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsRecording(false);
  }, []);

  const toggleMic = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const speakMessage = useCallback(
    (text: string, index: number) => {
      window.speechSynthesis.cancel();

      if (speakingIndex === index) {
        setSpeakingIndex(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);

      // 👇 Prefer Indian English
      utterance.lang = "en-IN";
      utterance.rate = 1;

      const voices = window.speechSynthesis.getVoices();

      // 👇 Try to find Indian voice first
      const indianVoice =
        voices.find((voice) => voice.lang === "en-IN") ||
        voices.find((voice) => voice.name.toLowerCase().includes("india")) ||
        voices.find(
          (voice) => voice.name.toLowerCase().includes("heera"), // common Indian voice (Chrome)
        ) ||
        voices.find((voice) => voice.name.toLowerCase().includes("female"));

      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onstart = () => setSpeakingIndex(index);
      utterance.onend = () => setSpeakingIndex(null);
      utterance.onerror = () => setSpeakingIndex(null);

      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [speakingIndex],
  );
  /* ── Send ── */
  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${serverUrl}api/v1/know-about-blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId,
          blogTitle: blogTitle ?? "",
          userMessage: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const reply =
        data?.data?.msg ??
        "Sorry, I couldn't generate a response. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Something went wrong. Please try again. 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat popup */}
      <div
        className={`
          transition-all duration-300 ease-out origin-bottom-right
          ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}
          w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100
          flex flex-col overflow-hidden
        `}
        style={{ maxHeight: "520px", minHeight: "460px" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 leading-none mb-0.5">
              AI Assistant
            </p>
            <p className="text-xs text-gray-400 truncate">
              Ask about this article
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-400">Online</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 flex items-center cursor-pointer justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors ml-1"
          >
            <ClearIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 12c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
                  </svg>
                </div>
              )}

              {msg.role === "assistant" ? (
                /* AI message + action buttons */
                <div className="flex flex-col gap-1 max-w-[78%]">
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed whitespace-pre-wrap bg-white text-gray-700 border border-gray-100 shadow-sm">
                    {msg.content}
                  </div>
                  {/* Action row */}
                  <div className="flex items-center gap-1 pl-1">
                    {/* Speaker button */}
                    <button
                      onClick={() => speakMessage(msg.content, i)}
                      title={
                        speakingIndex === i ? "Stop speaking" : "Read aloud"
                      }
                      className={`w-6 h-6 flex cursor-pointer items-center justify-center rounded-md text-gray-400 border transition-colors
                        ${
                          speakingIndex === i
                            ? "border-blue-200 bg-blue-50 text-blue-500"
                            : "border-gray-200 hover:border-gray-300 hover:text-gray-600 bg-white"
                        }`}
                    >
                      {speakingIndex === i ? (
                        <StopCircleIcon style={{ fontSize: 14 }} />
                      ) : (
                        <VolumeUpIcon style={{ fontSize: 14 }} />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-w-[78%] px-3.5 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed whitespace-pre-wrap bg-blue-600 text-white">
                  {msg.content}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 12c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
                </svg>
              </div>
              <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 bg-white border-t border-gray-100">
          <div className="flex items-end gap-2 bg-gray-50 rounded-xl border border-gray-200 px-3 py-2 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-50 transition-all">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 96) + "px";
              }}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? "Listening…" : "Ask a question…"}
              disabled={loading}
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 resize-none outline-none leading-relaxed min-h-[24px] max-h-[96px] disabled:opacity-50"
              style={{ height: "24px" }}
            />

            {/* Mic button */}
            <button
              onClick={toggleMic}
              title={isRecording ? "Stop recording" : "Speak your question"}
              className={`w-8 h-8 flex items-center cursor-pointer justify-center rounded-lg transition-all active:scale-95 flex-shrink-0
                ${
                  isRecording
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
                }`}
            >
              {isRecording ? (
                <StopIcon style={{ fontSize: 16 }} />
              ) : (
                <MicIcon style={{ fontSize: 16 }} />
              )}
            </button>

            {/* Send button */}
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0"
            >
              {loading ? (
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FAB button — unchanged */}
      <div className="relative">
        {!open && appeared && (
          <div
            className={`absolute bottom-full right-0 mb-3 whitespace-nowrap bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg pointer-events-none transition-all duration-500 delay-300 ${appeared ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
          >
            🤖 AI is here to help
            <span className="absolute top-full right-4 border-4 border-transparent border-t-gray-900" />
          </div>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          title="Chat with AI"
          className={`relative w-14 h-14 cursor-pointer rounded-full shadow-lg flex items-center justify-center transition-all duration-300 active:scale-95 ${open ? "bg-gray-700 hover:bg-gray-800" : "bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-blue-200 hover:shadow-xl"}`}
        >
          {!open && (
            <span className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-ping" />
          )}
          <span
            className={`absolute transition-all duration-200 ${open ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
          <span
            className={`absolute transition-all duration-200 ${open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
