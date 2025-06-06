export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-nexora-gray-light p-6 rounded-lg">
      <h1 className="text-6xl font-extrabold text-nexora-accent mb-4 select-none">
        404
      </h1>
      <p className="text-nexora-text text-lg md:text-xl max-w-md text-center">
        Sorry, the page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-nexora-accent text-white font-semibold rounded-lg shadow-md hover:bg-nexora-accent/90 transition"
      >
        Go to Home
      </a>
    </div>
  );
};
