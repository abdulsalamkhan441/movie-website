import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_KEY;
const TMDB_BASE = 'https://api.themoviedb.org/3';

export const searchMovies = (query) =>
  axios.get(`${TMDB_BASE}/search/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      query,
    },
  });

export function getMovieDetails(id) {
  return axios.get(`${TMDB_BASE}/movie/${id}`, {
    params: {
      api_key: TMDB_API_KEY,
      append_to_response: 'credits,release_dates,watch/providers,videos',
    },
  });
}
