import { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../api/tmdb';

export default function Home() {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query) => {
    const res = await searchMovies(query);
    setMovies(res.data.results);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      
      {movies.length === 0 && <Header />}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
