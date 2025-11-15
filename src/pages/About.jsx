export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About TheCinePrism</h1>

      <div className="prose">
        <p className="mb-4 text-lg">
          Welcome to TheCinePrism, your ultimate destination for discovering and
          exploring the world of cinema.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Our Mission</h2>
        <p className="mb-4">
          At TheCinePrism, we're passionate about movies and dedicated to
          helping film enthusiasts discover their next favorite film. We provide
          comprehensive information about movies from around the world,
          including plot summaries, cast details, ratings, and reviews.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">What We Offer</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Extensive movie database with detailed information</li>
          <li>Latest movie news and updates</li>
          <li>Curated lists and recommendations</li>
          <li>User-friendly interface for easy browsing</li>
          <li>Regular updates with new releases</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Our Team</h2>
        <p className="mb-4">
          TheCinePrism is run by a team of movie enthusiasts who believe in the
          power of storytelling through cinema. We work hard to bring you the
          most accurate and up-to-date information about the films you love.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Data Source</h2>
        <p className="mb-4">
          We use The Movie Database (TMDB) API to provide accurate and
          comprehensive movie information. All movie data, images, and related
          content are sourced from TMDB.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p className="mb-4">
          Have questions or suggestions? We'd love to hear from you! Visit our
          <a href="/contact" className="text-blue-600 underline ml-1">
            Contact page
          </a>
          to get in touch.
        </p>
      </div>
    </div>
  );
}
    