import { Loader } from "@mantine/core";
import { FC } from "react";
import { AccountResponse } from "../../apis/account/apiGetAccountList";
import { MailFolderResponse } from "../../apis/mailFolder/apiGetMailFolderList";
import { MessageResponse } from "../../apis/message/apiGetMessageList";
import { useMessageListStore } from "./useMessageListStore";

type Props = {
  account: AccountResponse;
  selectedFolder: MailFolderResponse;
  selectedMessage?: MessageResponse;
  setSelectedMessage: (message: MessageResponse) => void;
};

export const EmailListSection: FC<Props> = ({
  account,
  selectedFolder,
  selectedMessage,
  setSelectedMessage,
}) => {
  const messageListStore = useMessageListStore(account.id, selectedFolder.id);
  const { data, isLoading } = messageListStore.getState();

  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <div>Unable to load emails</div>;
  }
  if (data.count === 0) {
    return <div className="p-6">No emails in {selectedFolder.name}</div>;
  }

  return (
    <div className="p-6">
      <div>
        <h2 className="font-bold text-3xl">{selectedFolder.name}</h2>
        <div className="text-gray-600">
          <span>
            {selectedFolder.syncedItemCount}{" "}
            {selectedFolder.syncedItemCount == 1 ? "message" : "messages"}
          </span>
          {selectedFolder.unreadItemCount > 0 && (
            <span> ({selectedFolder.unreadItemCount} unread)</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {data.list.map((message) => {
          const isSelected = selectedMessage?.id === message.id;
          return (
            <div
              key={message.id}
              className={`border p-3 px-4 rounded-md hover:cursor-pointer  ${
                isSelected
                  ? "bg-gray-600 text-white hover:bg-gray-600"
                  : message.isRead
                  ? "hover:bg-gray-100"
                  : "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <div
                className={`line-clamp-1 ${
                  isSelected ? "text-gray-50" : "text-gray-700"
                }`}
              >
                {} {message.sender.name}
              </div>
              <div className="font-bold line-clamp-1">{message.subject}</div>
              <div
                className={`line-clamp-1 ${
                  isSelected ? "text-gray-200 " : "text-gray-500"
                }`}
              >
                {message.bodyPreview}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
