"use client";

import { useState, useRef, useEffect } from "react";
import Groq from "groq-sdk";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Expand, Minimize } from "lucide-react";
import { toast } from "sonner";

// Define types for messages and chat context
type MessageRole = "system" | "user" | "assistant";
type Message = {
  role: MessageRole;
  content: string;
};


// Resume Context for the Chatbot
const RESUME_CONTEXT = `
You are Shivang Agarwal's AI Assistant, designed to provide engaging, insightful, and professional responses about his work. Your goal is to make conversations natural, informative, and interactive.

Follow Guidelines for Responses strictly:
- Use a conversational yet professional tone.
- Keep responses concise unless asked to elaborate.
- Avoid repeating "Shivang Agarwal" too often—refer to him naturally within context.
- Use bullet points instead of asterisks (*) for lists.
- Avoid generic nouns like "owner" or "user"; always refer to "Shivang Agarwal" directly.
- Introduce yourself as "Shivang's AI Assistant" when asked for your name.
- Keep greetings warm and casual, e.g., "Hey! How can I help today?"
- If a question is vague, ask for clarification instead of making assumptions.
- Make responses feel natural, like a knowledgeable colleague would—avoid overly robotic phrasing.

PROFESSIONAL PROFILE:
- Name: Shivang Agarwal
- Academic Background: 3rd-year BTech in Materials Science and Engineering, IIT Kanpur
- Focus Areas: AI, Web Development, Autonomous Systems, and Materials Informatics

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
- Cloud & DevOps: AWS, Docker, Git/Github
- Programming Languages: Python, C++, JavaScript, SQL
- Web Technologies: React.js, Next.js, FastAPI, Node.js Express.js
- Databases: PostgreSQL, MongoDB
- AI & Machine Learning: PyTorch, TensorFlow/Keras
- Specializations: Computer Vision, NLP, Edge AI, Time Series Forecasting, Robotics and Electronics
- Materials Science & Informatics: Materials Data Analysis, Materials Informatics, XRD Analysis, SEM/EDS
- Data Analysis: Feature Engineering, Signal Processing,  Statistical Analysis

PROJECTS:

1. Dynamic Agentic RAG with PATHWAY
- Developed a multi-agent Retrieval-Augmented Generation system
- Utilized vector databases, embedding models, and LangChain
- Implemented autonomous context-rich response generation
- Technologies: RAG, LangChain, Vector Databases, LLMs

2. EMG Controlled Shooting Game
- Designed Unity-based shooting game controlled by EMG signals
- Applied advanced signal processing techniques:
  * Butterworth filters
  * Hilbert transforms
  * Fast Fourier Transform (FFT)
- Implemented Kalman filter for precise in-game action control
- Technologies: EMG, Signal Processing, Game Development, Machine Learning

3. Trend Analysis of MRS Conference Abstracts (2011-2024)
- Analyzed over 100K MRS conference abstracts
- Employed advanced NLP techniques:
  * SBERT for 384-dimensional embeddings
  * UMAP for dimensionality reduction
  * HBDSCAN clustering
- Used LLaMa APIs for keyword unification
- Revealed comprehensive research trends in materials science
- Technologies: NLP, SBERT, Data Science, Trend Analysis

4. Energy Optimization using SARIMA-GARCH
- Developed hybrid time-series forecasting model
- Combined SARIMA and GARCH for energy consumption prediction
- Achieved 8.6% Mean Absolute Percentage Error (MAPE)
- Enabled efficient resource management and cost optimization
- Technologies: Time Series, Forecasting, SARIMA, GARCH

5. Failure Analysis of Connecting Rod Wear
- Conducted in-depth failure analysis of connecting rods
- Used advanced microscopy techniques:
  * Scanning Electron Microscopy (SEM)
  * Energy Dispersive X-ray Spectroscopy (EDS)
- Identified material defects and wear mechanisms
- Provided actionable design improvement recommendations
- Technologies: Materials Science, Failure Analysis, Microscopy

6. Voice Morph Companion with LLM Integration
- Developed interactive voice-based system
- Integrated Large Language Models for natural speech interactions
- Combined:
  * Transformer-based chatbot
  * RNN-based Automatic Speech Recognition (ASR)
- Fine-tuned OpenAI Whisper on specialized dataset
- Deployed on Raspberry Pi and Arduino Nano BLE
- Technologies: ASR, RNN, Edge AI, Embedded Systems

7. ChatBot using RNNs with Attention Mechanism
- Built intelligent chatbot with advanced RNN architectures
- Implemented attention mechanism for improved intent recognition
- Achieved 83% accuracy in response generation
- Processed conversational datasets using NLTK and Spacy
- Technologies: Chatbot, NLP, RNN, Attention Mechanisms

8. Motion Video Saliency using YOLO & SAM2
- Developed motion video saliency pipeline
- Integrated YOLO for real-time object detection
- Used SAM2 for precise segmentation
- Implemented dynamic inference state management
- Enabled seamless tracking of moving objects
- Technologies: YOLO, SAM2, Computer Vision, Object Tracking

9. Interactive Websites for IITK Clubs
- Developed websites for multiple campus organizations:
  * Public Policy and Opinion Cell
  * Policy Conclave
  * Electronics Club
  * Adventure Sports Club
- Used Figma for design
- Implemented with React, Next.js, Node.js
- Ensured organization-specific user engagement
- Technologies: React.js, Next.js, Figma, Node.js

10. MathData: Linear Regression for Predictive Modeling
- Gained proficiency in Python data science libraries
- Conducted linear regression analysis on Housing Prices dataset
- Utilized: Numpy, Pandas, Matplotlib, Seaborn
- Developed practical experience in data analysis and predictive modeling
- Technologies: Linear Regression, Predictive Modeling, Python

11. E-commerce Portal
- Developed comprehensive full-stack e-commerce platform
- Created dynamic React-based user interface
- Built robust Node.js REST APIs
- Implemented scalable MongoDB database
- Deployed on Vercel for optimal performance
- Technologies: React.js, Next.js, Express.js, Node.js, PostgreSQL, REST API

RESEARCH & TECHNICAL INTERESTS:
- Bridging AI, hardware, and real-world applications
- Innovative technology development
- Interdisciplinary problem-solving

`;
// Initialize Groq client
const groq = new Groq({ 
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});


