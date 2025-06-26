
import SongCard from "./SongCard";
import CarouselComponent from "./Carousel";
import { useState, useEffect } from "react";
import axios from "axios";

interface Song {
  id: string;
  title: string;
  artists: string[];
  genre: {
    key: string;
    label: string;
  };
  likes: number;
  image: string;
  durationInMs: number;
}

const SongsSection = () => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [songs, setSongs] = useState<Song[]>([]);
  const [genres, setGenres] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("https://qtify-backend-labs.crio.do/songs");
        const songsData: Song[] = response.data;
        setSongs(songsData);
        
        // Extract unique genres with proper typing
        const uniqueGenres: string[] = ["All", ...new Set(songsData.map((song: Song) => song.genre.label))];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const filteredSongs = activeGenre === "All" 
    ? songs 
    : songs.filter(song => song.genre.label === activeGenre);

  if (loading) {
    return (
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Songs</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="bg-qtify-white rounded-lg p-3 animate-pulse">
                <div className="aspect-square mb-3 rounded-lg bg-gray-300"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const songCards = filteredSongs.map((song) => (
    <SongCard
      key={song.id}
      image={song.image}
      title={song.title}
      likes={song.likes.toString()}
    />
  ));

  return (
    <section className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Songs</h2>
        </div>
        
        <div className="flex gap-4 mb-6">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeGenre === genre
                  ? "bg-qtify-green text-qtify-dark"
                  : "bg-qtify-darkCard text-white hover:bg-qtify-green hover:text-qtify-dark"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        
        <CarouselComponent>
          {songCards}
        </CarouselComponent>
      </div>
    </section>
  );
};

export default SongsSection;
