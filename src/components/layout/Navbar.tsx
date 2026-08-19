"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, BUSINESS } from "@/lib/constants";
import { Logo } from "@/components/brand/Logo";
import { LOGO } from "@/lib/brand";
import "@/styles/Navbar.css";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    "Hello Ganpati Lifecare, I would like to enquire about your medical and surgical products. Please share product availability and quotation."
  )}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`navbar ${
        scrolled ? "scrolled" : "top"
      }`}
    >
      <nav
        className="navbar-wrapper"
        aria-label="Main navigation"
      >
        <Link href="#home" className="navbar-logo">
          <Logo variant="full" alt={LOGO.alt.main} priority className="h-11 md:h-12" />
        </Link>

        <ul className="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="navbar-link"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-desktop-buttons">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-whatsapp-btn"
          >
            WhatsApp
          </a>
          <a
            href={`tel:${BUSINESS.phones[0]}`}
            className="navbar-phone-btn"
          >
            Call Now
          </a>
        </div>

        <div className="navbar-mobile-actions">
          <a
            href={`tel:${BUSINESS.phones[0]}`}
            className="navbar-phone-icon"
            aria-label="Call now"
          >
            <svg className="navbar-icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="navbar-menu-toggle cursor-pointer"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="navbar-icon-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="navbar-icon-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="navbar-mobile-menu open"
          >
            <ul className="navbar-mobile-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="navbar-mobile-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="navbar-mobile-buttons">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="navbar-mobile-whatsapp-btn"
                >
                  WhatsApp
                </a>
                <a
                  href={`tel:${BUSINESS.phones[0]}`}
                  onClick={() => setOpen(false)}
                  className="navbar-mobile-phone-btn"
                >
                  Call Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
