import { Outlet, ReactLocation, Route, Router } from "react-location";
import { HomePage, LoginPage } from "./pages";

export const routes: Route[] = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
];

export const AppRouter = () => {
  const reactLocation = new ReactLocation();
  return (
    <Router location={reactLocation} routes={routes}>
      <Outlet />
    </Router>
  );
};
