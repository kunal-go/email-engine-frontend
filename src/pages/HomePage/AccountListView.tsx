import { Loader, Text } from "@mantine/core";
import { FC, useEffect } from "react";
import { useNavigate } from "react-location";
import { AccountResponse } from "../../apis/account/apiGetAccountList";
import { useAccountListStore } from "./useAccountListStore";

export const AccountListView: FC = () => {
  const accountListStore = useAccountListStore();
  const navigate = useNavigate();

  useEffect(() => {
    accountListStore.fetch();
  }, [accountListStore]);

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

type AccountItemProps = React.HTMLAttributes<HTMLDivElement> & {
  account: AccountResponse;
};

const AccountItem: FC<AccountItemProps> = ({ account, ...rest }) => {
  return (
    <div
      key={account.id}
      className="bg-gray-100 p-3 px-4 rounded-lg hover:cursor-pointer hover:bg-gray-200 hover:shadow-sm hover:transition-shadow duration-200"
      {...rest}
    >
      <Text className="text-xl font-bold">{account.email}</Text>
      <Text>{account.type} Account</Text>
    </div>
  );
};
