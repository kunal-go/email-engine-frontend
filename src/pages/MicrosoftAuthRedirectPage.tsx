import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-location";
import { apiLinkMicrosoftAccount } from "../apis";

export const MicrosoftAuthRedirectPage = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const linkMicrosoftAccount = useCallback(
    async (code: string) => {
      setIsLoading(true);
      try {
        await apiLinkMicrosoftAccount({ authorizationCode: code });
        notifications.show({
          color: "blue",
          message: "Microsoft account linked",
        });
      } catch (err) {
        notifications.show({
          color: "red",
          message: "Microsoft authentication failed",
        });
      } finally {
        setIsCompleted(true);
        setIsLoading(false);
        navigate({ to: "/" });
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (code && !isLoading && !isCompleted) {
      linkMicrosoftAccount(code);
    }
  }, [code, linkMicrosoftAccount, isLoading, isCompleted]);

  if (!code) {
    return <Navigate to="/" />;
  }
  if (isLoading) {
    return <Loader />;
  }
  return <Navigate to="/" />;
};
