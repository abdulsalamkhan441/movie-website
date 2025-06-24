import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const colors = {
    dark: "#19171b",
    gold: "#9c8123",
    brownDark: "#2f2921",
    brownLight: "#563a17",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full flex justify-center my-6 md:my-8 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-2xl relative"
      >
        <div className={`flex items-center transition-all duration-300 ${isFocused ? 'ring-2' : ''} rounded-full overflow-hidden`}
          style={{
            backgroundColor: colors.brownDark,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            ringColor: colors.gold,
          }}
        >
          <input
            className="flex-1 py-3 px-5 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              color: colors.gold,
            }}
          />
          <button
            type="submit"
            className="h-full px-6 py-3 font-medium transition-colors duration-300"
            style={{
              backgroundColor: colors.brownLight,
              color: colors.gold,
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </div>
          </button>
        </div>
        
      </form>
    </div>
  );
}