import { useQuery } from "@tanstack/react-query";
import EventCard from "@/components/events/EventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { CalendarIcon, Gift, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { DonationForm } from "@/components/donation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Events = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["/api/events"],
  });
  
  // Create skeleton array for loading state
  const skeletonEvents = Array(4).fill(0);
  
  // State for managing donation dialog
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Our highlight events - the 3 major temple celebrations
  const highlightEvents = [
    {
      id: 1,
      title: "Dasara Festival",
      duration: "10 Days",
      time: "Daily celebrations with special evening rituals",
      description: "Our grandest celebration honoring Goddess Chamundeshwari with continuous ceremonies, cultural programs, and processions throughout the 10-day period.",
      donationInfo: "Devotees traditionally make special offerings during this auspicious period for prosperity and divine blessings."
    },
    {
      id: 2,
      title: "Maha Shivarathri",
      duration: "3 Days",
      time: "Round-the-clock ceremonies with night vigil",
      description: "A sacred celebration dedicated to Lord Shiva with continuous prayers, special abhishekams, and spiritual activities throughout three consecutive days and nights.",
      donationInfo: "Offerings made during this festival carry special spiritual significance and support the elaborate arrangements for this major event."
    },
    {
      id: 3,
      title: "Naga Chamundeshwari Birthday",
      duration: "Special Day",
      time: "Prathangira Homam: 7:45 PM - 8:30 PM",
      description: "Celebration of our temple deity's birthday with grand processions, cultural events, and the auspicious Prathangira Homam ritual in the evening.",
      donationInfo: "This is one of the most auspicious times for devotees to make offerings, with donations supporting the special ceremonies and receiving unique blessings."
    }
  ];
  
  // Handler for opening donation dialog
  const handleDonationClick = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
    setIsDialogOpen(true);
  };
  
  return (
    <>
      <Helmet>
        <title>Events - Naga Chamundeshwari Devasthana</title>
        <meta name="description" content="Upcoming temple events and festivals at Naga Chamundeshwari Devasthana in Puttenahalli, J.P Nagar, Bangalore." />
      </Helmet>
      
      {/* Featured Major Celebrations Section */}
      <section className="pt-8 pb-12 bg-cream temple-decor">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="section-title">Major Temple Celebrations</h1>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Our temple is renowned for these special annual celebrations that attract devotees from all over
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {highlightEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-maroon/20 relative">
                <div className="absolute top-4 right-4 bg-maroon text-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.duration}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-cinzel font-bold text-maroon mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-maroon" />
                    {event.time}
                  </p>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  
                  <div className="bg-cream/50 p-3 rounded-md border border-maroon/10 mb-4">
                    <div className="flex items-start">
                      <Gift className="h-5 w-5 text-maroon mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{event.donationInfo}</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-maroon hover:bg-maroon/80"
                    onClick={() => handleDonationClick(event.title)}
                  >
                    Make an Offering
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-700 italic mb-4">
              "The devotee's offerings during these sacred celebrations are considered especially auspicious and carry deep spiritual significance."
            </p>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-12 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title">Upcoming Temple Events</h2>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Join us for these auspicious celebrations and festivals at the temple
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              skeletonEvents.map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
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
              Array.isArray(events) ? events.map((event) => (
                <EventCard key={event.id} event={event} />
              )) : null
            )}
          </div>
        </div>
      </section>
      
      {/* Annual Calendar Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Annual Temple Calendar</h2>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Major festivals and events celebrated at our temple throughout the year
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
                
                <div className="bg-maroon/5 p-4 rounded-lg shadow-md border-l-4 border-maroon">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-maroon">Maha Shivaratri</h4>
                    <span className="text-sm text-maroon/80 font-medium">3-Day Celebration</span>
                  </div>
                  <p className="text-sm text-gray-700">Three-day sacred celebration with continuous prayers, special abhishekams, and night-long vigil dedicated to Lord Shiva.</p>
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
                
                <div className="bg-maroon/5 p-4 rounded-lg shadow-md border-l-4 border-maroon">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-maroon">Naga Chamundeshwari Birthday</h4>
                    <span className="text-sm text-maroon/80 font-medium">August 15</span>
                  </div>
                  <p className="text-sm text-gray-700">Special celebration of our temple deity's birthday with grand processions and Prathangira Homam ritual (7:45 PM - 8:30 PM).</p>
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
                <div className="bg-maroon/5 p-4 rounded-lg shadow-md border-l-4 border-maroon">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-maroon">Dasara Festival</h4>
                    <span className="text-sm text-maroon/80 font-medium">10-Day Celebration</span>
                  </div>
                  <p className="text-sm text-gray-700">Our grandest 10-day celebration honoring Goddess Chamundeshwari with special rituals, cultural programs, and processions.</p>
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
                    <h4 className="font-medium">Kartika Deepam</h4>
                    <span className="text-sm text-gray-500">November/December</span>
                  </div>
                  <p className="text-sm text-gray-600">Month-long lighting of lamps with special evening aartis and devotional music.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Special Offerings CTA */}
      <section className="py-12 bg-maroon/10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-cinzel font-bold text-maroon mb-4">Special Event Donations</h2>
            <p className="text-gray-700 mb-6">
              During these important celebrations, devotees traditionally offer donations for the special arrangements and to receive divine blessings. Your contributions help maintain the grandeur of these sacred events and support the temple's activities.
            </p>
            <Button 
              className="bg-maroon hover:bg-maroon/80 text-lg px-8 py-6"
              onClick={() => handleDonationClick("Festival Donation")}
            >
              Make a Festival Donation
            </Button>
          </div>
        </div>
      </section>
      {/* Donation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-cinzel text-maroon">
              {selectedEvent} Offering
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to make your offering for {selectedEvent}.
            </DialogDescription>
          </DialogHeader>
          
          <DonationForm 
            donationType="event"
            defaultPurpose={selectedEvent || ""}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Events;
