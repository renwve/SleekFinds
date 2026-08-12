"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Send, User, ChevronRight, Trash2 } from "lucide-react";

interface ChatThread {
    id: string;
    seller: string;
    item: string;
    lastMessage: string;
    time: string;
    messages: string[];
}

const STORAGE_KEY = "sleekfinds_chat_threads";

function MessagesContent() {
    const searchParams = useSearchParams();
    const sellerParam = searchParams.get("seller");
    const itemParam = searchParams.get("item");

    const [chats, setChats] = useState<ChatThread[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load initial chats from localStorage or fallback to initial data
    useEffect(() => {
        const savedChats = localStorage.getItem(STORAGE_KEY);
        let initialChats: ChatThread[] = [];

        if (savedChats) {
        try {
            initialChats = JSON.parse(savedChats);
        } catch {
            initialChats = [];
        }
        } else {
        initialChats = [
            {
            id: "chat-1",
            seller: "Vintage Collection AB",
            item: "Mid-Century Lounge Chair",
            lastMessage: "Is this piece still available?",
            time: "2h ago",
            messages: ["Hi! Is this piece still available?"],
            },
        ];
        }

        setChats(initialChats);
        setIsLoaded(true);
    }, []);

  // 2. Handle URL query params (e.g., coming from "Message Seller" button)
    useEffect(() => {
        if (!isLoaded) return;

        if (sellerParam && itemParam) {
        const existing = chats.find(
            (c) => c.seller === sellerParam && c.item === itemParam
        );

        if (existing) {
            setActiveChatId(existing.id);
        } else {
            const newChat: ChatThread = {
            id: `chat-${Date.now()}`,
            seller: sellerParam,
            item: itemParam,
            lastMessage: `Inquiry regarding ${itemParam}`,
            time: "Just now",
            messages: [`Hi ${sellerParam}, I am interested in ${itemParam}!`],
            };
            const updated = [newChat, ...chats];
            setChats(updated);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            setActiveChatId(newChat.id);
        }
        } else if (chats.length > 0 && !activeChatId) {
        setActiveChatId(chats[0].id);
        }
    }, [sellerParam, itemParam, isLoaded]);

  // Helper to persist state changes
    const saveChats = (updatedChats: ChatThread[]) => {
        setChats(updatedChats);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedChats));
    };

    const activeChat = chats.find((c) => c.id === activeChatId);  

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || !activeChatId) return;

        const updated = chats.map((chat) => {
        if (chat.id === activeChatId) {
            return {
            ...chat,
            lastMessage: inputMessage,
            time: "Just now",
            messages: [...chat.messages, inputMessage],
            };
        }
        return chat;
        });

        saveChats(updated);
        setInputMessage("");
    };

  // Delete chat thread handler
    const handleDeleteChat = (e: React.MouseEvent, chatIdToDelete: string) => {
        e.stopPropagation(); // Prevents selecting the chat while clicking delete

        if (confirm("Are you sure you want to delete this conversation?")) {
        const remainingChats = chats.filter((chat) => chat.id !== chatIdToDelete);
        saveChats(remainingChats);

        if (activeChatId === chatIdToDelete) {
            setActiveChatId(remainingChats.length > 0 ? remainingChats[0].id : null);
        }
        }
    };

    return (
        <div className="mx-auto max-w-6xl">
        <Link
            href="/sells"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
        >
            <ArrowLeft size={16} /> Back to Finds
        </Link>

        <div className="mb-6 flex items-center gap-3">
            <MessageSquare className="text-primary" size={28} />
            <h1 className="font-serif text-3xl font-bold">Messages</h1>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-surface shadow-sm md:grid-cols-12 min-h-[550px]">
            {/* Left Sidebar: Conversations List */}
            <div className="border-r border-border md:col-span-4 bg-surface-secondary/30">
            <div className="border-b border-border p-4">
                <h2 className="font-serif font-semibold text-sm text-foreground">Conversations</h2>
            </div>

            <div className="divide-y divide-border/60">
                {chats.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted">
                    No active conversations.
                </div>
                ) : (
                chats.map((chat) => {
                    const isActive = chat.id === activeChatId;
                    return (
                    <button
                        key={chat.id}
                        onClick={() => setActiveChatId(chat.id)}
                        className={`group relative w-full p-4 text-left transition flex items-center justify-between ${
                        isActive
                            ? "bg-primary/10 border-l-4 border-primary"
                            : "hover:bg-surface-secondary/80"
                        }`}
                    >
                        <div className="truncate pr-2">
                        <p className="font-serif text-sm font-semibold text-foreground truncate">
                            {chat.seller}
                        </p>
                        <p className="text-xs text-primary font-medium truncate mt-0.5">
                            {chat.item}
                        </p>
                        <p className="text-xs text-muted truncate mt-1">
                            {chat.lastMessage}
                        </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                        <button
                            type="button"
                            onClick={(e) => handleDeleteChat(e, chat.id)}
                            title="Delete conversation"
                            aria-label="Delete conversation"
                            className="p-1.5 text-muted transition hover:text-red-500 rounded opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                            <Trash2 size={15} />
                        </button>
                        <ChevronRight size={14} className="text-muted" />
                        </div>
                    </button>
                    );
                })
                )}
            </div>
            </div>

            {/* Right Main Pane: Active Chat Window */}
            <div className="flex flex-col justify-between md:col-span-8 bg-surface">
            {activeChat ? (
                <>
                {/* Chat Header */}
                <div className="border-b border-border bg-surface-secondary/40 p-4">
                    <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User size={20} />
                    </div>
                    <div>
                        <h2 className="font-serif font-semibold text-foreground">
                        {activeChat.seller}
                        </h2>
                        <p className="text-xs text-muted">
                        Item: <span className="font-medium text-foreground">{activeChat.item}</span>
                        </p>
                    </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[380px]">
                    <div className="rounded-lg bg-surface-secondary/60 p-3 text-xs text-muted text-center">
                    Chatting with <strong className="text-foreground">{activeChat.seller}</strong> about <strong className="text-foreground">{activeChat.item}</strong>.
                    </div>

                    {activeChat.messages.map((msg, index) => (
                    <div key={index} className="flex justify-end">
                        <div className="max-w-[80%] rounded-2xl bg-primary px-4 py-2.5 text-sm text-white shadow-sm">
                        {msg}
                        </div>
                    </div>
                    ))}
                </div>

                {/* Input Bar */}
                <form
                    onSubmit={handleSendMessage}
                    className="flex items-center gap-2 border-t border-border p-4 bg-surface"
                >
                    <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Write a message..."
                    className="flex-1 rounded-lg border border-border bg-background p-3 text-sm text-foreground outline-none transition focus:border-primary"
                    />
                    <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-opacity-90"
                    >
                    <Send size={16} /> Send
                    </button>
                </form>
                </>
            ) : (
                <div className="flex h-full flex-col items-center justify-center p-8 text-center text-muted">
                <MessageSquare size={40} className="mb-2 text-muted/40" />
                <p className="text-sm">Select a conversation from the left sidebar to view messages.</p>
                </div>
            )}
            </div>
        </div>
        </div>
    );
}

export default function MessagesPage() {
    return (
        <main className="min-h-screen bg-background px-6 py-10 text-foreground">
        <Suspense fallback={<div className="p-8 text-center text-sm text-muted">Loading messages...</div>}>
            <MessagesContent />
        </Suspense>
        </main>
    );
}