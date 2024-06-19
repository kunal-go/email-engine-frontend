import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { configs, getAccessToken } from "./core";

type MailFolderListInvalidateEvent = {
  action: "invalidate";
  type: "mail-folder-list";
  payload: { accountId: string };
};

type MessageListInvalidateEvent = {
  action: "invalidate";
  type: "mail-message-list";
  payload: { mailFolderId: string };
};

type EventSourceMessage =
  | MailFolderListInvalidateEvent
  | MessageListInvalidateEvent;

export const EventSourcing = () => {
  const accessToken = getAccessToken();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!accessToken) return;

    const baseURI = configs.apiBaseUrl;
    const url = new URL("/user/sse", baseURI);
    url.searchParams.set("accessToken", accessToken);
    const sse = new EventSource(url);

    sse.onmessage = (event) => {
      const data = JSON.parse(event.data) as EventSourceMessage;
      if (data.action === "invalidate") {
        if (data.type === "mail-folder-list") {
          console.log("Invalidating folder-list");
          queryClient.invalidateQueries([
            "mail-folder-list",
            data.payload.accountId,
          ]);
        } else if (data.type === "mail-message-list") {
          console.log("Invalidating message-list");
          queryClient.invalidateQueries([
            "message-list",
            data.payload.mailFolderId,
          ]);
        }
      }
    };

    return () => {
      sse.close();
    };
  }, [accessToken, queryClient]);

  return null;
};
