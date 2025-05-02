import { Link } from "wouter";
import { Event } from "@shared/schema";
import EventCard from "@/components/events/EventCard";
import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedEventsProps {
  events?: Event[];
  isLoading: boolean;
}

const FeaturedEvents = ({ events, isLoading }: FeaturedEventsProps) => {
  // Create skeleton array for loading state
  const skeletonEvents = Array(3).fill(0);
  
  return (
    <section id="events" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Upcoming Temple Events</h2>
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
        
        <div className="text-center mt-12">
          <Link href="/events">
            <a className="inline-block primary-btn">View All Events</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