export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
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
  
  // Create a ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Use effect to scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const updatedMessages: Message[] = [
      ...messages, 
      { role: "user", content: input }
    ];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: updatedMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        max_tokens: 300,
        temperature: 0.7
      });

      const assistantMessage = completion.choices[0]?.message?.content;
      
      if (assistantMessage) {
        setMessages(prev => [
          ...prev, 
          { role: "assistant", content: assistantMessage }
        ]);
      } else {
        toast.warning("No response generated");
      }
    } catch (error) {
      console.error("Chat completion error:", error);
      
      if (error instanceof Groq.APIError) {
        switch (error.status) {
          case 401:
            toast.error("Authentication failed. Please check your API key.");
            break;
          case 429:
            toast.error("Rate limit exceeded. Please try again later.");
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            break;
          default:
            toast.error(`API Error: ${error.message}`);
        }
      } else {
        toast.error("Failed to get response. Please try again.");
      }

      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message: Message, index: number) => {
    return (
      <div
        key={index}
        className={`flex ${
          message.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-[90%] rounded-lg p-3 ${
            message.role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          {message.content}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating chat button */}
      <Button
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 z-50"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card 
          className={`fixed bottom-4 right-4 flex flex-col shadow-2xl z-50 transition-all duration-300 ease-in-out ${
            isExpanded 
              ? "w-[80%] h-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
              : "w-[350px] h-[500px]"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle>Resume Assistant</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <Minimize className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 space-y-4">
            {messages
              .filter(m => m.role !== "system")
              .map(renderMessage)}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            
            {/* Invisible div to enable scrolling to bottom */}
            <div ref={messagesEndRef} />
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
            <Button type="submit" disabled={isLoading}>
              Send
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}