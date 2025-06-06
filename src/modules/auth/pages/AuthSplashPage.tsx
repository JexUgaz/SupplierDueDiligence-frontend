const AuthSplashPage = () => (
  <div
    className="flex flex-col justify-center items-center min-h-screen w-full"
    style={{ background: "var(--bg-nexora-gradient)" }}
  >
    <svg
      className="animate-spin -ml-1 mr-3 h-12 w-12 text-nexora-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading spinner"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    <span className="text-nexora-white text-lg font-semibold mt-4">
      Verifying credentials...
    </span>
  </div>
);

export default AuthSplashPage;
