"use client";

import { useState, useEffect } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <span className="text-xl font-bold">Portfolio</span>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
          <Button
              variant="ghost"
              onClick={() => scrollToSection("introduction")}
            >
              Home
            </Button>
          <Button
              variant="ghost"
              onClick={() => scrollToSection("about")}
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("skills")}
            >
              Skills
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
            <Button
                variant="ghost"
                onClick={() => scrollToSection("introduction")}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("about")}
              >
                About
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("skills")}
              >
                Skills
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("projects")}
              >
                Projects
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}