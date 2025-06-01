import { Link } from "wouter";
import { templeInfo } from "@/lib/data";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[700px] flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/attached_assets/Homepage_image.jpg')`
      }}
    >
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-cinzel mb-6 drop-shadow-lg">
            Welcome to Naga Chamundeshwari Devasthana
          </h1>
          <p className="text-xl md:text-2xl text-light mb-8 drop-shadow-md">{templeInfo.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <a className="bg-maroon text-white px-8 py-3 rounded-md hover:bg-red-800 transition duration-300 text-lg shadow-lg">
                Our Services
              </a>
            </Link>
            <Link href="/about">
              <a className="bg-gold text-dark px-8 py-3 rounded-md hover:bg-yellow-500 transition duration-300 text-lg shadow-lg">
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
