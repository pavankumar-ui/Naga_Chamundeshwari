import { useQuery } from "@tanstack/react-query";
import EventCard from "@/components/events/EventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";

const Events = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["/api/events"],
  });
  
  // Create skeleton array for loading state
  const skeletonEvents = Array(4).fill(0);
  
  return (
    <>
      <Helmet>
        <title>Events - Naga Chamundeshwari Temple</title>
        <meta name="description" content="Upcoming temple events and festivals at Naga Chamundeshwari Temple." />
      </Helmet>
      
      <section className="pt-8 pb-16 temple-decor">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="section-title">Upcoming Temple Events</h1>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Join us for these auspicious celebrations and festivals at the temple.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              skeletonEvents.map((_, index) => (
                <div key={index} className="bg-light rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <div className="relative">
                    <Skeleton className="w-full h-48" />
                    <div className="absolute top-4 left-4">
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              ))
            ) : (
              events?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Annual Temple Calendar</h2>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Major festivals and events celebrated at our temple throughout the year.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-4">January - March</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Makara Sankranti</h4>
                    <span className="text-sm text-gray-500">January 14</span>
                  </div>
                  <p className="text-sm text-gray-600">Harvest festival with special poojas and distribution of tilgul (sesame and jaggery sweets).</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Maha Shivaratri</h4>
                    <span className="text-sm text-gray-500">February/March</span>
                  </div>
                  <p className="text-sm text-gray-600">Night-long vigil with special abhishekams and bhajans dedicated to Lord Shiva.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Holi</h4>
                    <span className="text-sm text-gray-500">March</span>
                  </div>
                  <p className="text-sm text-gray-600">Festival of colors with special poojas and cultural performances.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-4">April - June</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Rama Navami</h4>
                    <span className="text-sm text-gray-500">April</span>
                  </div>
                  <p className="text-sm text-gray-600">Celebration of Lord Rama's birth with special poojas and recitation of Ramayana.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Akshaya Tritiya</h4>
                    <span className="text-sm text-gray-500">April/May</span>
                  </div>
                  <p className="text-sm text-gray-600">Auspicious day for new beginnings with special homams and charity events.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Temple Anniversary</h4>
                    <span className="text-sm text-gray-500">June 15</span>
                  </div>
                  <p className="text-sm text-gray-600">Grand celebration marking the temple's foundation day with special rituals and cultural programs.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-4">July - September</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Guru Purnima</h4>
                    <span className="text-sm text-gray-500">July</span>
                  </div>
                  <p className="text-sm text-gray-600">Honoring spiritual teachers with special poojas and discourses.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Krishna Janmashtami</h4>
                    <span className="text-sm text-gray-500">August</span>
                  </div>
                  <p className="text-sm text-gray-600">Celebrating Lord Krishna's birth with bhajans, dahi handi, and midnight aarti.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Ganesh Chaturthi</h4>
                    <span className="text-sm text-gray-500">August/September</span>
                  </div>
                  <p className="text-sm text-gray-600">Ten-day festival honoring Lord Ganesha with special poojas and cultural events.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-4">October - December</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Navratri</h4>
                    <span className="text-sm text-gray-500">October</span>
                  </div>
                  <p className="text-sm text-gray-600">Nine-day festival dedicated to Goddess Durga with special poojas and cultural performances.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Diwali</h4>
                    <span className="text-sm text-gray-500">October/November</span>
                  </div>
                  <p className="text-sm text-gray-600">Festival of lights with temple illumination, special Lakshmi pooja, and cultural program.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Chamundeshwari Jayanti</h4>
                    <span className="text-sm text-gray-500">December 10</span>
                  </div>
                  <p className="text-sm text-gray-600">Special celebration of the temple deity with grand procession and cultural events.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
