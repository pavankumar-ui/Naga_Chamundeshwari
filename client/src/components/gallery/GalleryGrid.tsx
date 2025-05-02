import { Gallery } from "@shared/schema";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface GalleryGridProps {
  galleryItems?: Gallery[];
  isLoading: boolean;
}

const GalleryGrid = ({ galleryItems, isLoading }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);
  
  // Create skeleton array for loading state
  const skeletonItems = Array(8).fill(0);
  
  const openLightbox = (image: Gallery) => {
    setSelectedImage(image);
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
  };
  
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          skeletonItems.map((_, index) => (
            <div key={index} className="block overflow-hidden rounded-lg shadow-md">
              <Skeleton className="w-full h-48" />
            </div>
          ))
        ) : (
          galleryItems?.map((item) => (
            <div 
              key={item.id} 
              className="block overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => openLightbox(item)}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-48 object-cover transition duration-300 hover:scale-110" 
              />
            </div>
          ))
        )}
      </div>
      
      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div 
            className="max-w-4xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.imageUrl} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button 
              className="absolute top-3 right-3 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center"
              onClick={closeLightbox}
            >
              ✕
            </button>
            <div className="bg-white p-3 mt-2 rounded">
              <h3 className="font-cinzel text-lg font-medium text-maroon">{selectedImage.title}</h3>
              <p className="text-sm text-gray-600">Category: {selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
