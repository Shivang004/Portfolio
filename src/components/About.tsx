"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.location.hash === '#about' && sectionRef.current) {
      const yOffset = -80; // Adjust this value based on your navbar height
      const element = sectionRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen py-24 bg-muted/30 scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <p className="text-lg text-muted-foreground mb-4">   
                I’m a 3rd-year BTech student at IIT Kanpur, specializing in Materials Science and Engineering with a strong focus on AI, Web Development, and Autonomous systems. My work spans AI-driven materials informatics, robotics, motion video saliency and forecasting algorithms. I have developed ML models for energy optimization, autonomous drone navigation, and EEG decoding while also mentoring projects in embedded systems and AI. On the software side, I have built and deployed scalable web platforms using React, Next.js, FastAPI, and PostgreSQL, integrating DevOps practices with Docker, and AWS. Passionate about innovation, I strive to bridge the gap between AI, hardware, and real-world applications through cutting-edge technology.
              </p>
              </Card>
          </div>
          <motion.div 
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <Image
                src="https://i.postimg.cc/zXn6fWVw/profile.jpg"
                alt="Shivang Agarwal"
                fill
                className="rounded-2xl object-cover shadow-xl"
                sizes="(max-width: 768px) 288px, 384px"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
