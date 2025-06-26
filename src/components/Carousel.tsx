
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselComponentProps {
  children: React.ReactNode[];
}

const CarouselComponent = ({ children }: CarouselComponentProps) => {
  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {children.map((child, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/7">
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-qtify-green text-qtify-green hover:bg-qtify-green hover:text-qtify-dark" />
        <CarouselNext className="border-qtify-green text-qtify-green hover:bg-qtify-green hover:text-qtify-dark" />
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
