
import AlbumCard from "./AlbumCard";
import CarouselComponent from "./Carousel";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";

interface Album {
  id: string;
  title: string;
  description: string;
  follows: number;
  image: string;
  slug: string;
  songs: any[];
}

interface AlbumSectionProps {
  title: string;
  apiEndpoint: string;
}

const AlbumSection = ({ title, apiEndpoint }: AlbumSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setAlbums(response.data);
      } catch (error) {
        console.error(`Error fetching albums from ${apiEndpoint}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [apiEndpoint]);

  if (loading) {
    return (
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="bg-qtify-darkCard rounded-lg p-3 animate-pulse">
                <div className="aspect-square mb-3 rounded-lg bg-gray-700"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const albumCards = albums.map((album) => (
    <AlbumCard
      key={album.id}
      image={album.image}
      title={album.title}
      follows={album.follows.toString()}
    />
  ));

  return (
    <section className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <Button
            variant="outline"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="border-qtify-green text-qtify-green hover:bg-qtify-green hover:text-qtify-dark transition-colors"
          >
            {isCollapsed ? "Show all" : "Collapse"}
          </Button>
        </div>
        
        {isCollapsed ? (
          <CarouselComponent>
            {albumCards}
          </CarouselComponent>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 transition-all duration-300">
            {albumCards}
          </div>
        )}
      </div>
    </section>
  );
};

export default AlbumSection;
