import { Outlet, ReactLocation, Route, Router } from "react-location";
import { HomePage } from "./pages/HomePage";

export const routes: Route[] = [{ path: "/", element: <HomePage /> }];

export const AppRouter = () => {
  const reactLocation = new ReactLocation();
  return (
    <Router location={reactLocation} routes={routes}>
      <Outlet />
    </Router>
  );
};
