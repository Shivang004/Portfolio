"use client";

import Navigation from "@/components/Navigation";
import Introduction from "@/components/Introduction";
import AboutMe from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="min-h-screen bg-background dark:bg-transparent">
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-20">
        <Introduction />
        <AboutMe />
        <Skills />
        <Projects />
        <Contact />
      </div>
      <Chatbot />
    </main>
  );
}