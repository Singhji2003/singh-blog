"use client";
import React, { useState } from "react";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  // { label: "Collection", href: "/" },
  { label: "Philosophy", href: "/" },
  { label: "About", href: "/" },
  { label: "Archive", href: "/" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const linkClass =
    "relative text-black hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="relative border-b border-[#dfdfdf]">
      {/* Top Bar */}
      <div className="flex justify-between py-4 px-8 items-center">
        {/* Logo */}
        <Image src={Logo} className="w-42" alt="Logo" />

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 font-normal">
          {navLinks.map((link) => (
            <Link key={link.label} className={linkClass} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/login"
            className="text-black hover:text-blue-600 transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 rounded-full text-white bg-[#0D81DB] hover:bg-blue-700 transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Button (Mobile Only) */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[2px] w-6 bg-black rounded transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-black rounded transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-black rounded transition-all duration-300 ease-in-out ${
              isOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown — absolutely positioned so it floats over content */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 z-50 bg-white shadow-lg border-t border-[#dfdfdf] overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-8 pb-6 pt-2 gap-5">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className={`text-black hover:text-blue-600 font-normal transition-all duration-200 border-b border-[#f0f0f0] pb-3 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/login"
              onClick={closeMenu}
              className="text-center border border-[#0D81DB] text-[#0D81DB] py-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={closeMenu}
              className="text-center px-6 py-2 rounded-full text-white bg-[#0D81DB] hover:bg-blue-700 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
