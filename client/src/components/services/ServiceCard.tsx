import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  service: Service;
  onBookService: (service: Service) => void;
}

const ServiceCard = ({ service, onBookService }: ServiceCardProps) => {
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
          <Button 
            onClick={() => onBookService(service)}
            variant="outline"
            className="text-maroon border-maroon hover:bg-maroon hover:text-white"
          >
            Book Now →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
