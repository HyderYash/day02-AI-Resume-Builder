"use client";

import { Github, Linkedin, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="glass border-t border-white/20 dark:border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-light-text dark:text-dark-text">
            <span className="text-sm md:text-base">Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span className="text-sm md:text-base">by Yash Sharma</span>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/HyderYash"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-input rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent transition-all duration-200 hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/yashsh21/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-input rounded-xl border border-white/30 dark:border-white/10 text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent transition-all duration-200 hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </div>
          
          <div className="text-sm text-light-text dark:text-dark-text opacity-70">
            <p>Day 2 of #100Days100Projects</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

