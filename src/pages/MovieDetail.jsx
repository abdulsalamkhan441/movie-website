import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/tmdb";
import { getOMDBRating } from "../api/omdb";
import { getTubiSearchUrl } from "../utils/tubi";
import { getPlexSearchUrl } from "../utils/plex";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);

  const colors = {
    dark: "#19171b",
    gold: "#9c8123",
    brownDark: "#2f2921",
    brownLight: "#563a17",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getMovieDetails(id);
        setMovie(res.data);

        const omdb = await getOMDBRating(res.data.title);
        setRating(omdb.data.imdbRating);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: colors.dark }}>
        <div className="text-2xl" style={{ color: colors.gold }}>Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: colors.dark }}>
        <div className="text-2xl text-white">Movie not found</div>
      </div>
    );
  }

  const director = movie.credits.crew.find((c) => c.job === "Director");
  const topCast = movie.credits.cast.slice(0, 6);
  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: colors.dark,
        backgroundImage: movie.backdrop_path 
          ? `linear-gradient(to bottom, rgba(25, 23, 27, 0.7), rgba(25, 23, 27, 1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 bg-black bg-opacity-80 p-6 rounded-lg">
          <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Poster"
              }
              alt={movie.title}
              className="w-full rounded-lg shadow-lg mb-4"
            />
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: colors.brownDark }}>
              <div className="mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.gold }}>Release Date</h3>
                <p className="text-white">{movie.release_date || "N/A"}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.gold }}>Runtime</h3>
                <p className="text-white">{movie.runtime ? `${movie.runtime} min` : "N/A"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.gold }}>Ratings</h3>
                <p className="text-white">
                  TMDB: {movie.vote_average?.toFixed(1) || "N/A"} | IMDb: {rating || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 text-white">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.gold }}>{movie.title}</h1>
              {movie.tagline && (
                <p className="text-lg italic mb-4 text-gray-300">"{movie.tagline}"</p>
              )}
              
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: colors.brownLight, color: "white" }}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2" style={{ color: colors.gold }}>Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview || "No overview available."}</p>
            </div>

            <div className="mb-8">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2" style={{ color: colors.gold }}>Director</h2>
                <p className="text-gray-300">{director?.name || "Unknown"}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2" style={{ color: colors.gold }}>Top Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {topCast.map((actor) => (
                    <div key={actor.id} className="text-center">
                      <div className="w-full aspect-square rounded-full overflow-hidden mb-2 mx-auto border-2" style={{ borderColor: colors.gold }}>
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                              : `https://ui-avatars.com/api/?name=${actor.name}&background=${colors.brownLight.replace('#', '')}&color=${colors.gold.replace('#', '')}`
                          }
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium">{actor.name}</p>
                      <p className="text-xs text-gray-400">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {trailer && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4" style={{ color: colors.gold }}>Trailer</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-64 sm:h-80 md:h-96 rounded-lg"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4" style={{ color: colors.gold }}>Where to Watch</h2>
              
              {movie["watch/providers"]?.results?.IN?.flatrate && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 text-gray-300">Streaming Services</h3>
                  <div className="flex flex-wrap gap-4">
                    {movie["watch/providers"].results.IN.flatrate.map((provider) => (
                      <div key={provider.provider_id} className="text-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-white p-1">
                          <img
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="text-xs mt-1 text-gray-300">{provider.provider_name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <a
                  href={getTubiSearchUrl(movie.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded transition duration-200"
                  style={{ backgroundColor: colors.brownLight, color: colors.gold }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  Search on Tubi
                </a>
                
                <a
                  href={getPlexSearchUrl(movie.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded transition duration-200"
                  style={{ backgroundColor: colors.brownLight, color: colors.gold }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  Search on Plex
                </a>
                
                {movie.title && (
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " full movie")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded transition duration-200"
                    style={{ backgroundColor: colors.brownLight, color: colors.gold }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                    Search on YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}