/** Community Wayfinding: a responsive pill navigation gives the PxK route system one uncluttered, tactile control surface. */
import { BrandMark } from "@/components/BrandMark";
import "@/pill-nav.css";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
export type PillNavItem = { label: string; href: string };
export function PillNav({ items, activeHref, onNavigate }: { items: PillNavItem[]; activeHref: string; onNavigate?: () => void }) { const [open, setOpen] = useState(false); const close = () => { setOpen(false); onNavigate?.(); }; return <nav className="pill-nav" aria-label="Primary navigation"><Link href="/" className="pill-nav-logo" aria-label="PxK home" onClick={close}><BrandMark /></Link><div className="pill-nav-rail">{items.map((item) => <Link key={item.href} href={item.href} onClick={close} className={`pill-nav-link ${activeHref === item.href ? "pill-nav-link--active" : ""}`}><span>{item.label}</span></Link>)}</div><button className="pill-nav-menu" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>{open && <div className="pill-nav-mobile">{items.map((item) => <Link key={item.href} href={item.href} onClick={close} className={activeHref === item.href ? "active" : ""}>{item.label}</Link>)}</div>}</nav>; }
