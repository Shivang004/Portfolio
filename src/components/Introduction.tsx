"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function Introduction() {
  const handleDownload = () => {
    const resumeUrl = "/Resume.pdf"; // Ensure the file is inside the `public` folder
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Shivang_Agarwal_Resume.pdf"; // Change the filename if needed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section id="introduction" className="min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-8"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold space-x-3"
          variants={itemVariants}
        >
          <motion.span>Hi,</motion.span>{" "}
          <motion.span>I&#39;m</motion.span>{" "}
          <motion.span 
            className="text-primary inline-block"
            variants={nameVariants}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
          >
            Shivang Agarwal
          </motion.span>
        </motion.h1>

        <motion.div
          className="relative"
          variants={itemVariants}
        >
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Bridging AI, Web Development, and Embedded Systems to Build Scalable and Intelligent Solutions.
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex justify-center gap-4"
          variants={itemVariants}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              size="lg" 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                  toast.success("Scroll to contact section");
                }
              }}
              className="transition-shadow hover:shadow-lg"
            >
              Contact Me
            </Button>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleDownload}
              className="transition-shadow hover:shadow-lg"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}