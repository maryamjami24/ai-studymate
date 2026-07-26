"use client";

import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BrainCircuit className="text-cyan-400 w-8 h-8" />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AI StudyMate
          </span>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="/" className="hover:text-cyan-400 transition">Home</a>
          <a href="#features" className="hover:text-cyan-400 transition">Features</a>
          <a href="#about" className="hover:text-cyan-400 transition">About</a>
          <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
        </div>

        {/* Login */}
        <Link
          href="/login"
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-xl font-semibold transition"
        >
          Login
        </Link>

      </div>
    </nav>
  );
}