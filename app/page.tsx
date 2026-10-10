import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AppShowcase from "@/components/AppShowcase";
import FeatureHighlights from "@/components/FeatureHighlights";
import RoutineGenerator from "@/components/RoutineGenerator";
import MacroCoach from "@/components/MacroCoach";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Header />
      <main>
        <Hero />
        <AppShowcase />
        <FeatureHighlights />
        <RoutineGenerator />
        <MacroCoach />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
