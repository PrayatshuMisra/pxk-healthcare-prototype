/** Community Wayfinding: global route shell makes screening, history, analytics, and transparent model reasoning visible across the complete product journey. */
import "./screens.css";
import "./route-engine.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
import { useState } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function RoutedApplication({ language }: { language: Language }) { return <Switch><Route path="/">{() => <Home language={language} />}</Route><Route path="/patient" component={PatientDashboard} /><Route path="/history" component={PatientHistory} /><Route path="/analytics" component={AnalyticsDashboard} /><Route path="/model" component={ModelCard} /><Route path="/doctor" component={DoctorDashboard} /><Route path="/how-it-works" component={HowItWorks} /><Route path="/about" component={About} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>; }
function App() { const [language, setLanguage] = useState<Language>("en"); return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><div className="min-h-screen bg-[var(--canvas)]"><Header language={language} setLanguage={setLanguage} /><RoutedApplication language={language} /><Footer /></div></TooltipProvider></ThemeProvider></ErrorBoundary>; }
export default App;
