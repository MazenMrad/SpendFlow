export default function FeaturesSection() {
  const features = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/681cdc04f4d335516541697eb1fd34e289f70957?width=120",
      title: "Instant Logging",
      description: "Quick-entry interface to log your coffee, groceries, or bills in seconds.",
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/7543591251b32cdeb18ddfdc68facc30d11ab2e0?width=120",
      title: "Custom Categories",
      description: "Define limits for dining out, rent, or hobbies to see where your money goes",
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/6198ee34c0b29ff69fd4ef4b602281bae0bbdcc8?width=120",
      title: "Cloud Sync",
      description: "Access your financial data from any device. Your records are always updated and synced in real-time.",
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/7ce87fe6f4d9861595596d21903d9e2229a340e9?width=120",
      title: "Visual Reports",
      description: "See your spending habits through beautiful charts and organized lists.",
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/2cb40cc41656d1ae0916a47dac028883195cd4da?width=120",
      title: "Savings Milestones",
      description: "Set personal goals and get notified when you hit your big savings targets.",
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/b8644c70b8ef3ebdb35e011ccacac18e734bd1ce?width=120",
      title: "Secure & Private",
      description: "Your data stays on your device. Local storage ensures your privacy.",
    },
  ];

  return (
    <section id="features" className="w-full bg-[rgba(230,242,254,0.28)] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[#F75C4E] text-sm sm:text-base font-bold font-gilroy-bold mb-4 tracking-wider">
            FiNANCIAL WELLNESS
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black font-gilroy-bold mb-4 sm:mb-6">
            Smart Features For Your Money
          </h2>
          <p className="max-w-3xl mx-auto text-[#575455] text-sm sm:text-base font-gilroy-regular leading-relaxed">
            Everything you need to stay on budget. Designed for simplicity and speed, so you can manage your money on the go
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-[#070F18] font-gilroy-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-[#575455] text-sm sm:text-base font-gilroy-regular leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
