import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { Gallery as GalleryType } from "@shared/schema";

const Gallery = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const { data: galleryItems, isLoading } = useQuery({
    queryKey: ["/api/gallery"],
    queryFn: async () => {
      const response = await fetch("/api/gallery");
      if (!response.ok) {
        throw new Error("Failed to fetch gallery items");
      }
      return response.json();
    },
  });
  
  const filteredItems = useMemo(() => {
    if (!galleryItems) return [];
    if (filter === "all") return galleryItems;
    return galleryItems.filter((item: GalleryType) => item.category === filter);
  }, [galleryItems, filter]);
  
  return (
    <>
      <Helmet>
        <title>Gallery - Naga Chamundeshwari Temple</title>
        <meta name="description" content="View stunning images of Naga Chamundeshwari Temple's architecture, rituals, and events." />
      </Helmet>
      
      <section className="pt-8 pb-16 temple-decor">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="section-title">Temple Gallery</h1>
            <div className="section-divider"></div>
            <p className="text-dark max-w-3xl mx-auto">
              Glimpses of our temple architecture, festivals, and divine moments.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button 
              variant={filter === "all" ? "default" : "outline"}
              className={filter === "all" ? "bg-maroon hover:bg-red-800" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={filter === "architecture" ? "default" : "outline"}
              className={filter === "architecture" ? "bg-maroon hover:bg-red-800" : ""}
              onClick={() => setFilter("architecture")}
            >
              Architecture
            </Button>
            <Button 
              variant={filter === "festival" ? "default" : "outline"}
              className={filter === "festival" ? "bg-maroon hover:bg-red-800" : ""}
              onClick={() => setFilter("festival")}
            >
              Festivals
            </Button>
            <Button 
              variant={filter === "ritual" ? "default" : "outline"}
              className={filter === "ritual" ? "bg-maroon hover:bg-red-800" : ""}
              onClick={() => setFilter("ritual")}
            >
              Rituals
            </Button>
            <Button 
              variant={filter === "deity" ? "default" : "outline"}
              className={filter === "deity" ? "bg-maroon hover:bg-red-800" : ""}
              onClick={() => setFilter("deity")}
            >
              Deities
            </Button>
            <Button 
              variant={filter === "event" ? "default" : "outline"}
              className={filter === "event" ? "bg-maroon hover:bg-red-800" : ""}
              onClick={() => setFilter("event")}
            >
              Events
            </Button>
          </div>
          
          <GalleryGrid galleryItems={filteredItems} isLoading={isLoading} />
        </div>
      </section>
    </>
  );
};

export default Gallery;
