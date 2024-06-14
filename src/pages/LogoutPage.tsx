import { Navigate } from "react-location";
import { deleteAccessToken } from "../core";

export const LogoutPage = () => {
  deleteAccessToken();
  return <Navigate to="/login" />;
};
