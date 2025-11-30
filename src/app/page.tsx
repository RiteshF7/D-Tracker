import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <Features />
      <Pricing />
      <FAQ />

      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-white/5">
        <p>© 2024 D Tracker. All rights reserved.</p>
      </footer>
    </main>
  );
}
