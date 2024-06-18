import { Button, Loader } from "@mantine/core";
import { FC, useState } from "react";
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
  const size = 10;
  const [page, setPage] = useState(1);
  const messageListStore = useMessageListStore(
    account.id,
    selectedFolder.id,
    page,
    size
  );
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

  const totalPageCount = Math.ceil(data.count / size);
  const prevPage = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };
  const nextPage = () => {
    if (page >= totalPageCount) return;
    setPage((page) => page + 1);
  };

  return (
    <div className="p-6">
      <div className="flex gap-2 justify-between items-end">
        <div>
          <h2 className="font-bold text-3xl">{selectedFolder.name}</h2>
          <div className="text-gray-600">
            <span>
              {selectedFolder.itemCount}{" "}
              {selectedFolder.itemCount == 1 ? "message" : "messages"}
            </span>
            {selectedFolder.unreadItemCount > 0 && (
              <span> ({selectedFolder.unreadItemCount} unread)</span>
            )}
          </div>
        </div>
        {totalPageCount > 1 && (
          <div className="flex gap-2">
            <Button
              variant="subtle"
              color="dark"
              className="p-0 px-3"
              onClick={prevPage}
              disabled={page <= 1}
            >
              &lsaquo;
            </Button>
            <Button
              variant="subtle"
              color="dark"
              className="p-0 px-3"
              onClick={nextPage}
              disabled={page >= totalPageCount}
            >
              &rsaquo;
            </Button>
          </div>
        )}
      </div>
      <div>
        {data.list.map((message) => {
          const isSelected = selectedMessage?.id === message.id;
          return (
            <div
              key={message.id}
              className={`border p-3 px-4 my-2 rounded-md hover:cursor-pointer  ${
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
