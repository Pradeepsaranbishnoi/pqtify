
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import SearchResults from "./SearchResults";
import FeedbackModal from "./FeedbackModal";
import axios from "axios";

interface Album {
  id: string;
  title: string;
  description: string;
  follows: number;
  image: string;
  slug: string;
}

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Album[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [allAlbums, setAllAlbums] = useState<Album[]>([]);

  useEffect(() => {
    // Fetch all albums for search
    const fetchAlbums = async () => {
      try {
        const [topAlbums, newAlbums] = await Promise.all([
          axios.get('https://qtify-backend-labs.crio.do/albums/top'),
          axios.get('https://qtify-backend-labs.crio.do/albums/new')
        ]);
        setAllAlbums([...topAlbums.data, ...newAlbums.data]);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = allAlbums.filter(album =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filtered.slice(0, 5)); // Limit to 5 results
    setShowResults(true);
  }, [searchQuery, allAlbums]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim() !== '') {
      setShowResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <>
      <nav className="bg-qtify-green py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          
          <div className="flex-1 max-w-md mx-8 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search a album of your choice"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full py-2 px-4 rounded-lg bg-white text-qtify-dark placeholder-qtify-gray border-none outline-none"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-qtify-gray hover:text-qtify-dark">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            <SearchResults 
              results={searchResults}
              isVisible={showResults}
              onClose={() => setShowResults(false)}
            />
          </div>
          
          <Button 
            variant="outline" 
            className="bg-transparent border-qtify-dark text-qtify-dark hover:bg-qtify-dark hover:text-qtify-green transition-colors"
            onClick={() => setIsFeedbackOpen(true)}
          >
            Give Feedback
          </Button>
        </div>
      </nav>

      <FeedbackModal 
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </>
  );
};

export default Navbar;
