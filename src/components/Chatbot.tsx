"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X } from "lucide-react";
import { toast } from "sonner";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hi! I'm your AI assistant. Ask me anything about the portfolio!" },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter a message");
      return;
    }

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    // Show loading toast
    toast.loading("Thinking...");

    // TODO: Integrate with Groq or Together AI
    // For now, just echo a response
    setTimeout(() => {
      toast.dismiss();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm still being configured. Please check back later!",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating chat button */}
      <Button
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-[350px] h-[500px] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Chat Assistant</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </CardContent>
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit">Send</Button>
          </form>
        </Card>
      )}
    </>
  );
}