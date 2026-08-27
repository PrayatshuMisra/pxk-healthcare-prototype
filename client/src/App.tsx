/** Community Wayfinding: global route shell keeps consent-gated, language-aware screening and local record tools available across the care journey. */
import "./screens.css";
import "./route-engine.css";
import "./consent-export.css";
import "./route-redesign.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocaleStatus } from "@/components/LocaleStatus";
import { RouteLocaleBoundary } from "@/components/RouteLocaleBoundary";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Language } from "@/data/mockData";
import About from "@/pages/About";
import AnalyticsDashboard from "@/pages/AnalyticsDashboard";
import DoctorDashboard from "@/pages/DoctorDashboard";
import Home from "@/pages/Home";
import HowItWorks from "@/pages/HowItWorks";
import ModelCard from "@/pages/ModelCard";
import NotFound from "@/pages/NotFound";
import PatientDashboard from "@/pages/PatientDashboard";
import PatientHistory from "@/pages/PatientHistory";
import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
function RoutedApplication({ language }: { language: Language }) { const scoped = (page: React.ReactNode) => <RouteLocaleBoundary language={language}>{page}</RouteLocaleBoundary>; return <Switch><Route path="/">{() => scoped(<Home language={language} />)}</Route><Route path="/patient">{() => scoped(<PatientDashboard language={language} />)}</Route><Route path="/history">{() => scoped(<PatientHistory language={language} />)}</Route><Route path="/analytics">{() => scoped(<AnalyticsDashboard language={language} />)}</Route><Route path="/model">{() => scoped(<ModelCard />)}</Route><Route path="/doctor">{() => scoped(<DoctorDashboard />)}</Route><Route path="/how-it-works">{() => scoped(<HowItWorks />)}</Route><Route path="/about">{() => scoped(<About />)}</Route><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>; }
function App() { const [language, setLanguage] = useState<Language>(() => { const saved = typeof window === "undefined" ? null : window.localStorage.getItem("pxk-locale"); return saved === "kn" || saved === "tulu" || saved === "kok" || saved === "en" ? saved : "en"; }); useEffect(() => { document.documentElement.lang = language === "kn" ? "kn" : language === "kok" ? "kok" : language === "tulu" ? "tcy" : "en"; document.documentElement.dataset.locale = language; window.localStorage.setItem("pxk-locale", language); }, [language]); return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><div className="min-h-screen bg-[var(--canvas)]"><Header language={language} setLanguage={setLanguage} /><LocaleStatus language={language} /><RoutedApplication language={language} /><Footer language={language} /></div></TooltipProvider></ThemeProvider></ErrorBoundary>; }
export default App;
