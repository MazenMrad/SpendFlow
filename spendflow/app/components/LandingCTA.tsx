"use client";

export default function LandingCTA() {
  return (
    <section className="py-20 px-16 bg-gray-900 rounded-3xl mx-8 mb-20">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: "Montserrat" }}>
          Ready to get Started ?
        </h2>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 text-white font-bold bg-blue-600 rounded-full hover:bg-blue-700 cursor-pointer">
            Join Now
          </button>
          <button className="px-8 py-3 text-white font-bold bg-transparent border border-white rounded-full hover:bg-white hover:text-gray-900 cursor-pointer">
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
}
