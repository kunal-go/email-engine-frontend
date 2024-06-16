import { Loader } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { useAccountStore } from "./useAccountStore";
import { useMailFolderListStore } from "./useMailFolderListStore";

function useFetchData(accountId: string) {
  const accountStore = useAccountStore(accountId);
  const mailFolderListStore = useMailFolderListStore(accountId);

  useEffect(() => {
    accountStore.fetch();
    mailFolderListStore.fetch();
  }, [accountStore, mailFolderListStore]);

  const accountState = accountStore.getState();
  const mailFolderState = mailFolderListStore.getState();
  const isLoading = accountState.isLoading || mailFolderState.isLoading;
  return {
    account: accountState.data,
    mailFolderList: mailFolderState.data,
    isLoading,
  };
}

export const AccountPage: FC<{ accountId: string }> = ({ accountId }) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string>();
  const { account, mailFolderList, isLoading } = useFetchData(accountId);
  if (isLoading) {
    return <Loader />;
  }
  if (!account) {
    return <div>Account not found</div>;
  }

  return (
    <div className="flex w-full">
      <div className="flex-[1]">
        <Sidebar
          account={account}
          mailFolderList={mailFolderList?.list || []}
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
        />
      </div>
      <div className="flex-[1]">Emails List</div>
      <div className="flex-[2]">Email View</div>
    </div>
  );
};
