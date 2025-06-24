export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Go to Home
      </a>
    </div>
  );
}
