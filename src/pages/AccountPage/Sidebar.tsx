import { FC, useEffect } from "react";
import { AccountResponse } from "../../apis/account/apiGetAccountList";
import { MailFolderResponse } from "../../apis/mailFolder/apiGetMailFolderList";

type Props = {
  account: AccountResponse;
  mailFolderList: MailFolderResponse[];
  selectedFolderId?: string;
  setSelectedFolderId: (folderId?: string) => void;
};

export const Sidebar: FC<Props> = ({
  account,
  mailFolderList,
  selectedFolderId,
  setSelectedFolderId,
}) => {
  useEffect(() => {
    if (!selectedFolderId && mailFolderList.length > 0) {
      setSelectedFolderId(mailFolderList[0].id);
    }
  }, [mailFolderList, selectedFolderId, setSelectedFolderId]);

  return (
    <div className="bg-gray-800 min-h-screen text-gray-300 flex flex-col">
      <div className="bg-gray-700 text-white text-center p-3">
        <div className="font-bold text-xl">{account.name}</div>
        <div>{account.email}</div>
        <div className="mt-2">
          <button className="bg-gray-800 text-gray-100 p-2 px-3 rounded-md text-sm hover:bg-gray-900">
            Go Back
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-6">
        {mailFolderList.map((folder) => {
          const isSelected = folder.id === selectedFolderId;
          return (
            <div
              key={folder.id}
              className={`p-2 px-4 hover:bg-gray-700 rounded-md hover:cursor-pointer flex flex-row justify-between font-semibold items-center ${
                isSelected ? "bg-gray-700 text-white" : ""
              }`}
              onClick={() => setSelectedFolderId(folder.id)}
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
