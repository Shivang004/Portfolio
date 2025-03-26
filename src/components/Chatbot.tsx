"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X } from "lucide-react";
import { toast } from "sonner";

// Resume Context for the Chatbot
const RESUME_CONTEXT = `
You are an AI assistant specifically designed to provide detailed information about the portfolio owner's professional background. 
Always respond in a helpful, professional manner.

PROFESSIONAL PROFILE:
- Name: [Your Name]
- Professional Focus: Data Engineering and DevOps

WORK EXPERIENCE:
1. [Current/Most Recent Job Title] at [Company Name]
   - Key Responsibilities: 
     * Developed and maintained data pipelines
     * Implemented cloud infrastructure solutions
     * Optimized data processing workflows
   - Technologies: Kubernetes, Apache Spark, AWS, Docker

2. [Previous Job Title] at [Previous Company]
   - Key Achievements:
     * Automated deployment processes
     * Reduced infrastructure costs by X%
     * Implemented monitoring and logging solutions
   - Technologies: Jenkins, Terraform, GCP

TECHNICAL SKILLS:
- Cloud Platforms: AWS, GCP, Azure
- DevOps Tools: Kubernetes, Docker, Terraform
- Data Engineering: Apache Spark, Airflow, Kafka
- Programming Languages: Python, Java, Bash
- Databases: PostgreSQL, MongoDB, Cassandra

PROJECTS:
1. Data Pipeline Optimization Project
   - Developed a scalable data ingestion system
   - Implemented real-time data processing
   - Reduced data processing time by X%

2. Cloud-Native Microservices Architecture
   - Designed and deployed microservices infrastructure
   - Implemented containerization and orchestration

CERTIFICATIONS:
- AWS Certified Solutions Architect
- Kubernetes Administrator (CKA)
- Google Cloud Professional Data Engineer

When answering questions:
- Provide specific, detailed responses
- Use professional language
- Highlight technical achievements and skills
- If a question is too specific or cannot be answered, politely explain that
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { 
      role: "system", 
      content: RESUME_CONTEXT 
    },
    { 
      role: "assistant", 
      content: "Hi! I'm an AI assistant who can provide detailed information about the portfolio owner's professional background. What would you like to know about their experience, skills, or projects?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter a message");
      return;
    }

    // Add user message
    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare the request to Groq API
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3-3-8b-versatile",
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error("Groq API request failed");
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;

      setMessages(prev => [
        ...prev, 
        { role: "assistant", content: assistantMessage }
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      toast.error("Failed to get response. Please try again.");
      
      // Restore the last user message
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
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
            <CardTitle>Resume Assistant</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 space-y-4">
            {messages.filter(m => m.role !== "system").map((message, index) => (
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
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  Thinking...
                </div>
              </div>
            )}
          </CardContent>
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my resume..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>Send</Button>
          </form>
        </Card>
      )}
    </>
  );
}