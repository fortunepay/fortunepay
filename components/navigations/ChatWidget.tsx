"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Message = {
    id: string;
    role: "user" | "bot";
    text: string;
};

const INITIAL_MESSAGE: Message = {
    id: "greeting",
    role: "bot",
    text: "Hi, I'm the FP Bunny. Ask me about payments, rewards, or your account.",
};

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
            />
        </svg>
    );
}

function SendIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path
                d="M4 12l16-7-6.5 16-2.5-6.5L4 12Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isTyping]);

    function handleSend() {
        const trimmed = input.trim();
        if (!trimmed) return;

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            text: trimmed,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Placeholder response — wire this up to your real chat endpoint.
        window.setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    role: "bot",
                    text: "Thanks for reaching out. A support specialist will follow up shortly, or you can email support@fortunepay.com.",
                },
            ]);
            setIsTyping(false);
        }, 900);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {open && (
                <div className="flex h-[480px] w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:w-96">
                    {/* Header */}
                    {/* Header */}
                    <div className="flex items-center justify-between bg-blue-500 px-4 py-3">
                        <div className="flex items-center gap-3">
                            {/* Profile Image */}
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white/30 bg-white">
                                <Image
                                    src="/footer/chatbot.webp"
                                    alt="FP Bunny"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Name + Online */}
                            <div>
                                <p className="text-sm font-semibold text-white">
                                    FP Bunny
                                </p>

                                <p className="flex items-center gap-1.5 text-xs text-blue-100">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                                    Online
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Close chat"
                            className="rounded-full p-1 text-blue-100 transition hover:bg-blue-500 hover:text-white"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 space-y-3 overflow-y-auto bg-blue-50/40 px-4 py-4"
                    >
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${message.role === "user"
                                        ? "rounded-br-sm bg-blue-600 text-white"
                                        : "rounded-bl-sm border border-blue-100 bg-white text-slate-700"
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-blue-100 bg-white px-4 py-3">
                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-300 [animation-delay:-0.2s]" />
                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-300 [animation-delay:-0.1s]" />
                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-300" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-2 border-t border-blue-100 bg-white px-3 py-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className="w-full rounded-full border border-blue-100 bg-blue-50/60 px-4 py-2 text-sm text-slate-800 outline-none focus:border-blue-400"
                        />
                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={!input.trim()}
                            aria-label="Send message"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <SendIcon />
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle button */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label={open ? "Close chat" : "Open chat"}
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition hover:bg-blue-500 hover:scale-105"
            >
                {open ? (
                    <CloseIcon />
                ) : (
                    <Image
                        src="/footer/chatbot.webp"
                        alt="Open chat with FP Bunny"
                        fill
                        className="rounded-full object-cover p-1.5"
                    />
                )}
            </button>
        </div>
    );
}