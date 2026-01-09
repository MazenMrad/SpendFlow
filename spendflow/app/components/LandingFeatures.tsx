"use client";

import InstantLoggingIcon from "@/app/icons/instant-logging-icon.svg";
import CustomCategoriesIcon from "@/app/icons/custom-categories-icon.svg";
import CloudSyncIcon from "@/app/icons/cloud-sync-icon.svg";
import VisualReportsIcon from "@/app/icons/visual-reports-icon.svg";
import SavingsMilestonesIcon from "@/app/icons/savings-milestones-icon.svg";
import SecurePrivateIcon from "@/app/icons/secure-private-icon.svg";
import Vector121 from "@/app/icons/vector-121.svg";
import Vector122 from "@/app/icons/vector-122.svg";

const features = [
  {
    icon: InstantLoggingIcon,
    title: "Instant Logging",
    description: "Quick-entry interface to log your coffee, groceries, or bills in seconds.",
    iconBg: "bg-[#3e7ef5]",
  },
  {
    icon: CustomCategoriesIcon,
    title: "Custom Categories",
    description: "Define limits for dining out, rent, or hobbies to see where your money goes",
    iconBg: "bg-[#fe7c4b]",
  },
  {
    icon: CloudSyncIcon,
    title: "Cloud Sync",
    description: "Access your financial data from any device. Your records are always updated and synced in real-time.",
    iconBg: "bg-[#1b2b65]",
  },
  {
    icon: VisualReportsIcon,
    title: "Visual Reports",
    description: "See your spending habits through beautiful charts and organized lists.",
    iconBg: "bg-[#fd1f9b]",
  },
  {
    icon: SavingsMilestonesIcon,
    title: "Savings Milestones",
    description: "Set personal goals and get notified when you hit your big savings targets.",
    iconBg: "bg-[#5c42ff]",
  },
  {
    icon: SecurePrivateIcon,
    title: "Secure & Private",
    description: "Your data stays yours—encrypted and never shared. No ads, no bank links required.",
    iconBg: "bg-[#fead86]",
  },
];

export default function LandingFeatures() {
  return (
    <section className="bg-white py-24 px-16 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <Vector121 className="absolute top-0 left-0 w-[400px] h-auto opacity-10 pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <Vector122 className="absolute bottom-0 right-0 w-[400px] h-auto opacity-10 pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-[#f75c4e] tracking-[1.8px] uppercase mb-4 block font-poppins">
            FINANCIAL WELLNESS
          </span>
          <h2 className="text-[44px] font-bold text-[#1c1f37] font-gilroy mb-6">
            Smart Features For Your Money
          </h2>
          <p className="text-lg text-[#575455] max-w-3xl mx-auto leading-relaxed font-gilroy">
            Everything you need to stay on budget. Designed for simplicity and speed, so you can manage your money on the go
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`${feature.iconBg} w-[60px] h-[60px] rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1c1f37] font-gilroy mb-4">
                {feature.title}
              </h3>
              <p className="text-base text-[#575455] leading-relaxed font-gilroy">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}