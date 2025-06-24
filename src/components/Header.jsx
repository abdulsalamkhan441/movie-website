import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const colors = {
    dark: "#19171b",
    gold: "#9c8123",
    brownDark: "#2f2921",
    brownLight: "#563a17",
  };

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_KEY,
              language: "en-US",
              page: 1,
            },
          }
        );
        setPopularMovies(response.data.results); // <-- set movies
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      } finally {
        setLoading(false); // <-- stop loading
      }
    };
    fetchPopularMovies();
  }, []);

  if (loading) {
    return (
      <header
        className="w-full p-8 flex justify-center items-center"
        style={{ backgroundColor: colors.dark }}
      >
        <div className="text-xl" style={{ color: colors.gold }}>
          Loading popular movies...
        </div>
      </header>
    );
  }

  return (
    <header
      className="w-full p-4 md:p-8"
      style={{ backgroundColor: colors.dark }}
    >
      <div className="container mx-auto">
        <div className="mb-6 md:mb-8 text-center">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 uppercase tracking-wider"
            style={{ color: colors.gold }}
          >
            It's Time For Some Entertainment
          </h1>
          <div
            className="w-32 h-1 mx-auto mb-4"
            style={{ backgroundColor: colors.brownLight }}
          ></div>
          <h2
            className="text-xl md:text-2xl font-semibold"
            style={{ color: colors.gold }}
          >
            Popular Movies This Week
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {popularMovies.slice(0, 50).map((movie) => (
            <div
              key={movie.id}
              className="transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <div
                className="relative rounded-lg overflow-hidden shadow-lg h-full"
                style={{ backgroundColor: colors.brownDark }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Poster"
                  }
                  alt={movie.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="p-3">
                  <h3
                    className="text-sm md:text-base font-semibold truncate"
                    style={{ color: colors.gold }}
                  >
                    {movie.title}
                  </h3>
                  <div className="flex items-center mt-1">
                    <svg
                      className="w-4 h-4"
                      fill={colors.gold}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span
                      className="text-xs ml-1"
                      style={{ color: colors.gold }}
                    >
                      {movie.vote_average?.toFixed(1)}
                    </span>
                    <span className="text-xs ml-2 text-gray-400">
                      {movie.release_date?.substring(0, 4)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
