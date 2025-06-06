import AuthSplashPage from "@/modules/auth/pages/AuthSplashPage";
import { Header, Footer } from "@/shared/components/layout/";
import { useAuth } from "@/shared/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  readonly loginRoute: string;
}

const HomeLayout = ({ loginRoute }: Props) => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) return <AuthSplashPage />;
  if (!user) return <Navigate to={loginRoute} replace />;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[image:var(--bg-nexora-gradient)] lx:h-screen">
      <Header />

      <main className="flex-grow px-4 md:px-10 py-6 max-w-screen-xl mx-auto w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default HomeLayout;
