import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@shared/schema";
import { Link } from "wouter";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={service.imageUrl} 
          alt={service.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-cinzel font-semibold text-maroon mb-2">{service.name}</h3>
        <p className="text-dark mb-4 flex-grow">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-gold font-semibold">{service.price}</span>
          <Link href={`/services/${service.id}`}>
            <a className="text-maroon hover:text-red-800 font-medium">Book Now →</a>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
