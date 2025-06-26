
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AlbumSection from "@/components/AlbumSection";
import SongsSection from "@/components/SongsSection";
import FAQSection from "@/components/FAQSection";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(true);

  return (
    <div className="min-h-screen bg-qtify-dark">
      <Navbar />
      <HeroSection />
      <AlbumSection 
        title="Top Albums" 
        apiEndpoint="https://qtify-backend-labs.crio.do/albums/top" 
      />
      <AlbumSection 
        title="New Albums" 
        apiEndpoint="https://qtify-backend-labs.crio.do/albums/new" 
      />
      <SongsSection />
      <FAQSection />
      
      <MusicPlayer 
        isVisible={isMusicPlayerVisible}
        songName="Sample Song"
        albumName="Sample Album"
      />
    </div>
  );
};

export default Index;
