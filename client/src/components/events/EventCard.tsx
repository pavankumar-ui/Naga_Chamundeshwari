import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@shared/schema";
import { Link } from "wouter";
import { Clock } from "lucide-react";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="bg-light rounded-lg shadow-md overflow-hidden border border-gray-200 h-full flex flex-col">
      <div className="relative overflow-hidden h-96 flex items-center justify-center bg-black">
        <img 
          src={event.imageUrl} 
          alt={event.name} 
          className="h-[120%] w-auto max-w-none object-contain rotate-90"
        />
        <div className="absolute top-4 left-4 bg-maroon text-white py-1 px-3 rounded-md z-10">
          <span className="text-sm font-medium">{event.date}</span>
        </div>
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-cinzel font-semibold text-maroon mb-2">{event.name}</h3>
        <p className="text-dark mb-4 flex-grow">{event.description}</p>
        <div className="flex items-center text-gray-600 mb-4">
          <Clock size={16} className="mr-2" />
          <span>{event.time}</span>
        </div>
        <Link href={`/events/${event.id}`}>
          <a className="inline-block bg-gold text-dark px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-300">
            Event Details
          </a>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EventCard;
