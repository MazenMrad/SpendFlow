import LandingHeader from "@/app/components/LandingHeader";
import LandingHero from "@/app/components/LandingHero";
import LandingFeatures from "@/app/components/LandingFeatures";
import LandingControl from "@/app/components/LandingControl";
import LandingProcess from "@/app/components/LandingProcess";
import LandingIncome from "@/app/components/LandingIncome";
import LandingWhyChooseUs from "@/app/components/LandingWhyChooseUs";
import LandingFooter from "@/app/components/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <LandingHeader />

      {/*Hero Section */}
      <LandingHero />

      {/* Features Section */}
      <LandingFeatures />

      {/* Control Section with Spending by Category */}
      <LandingControl />

      {/* How Our App Works Section */}
      <LandingProcess />

      {/* Income vs Expenses Section */}
      <LandingIncome />

      {/* Why Choose Us Section */}
      <LandingWhyChooseUs />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
