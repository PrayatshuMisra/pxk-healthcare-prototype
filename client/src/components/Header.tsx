/** Community Wayfinding: the header is a compact route-control that always offers an escape route. */
import { BrandMark } from "@/components/BrandMark";
import { LanguageSelector } from "@/components/LanguageSelector";
import type { Language } from "@/data/mockData";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

function scrollToId(id: string, navigate: (path: string) => void, location: string) { if (location !== "/") { navigate("/"); window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80); return; } document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }

export function Header({ language, setLanguage }: { language: Language; setLanguage: (language: Language) => void }) {
  const [location, navigate] = useLocation(); const [menuOpen, setMenuOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const handler = () => setScrolled(window.scrollY > 16); handler(); window.addEventListener("scroll", handler, { passive: true }); return () => window.removeEventListener("scroll", handler); }, []);
  const closeMenu = () => setMenuOpen(false); const goTo = (id: string) => { scrollToId(id, navigate, location); closeMenu(); };
  return <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}><div className="container flex items-center justify-between gap-4 py-3.5 lg:py-4"><Link href="/" aria-label="PxK home" onClick={closeMenu}><BrandMark /></Link><nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation"><Link className={`nav-link ${location === "/" ? "active" : ""}`} href="/">Home</Link><Link className={`nav-link ${location === "/how-it-works" ? "active" : ""}`} href="/how-it-works">How it works</Link><Link className={`nav-link ${location === "/about" ? "active" : ""}`} href="/about">About</Link></nav><div className="hidden items-center gap-3 lg:flex"><LanguageSelector value={language} onChange={setLanguage} /><button className="btn btn-primary btn-small" onClick={() => goTo("demo")}>Start screening</button></div><div className="flex items-center gap-2 lg:hidden"><LanguageSelector value={language} onChange={setLanguage} className="language-select--compact" /><button className="icon-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div></div>{menuOpen && <div className="mobile-menu lg:hidden"><Link href="/" onClick={closeMenu}>Home</Link><Link href="/how-it-works" onClick={closeMenu}>How it works</Link><Link href="/about" onClick={closeMenu}>About</Link><button className="btn btn-primary" onClick={() => goTo("demo")}>Start screening</button></div>}</header>;
}
