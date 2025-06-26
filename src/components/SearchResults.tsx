
import React from 'react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  follows: number;
  image: string;
  slug: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isVisible: boolean;
  onClose: () => void;
}

const SearchResults = ({ results, isVisible, onClose }: SearchResultsProps) => {
  if (!isVisible || results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-qtify-darkCard rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
      {results.map((result) => (
        <div key={result.id} className="flex items-center gap-4 p-4 hover:bg-qtify-dark transition-colors cursor-pointer border-b border-gray-700 last:border-b-0">
          <img 
            src={result.image} 
            alt={result.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="flex-1">
            <h3 className="text-white font-medium text-sm">{result.title}</h3>
            <p className="text-qtify-gray text-xs">{result.description}</p>
          </div>
          <div className="text-white text-sm font-medium">
            {result.follows.toLocaleString()} Follows
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
