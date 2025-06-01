import { Link } from "wouter";
import HeroSection from "@/components/home/HeroSection";
import TempleTimings from "@/components/home/TempleTimings";
import FeaturedServices from "@/components/home/FeaturedServices";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import { Card, CardContent } from "@/components/ui/card";
import { Landmark, Scale, Lightbulb } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { templeInfo } from "@/lib/data";

const Home = () => {
  const { data: galleryItems, isLoading: galleryLoading } = useQuery({
    queryKey: ["/api/gallery"],
    queryFn: async () => {
      const response = await fetch("/api/gallery");
      if (!response.ok) throw new Error("Failed to fetch gallery");
      return response.json();
    },
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const response = await fetch("/api/services");
      if (!response.ok) throw new Error("Failed to fetch services");
      return response.json();
    },
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const response = await fetch("/api/events");
      if (!response.ok) throw new Error("Failed to fetch events");
      return response.json();
    },
  });

  return (
    <div>
      <HeroSection />
      <TempleTimings />
      
      {/* About Section Preview */}
      <section className="py-16 temple-decor">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">About The Temple</h2>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Discover the rich history and spiritual significance of the Naga Chamundeshwari Temple, 
              a sacred place of worship for generations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-cinzel font-semibold text-maroon mb-4">Our Divine History</h3>
              <p className="text-dark mb-4">
                The Naga Chamundeshwari Temple dates back to the 12th century and is dedicated to Goddess Chamundeshwari, 
                a fierce form of Shakti. The temple represents a beautiful blend of Dravidian and Hoysala architectural styles.
              </p>
              <p className="text-dark mb-6">
                Legend has it that the temple was established after a local ruler had a divine vision of the Goddess, 
                who instructed him to build a shrine at this very location.
              </p>
              <Link href="/about">
                <a className="inline-block primary-btn">Read Full History</a>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src={templeInfo.aboutImage} 
                alt="Temple Historical Image" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card className="bg-light shadow-md">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center text-white mb-4">
                  <Landmark size={24} />
                </div>
                <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">Spiritual Significance</h3>
                <p className="text-dark">
                  The temple is believed to fulfill wishes of devotees who worship here with pure devotion and faith. 
                  It is known for its powerful spiritual energy.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-light shadow-md">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center text-white mb-4">
                  <Scale size={24} />
                </div>
                <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">Architecture</h3>
                <p className="text-dark">
                  The temple showcases exquisite stone carvings, intricate pillars, and traditional sanctum design 
                  following ancient Vastu principles.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-light shadow-md">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center text-white mb-4">
                  <Lightbulb size={24} />
                </div>
                <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">Divine Blessings</h3>
                <p className="text-dark">
                  Devotees visit seeking blessings for prosperity, health, marriage, children, and removal of obstacles 
                  in their life journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Services */}
      <FeaturedServices 
        services={services?.slice(0, 3)} 
        isLoading={servicesLoading} 
      />
      
      {/* Featured Events */}
      <FeaturedEvents 
        events={events?.slice(0, 3)} 
        isLoading={eventsLoading} 
      />
      
      {/* Gallery Preview */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Temple Gallery</h2>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Glimpses of our temple architecture, festivals, and divine moments.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-lg">
                  <Skeleton className="w-full h-48" />
                </div>
              ))
            ) : (
              galleryItems?.slice(0, 4).map((item) => (
                <div key={item.id} className="overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-48 object-cover transition duration-300 hover:scale-110"
                  />
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/gallery">
              <a className="inline-block primary-btn">View Full Gallery</a>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Donation CTA */}
      <section 
        className="relative py-16 text-white bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/attached_assets/festival2.jpg')`
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-3 drop-shadow-lg">Support Our Temple</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="mb-8 drop-shadow-md text-lg">
              Your generous donations help us maintain the temple, conduct regular rituals, organize festivals, 
              and support charitable activities. Join us in preserving our sacred traditions.
            </p>
            
            <Link href="/donation">
              <a className="inline-block bg-gold text-dark px-8 py-3 rounded-md hover:bg-yellow-500 transition duration-300 text-lg font-medium shadow-lg">
                Donate Now
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
