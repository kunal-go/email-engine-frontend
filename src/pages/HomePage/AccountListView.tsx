import { Button, Loader, Text } from "@mantine/core";
import { FC } from "react";
import { useNavigate } from "react-location";
import { AccountResponse } from "../../apis/account/apiGetAccountList";
import { useCustomDisclosure } from "../../common/hooks/useCustomDisclosure";
import { RemoveAccountModal } from "./RemoveAccountModal";
import { useAccountListStore } from "./useAccountListStore";

export const AccountListView: FC = () => {
  const navigate = useNavigate();
  const accountListStore = useAccountListStore();
  const { data, isLoading } = accountListStore.getState();

  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <div>Unable to load accounts</div>;
  }
  if (!data.list) {
    return <div>No accounts added yet</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-gray-600">
        Total {data.count} {data.count === 1 ? "account" : "accounts"}
      </div>
      <div className="flex flex-col gap-3">
        {data.list.map((account) => (
          <AccountItem
            account={account}
            key={account.id}
            onClick={() => navigate({ to: `account/${account.id}` })}
          />
        ))}
      </div>
    </div>
  );
};

type AccountItemProps = {
  account: AccountResponse;
  onClick?: () => void;
};

const AccountItem: FC<AccountItemProps> = ({ account, onClick }) => {
  const removeAccountModal = useCustomDisclosure();

  return (
    <div
      key={account.id}
      className="border p-3 px-4 rounded-lg hover:cursor-pointer hover:bg-gray-200 flex flex-row justify-between items-center"
    >
      <div onClick={onClick}>
        <Text className="text-xl font-bold">{account.name}</Text>
        <Text>{account.email}</Text>
        <Text>{account.type} Account</Text>
      </div>
      <div>
        <Button
          variant="subtle"
          color="red"
          onClick={(e) => {
            e.stopPropagation();
            removeAccountModal.open();
          }}
        >
          Remove
        </Button>
        <RemoveAccountModal {...removeAccountModal} accountId={account.id} />
      </div>
    </div>
  );
};
