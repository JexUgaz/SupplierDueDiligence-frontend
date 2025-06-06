import { useState } from "react";
import logo from "@/assets/images/logo_icon.webp";
import loginVideo from "@/assets/videos/login_bg.webm";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import AuthSplashPage from "./AuthSplashPage";
import { authService } from "@/modules/auth/services";
import FormButton from "@/shared/components/buttons/FormButton";

interface Props {
  readonly homeRoute: string;
}

const LoginPage = ({ homeRoute }: Props) => {
  const { user, isAuthLoading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthLoading) return <AuthSplashPage />;
  if (user) return <Navigate to={homeRoute} replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please complete all fields.");
      return;
    }
    setError("");
    try {
      setIsLoading(true);
      const data = await authService.login(email, password);
      if (!data) return setError("Email or password is incorrect.");
      login(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={loginVideo} type="video/webm" />
        Your browser does not support background videos.
      </video>

      <div className="max-w-md w-full bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg border border-nexora-gray-light z-10">
        <div className="flex flex-col items-center space-y-2">
          <img src={logo} alt="Nexora logo" className="w-14 h-14" />
          <h1 className="text-2xl font-semibold text-nexora-darkest">
            Nexora Consulting
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-[60px] space-y-5">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-nexora-gray-light focus:ring-2 focus:ring-nexora-accent focus:outline-none placeholder-nexora-gray-medium text-nexora-text"
              placeholder="Correo electrónico"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-nexora-gray-light focus:ring-2 focus:ring-nexora-accent focus:outline-none placeholder-nexora-gray-medium text-nexora-text"
              placeholder="Contraseña"
            />
          </div>
          {error && (
            <p className="text-sm text-center text-nexora-error bg-nexora-error-light p-2 rounded-md">
              {error}
            </p>
          )}

          <FormButton className="w-full" loading={isLoading}>
            Login
          </FormButton>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
