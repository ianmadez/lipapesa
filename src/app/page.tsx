import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { Promises, HowItWorks, Pillars, Stats, DeveloperTeaser, Faq, ClosingCta } from "@/components/marketing/LandingSections";
import { LandingStories } from "@/components/marketing/LandingStories";
import { Footer } from "@/components/marketing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Promises />
        <Pillars />
        <LandingStories />
        <Stats />
        <DeveloperTeaser />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
