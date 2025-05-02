import { Link } from "wouter";
import { templeInfo } from "@/lib/data";

const HeroSection = () => {
  return (
    <section className="hero-section min-h-[600px] flex items-center justify-center text-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-cinzel mb-4">
            Welcome to {templeInfo.name}
          </h1>
          <p className="text-xl text-light mb-8">{templeInfo.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <a className="bg-maroon text-white px-8 py-3 rounded-md hover:bg-red-800 transition duration-300 text-lg">
                Our Services
              </a>
            </Link>
            <Link href="/about">
              <a className="bg-gold text-dark px-8 py-3 rounded-md hover:bg-yellow-500 transition duration-300 text-lg">
                Learn More
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
