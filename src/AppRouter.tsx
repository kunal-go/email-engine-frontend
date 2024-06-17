import { FC, PropsWithChildren } from "react";
import { Navigate, Outlet, ReactLocation, Route, Router } from "react-location";
import { getAccessToken } from "./core";
import {
  AccountPage,
  HomePage,
  LoginPage,
  LogoutPage,
  MicrosoftAuthRedirectPage,
  RegisterPage,
} from "./pages";

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const routes: Route[] = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/msal", element: <MicrosoftAuthRedirectPage /> },
  { path: "/logout", element: <LogoutPage /> },
  {
    path: "/account",
    children: [
      {
        path: "/:accountId",
        element: async ({ params }) => (
          <PrivateRoute>
            <AccountPage accountId={params.accountId} />
          </PrivateRoute>
        ),
      },
    ],
  },
];

export const AppRouter = () => {
  const reactLocation = new ReactLocation();
  return (
    <Router location={reactLocation} routes={routes}>
      <Outlet />
    </Router>
  );
};
