import { Loader } from "@mantine/core";
import { FC, useState } from "react";
import { MailFolderResponse } from "../../apis/mailFolder/apiGetMailFolderList";
import { MessageResponse } from "../../apis/message/apiGetMessageList";
import { EmailListSection } from "./EmailListSection";
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
      <div className="flex-[3]">
        <SidebarSection
          account={data}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
      </div>
      <div className="flex-[5] border-r border-gray-300">
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
      <div className="flex-[7]">Email View</div>
    </div>
  );
};
