import { Loader } from "@mantine/core";
import { FC, useState } from "react";
import { MailFolderResponse } from "../../apis/mailFolder/apiGetMailFolderList";
import { MessageResponse } from "../../apis/message/apiGetMessageList";
import { EmailListSection } from "./EmailListSection";
import { MessageSection } from "./MessageSection";
import { SidebarSection } from "./SidebarSection";
import { useAccountStore } from "./useAccountStore";

export const AccountPage: FC<{ accountId: string }> = ({ accountId }) => {
  const [selectedFolder, setSelectedFolder] = useState<MailFolderResponse>();
  const [selectedMessage, setSelectedMessage] = useState<MessageResponse>();
  const accountStore = useAccountStore(accountId);
  const { data, isLoading } = accountStore.getState();

  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <div>Account not found</div>;
  }

  return (
    <div className="flex w-full">
      <div style={{ width: "20%" }}>
        <SidebarSection
          account={data}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
      </div>
      <div className="border-r border-gray-300" style={{ width: "30%" }}>
        {selectedFolder ? (
          <EmailListSection
            account={data}
            selectedFolder={selectedFolder}
            selectedMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a folder to view emails
          </div>
        )}
      </div>
      <div style={{ width: "50%" }}>
        {selectedMessage ? (
          <MessageSection selectedMessage={selectedMessage} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select an email message to view
          </div>
        )}
      </div>
    </div>
  );
};
