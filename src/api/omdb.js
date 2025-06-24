import axios from 'axios';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_KEY;

export const getOMDBRating = (title) =>
  axios.get(`https://www.omdbapi.com/`, {
    params: {
      apikey: OMDB_API_KEY,
      t: title,
    },
  });
