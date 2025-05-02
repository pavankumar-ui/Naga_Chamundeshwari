import { Link } from "wouter";
import { Service } from "@shared/schema";
import ServiceCard from "@/components/services/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedServicesProps {
  services?: Service[];
  isLoading: boolean;
}

const FeaturedServices = ({ services, isLoading }: FeaturedServicesProps) => {
  // Create skeleton array for loading state
  const skeletonServices = Array(3).fill(0);
  
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Temple Services</h2>
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
              <ServiceCard key={service.id} service={service} />
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/services">
            <a className="inline-block primary-btn">View All Services</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
