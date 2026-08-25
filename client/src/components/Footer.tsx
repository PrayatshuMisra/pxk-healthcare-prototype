/** Community Wayfinding: the footer closes the route with a concise trust statement and clear exits. */
import { BrandMark } from "@/components/BrandMark";
import { Link } from "wouter";

export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="grid gap-10 border-b border-white/15 py-12 sm:grid-cols-[1.25fr_0.75fr_0.75fr] lg:py-16"><div><BrandMark /><p className="mt-5 max-w-sm text-sm leading-6 text-white/68">A patient-first prototype for turning a health concern into a clearer clinical next step.</p></div><div><p className="footer-label">Explore</p><div className="mt-4 flex flex-col gap-3 text-sm text-white/78"><Link href="/">Home</Link><Link href="/how-it-works">How it works</Link><Link href="/about">About PxK</Link></div></div><div><p className="footer-label">Demo routes</p><div className="mt-4 flex flex-col gap-3 text-sm text-white/78"><Link href="/patient">Patient view</Link><Link href="/doctor">Doctor view</Link><a href="#demo">Screening demo</a></div></div></div><div className="flex flex-col gap-4 py-6 text-xs leading-5 text-white/58 md:flex-row md:items-center md:justify-between"><p>PxK · Team Errorists · SIH 2026</p><p className="max-w-2xl">PxK is a screening and decision-support prototype and does not replace professional medical diagnosis or treatment.</p></div></div></footer>;
}
