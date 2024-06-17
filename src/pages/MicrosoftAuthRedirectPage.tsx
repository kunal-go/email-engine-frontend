import { notifications } from "@mantine/notifications";
import { useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-location";
import { apiLinkMicrosoftAccount } from "../apis";
import { useAccountListStore } from "./HomePage/useAccountListStore";

export const MicrosoftAuthRedirectPage = () => {
  const isStartedFlagRef = useRef(false);
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get("code");
  const navigate = useNavigate();
  const accountListStore = useAccountListStore();

  useEffect(() => {
    if (isStartedFlagRef.current) {
      return;
    }
    isStartedFlagRef.current = true;
    if (!codeParam) {
      return;
    }

    apiLinkMicrosoftAccount({ authorizationCode: codeParam })
      .then(() => {
        accountListStore.invalidateAll().then(() => {
          navigate({ to: "/" });
        });
      })
      .catch((err) => {
        notifications.show({
          color: "red",
          message: err.message || "Microsoft authentication failed",
        });
        navigate({ to: "/" });
      })
      .finally(() => {
        isStartedFlagRef.current = false;
      });
  }, [codeParam, navigate, accountListStore]);

  if (!codeParam) {
    return <Navigate to="/" />;
  }

  return null;
};
