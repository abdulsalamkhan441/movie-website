export function getTubiSearchUrl(movieTitle) {
  const encodedTitle = encodeURIComponent(movieTitle);
  return `https://tubitv.com/search/${encodedTitle}`;
}
