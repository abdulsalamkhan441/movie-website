export function getPlexSearchUrl(movieTitle) {
  const encoded = encodeURIComponent(movieTitle);
  return `https://watch.plex.tv/search?q=${encoded}`;
}
