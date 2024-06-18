import { notifications } from "@mantine/notifications";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-location";
import { apiLinkMicrosoftAccount } from "../apis";
import { useAccountListStore } from "./HomePage/useAccountListStore";

export const MicrosoftAuthRedirectPage = () => {
  const executionCount = useRef(0);
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get("code");
  const navigate = useNavigate();
  const accountListStore = useAccountListStore();

  useEffect(() => {
    executionCount.current++;
    if (executionCount.current > 1) {
      return;
    }
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
      });
  }, [codeParam, navigate, accountListStore]);

  return null;
};
