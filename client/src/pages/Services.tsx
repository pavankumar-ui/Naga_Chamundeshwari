import { useQuery } from "@tanstack/react-query";
import ServiceCard from "@/components/services/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Service } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DonationForm } from "@/components/donation/DonationForm";

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const response = await fetch("/api/services");
      if (!response.ok) throw new Error("Failed to fetch services");
      return response.json();
    },
  });

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };
  
  // Create skeleton array for loading state
  const skeletonServices = Array(6).fill(0);
  
  return (
    <>
      <Helmet>
        <title>Services - Naga Chamundeshwari Temple</title>
        <meta name="description" content="Explore the various religious services and rituals offered at Naga Chamundeshwari Temple." />
      </Helmet>
      
      <section className="pt-8 pb-16 temple-decor">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="section-title">Temple Services</h1>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              We offer various religious services and rituals to help devotees connect with the divine and seek blessings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              skeletonServices.map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              services?.map((service) => (
                <ServiceCard key={service.id} service={service} onBookService={handleBookService} />
              ))
            )}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Booking Information</h2>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Here's how you can book our temple services for your spiritual needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">How to Book</h3>
              <ul className="space-y-2 text-dark">
                <li>• Visit the temple office during operating hours</li>
                <li>• Call our temple office at +91 98765 43210</li>
                <li>• Email your request to info@nagachamundeshwari.org</li>
                <li>• Book online through our website (coming soon)</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">Required Information</h3>
              <ul className="space-y-2 text-dark">
                <li>• Full name of the devotee(s)</li>
                <li>• Service type and preferred date/time</li>
                <li>• Contact number and email</li>
                <li>• Gothra and Nakshatra (for certain rituals)</li>
                <li>• Purpose of the pooja/ritual</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-cinzel font-semibold text-maroon mb-3">Important Notes</h3>
              <ul className="space-y-2 text-dark">
                <li>• Advance booking recommended (min. 3 days)</li>
                <li>• Special dates require earlier bookings</li>
                <li>• Temple provides all pooja materials</li>
                <li>• Prasadam will be provided after service</li>
                <li>• Photography permitted in designated areas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Booking Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-cinzel text-maroon">
              Book {selectedService?.name}
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to book this temple service. Payment will be processed securely.
            </DialogDescription>
          </DialogHeader>
          
          {selectedService && (
            <DonationForm
              donationType="pooja"
              defaultPurpose={selectedService.name}
              serviceId={selectedService.id}
              serviceName={selectedService.name}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Services;
