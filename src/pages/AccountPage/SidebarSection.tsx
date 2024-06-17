import { Loader } from "@mantine/core";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-location";
import { apiAccountSyncData } from "../../apis";
import { AccountResponse } from "../../apis/account/apiGetAccountList";
import { MailFolderResponse } from "../../apis/mailFolder/apiGetMailFolderList";
import { useMailFolderListStore } from "./useMailFolderListStore";

type Props = {
  account: AccountResponse;
  selectedFolder?: MailFolderResponse;
  setSelectedFolder: (folder?: MailFolderResponse) => void;
};

export const SidebarSection: FC<Props> = ({
  account,
  selectedFolder,
  setSelectedFolder,
}) => {
  const navigate = useNavigate();
  const mailFolderListStore = useMailFolderListStore(account.id);
  const { data, isLoading } = mailFolderListStore.getState();
  const mailFolderList = useMemo(() => data?.list || [], [data]);

  const handleSyncDataClick = useCallback(async () => {
    await apiAccountSyncData(account.id);
  }, [account]);

  useEffect(() => {
    if (!selectedFolder && mailFolderList.length > 0) {
      setSelectedFolder(mailFolderList[0]);
    }
  }, [mailFolderList, selectedFolder, setSelectedFolder]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-800 min-h-screen text-gray-300 flex flex-col">
      <div className="bg-gray-700 text-white text-center p-3">
        <div className="font-bold text-xl">{account.name}</div>
        <div>{account.email}</div>
        <div>{account.type} Account</div>
        <div className="mt-2 flex gap-2 justify-center">
          <button
            className="bg-gray-800 text-gray-100 p-2 px-3 rounded-md text-xs hover:bg-gray-900"
            onClick={() => navigate({ to: "/" })}
          >
            Go Back
          </button>
          <button
            className="bg-gray-800 text-gray-100 p-2 px-3 rounded-md text-xs hover:bg-gray-900"
            onClick={handleSyncDataClick}
          >
            Sync Data
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-6">
        {mailFolderList.map((folder) => {
          const isSelected = folder.id === selectedFolder?.id;
          return (
            <div
              key={folder.id}
              className={`p-2 px-4 hover:bg-gray-700 rounded-md hover:cursor-pointer flex flex-row justify-between font-semibold items-center ${
                isSelected ? "bg-gray-700 text-white" : ""
              }`}
              onClick={() => setSelectedFolder(folder)}
            >
              <div>{folder.name}</div>
              {folder.unreadItemCount > 0 && (
                <div className="text-sm p-0.5 px-2 bg-gray-200 text-gray-800 rounded-md">
                  {folder.unreadItemCount}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
