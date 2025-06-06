import { Navigate, useRoutes, type RouteObject } from "react-router-dom";
import LoginPage from "@/modules/auth/pages/LoginPage";
import HomeLayout from "@/layouts/HomeLayout";
import {
  SupplierAddPage,
  SupplierDetailsPage,
  SupplierEditPage,
  SupplierListPage,
} from "@/modules/suppliers/pages";

const loginRoute = "/login";
const homeRoute = "/app";
const initRoute = loginRoute;

const routes: RouteObject[] = [
  { path: loginRoute, element: <LoginPage homeRoute={homeRoute} /> },
  {
    path: homeRoute,
    element: <HomeLayout loginRoute={loginRoute} />,
    children: [
      { path: "", element: <SupplierListPage /> },
      { path: "new", element: <SupplierAddPage /> },
      { path: "edit/:id", element: <SupplierEditPage /> },
      { path: "details/:id", element: <SupplierDetailsPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to={initRoute} replace />,
  },
];

const AppRoutes = () => useRoutes(routes);

export default AppRoutes;
