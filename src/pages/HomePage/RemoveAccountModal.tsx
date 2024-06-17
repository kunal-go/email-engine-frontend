import { Button, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ComponentProps, FC, useState } from "react";
import { apiDeleteAccount } from "../../apis/account/apiDeleteAccount";
import { useAccountListStore } from "./useAccountListStore";

type Props = ComponentProps<typeof Modal> & {
  accountId: string;
};

export const RemoveAccountModal: FC<Props> = ({ accountId, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const accountListStore = useAccountListStore();

  const handleRemoveAccount = async () => {
    setIsLoading(true);
    try {
      await apiDeleteAccount(accountId);
      await accountListStore.invalidateAll();
    } catch (err) {
      notifications.show({
        color: "red",
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title={<b className="text-xl">Remove Account</b>} {...rest}>
      <div className="flex flex-col gap-2">
        <div className="text-gray-600">
          Are you sure you want to remove this account? This action cannot be
          undone.
        </div>
        <div className="w-full flex flex-row justify-end gap-2">
          <Button variant="light" color="dark" onClick={rest.onClose}>
            Not Now
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={handleRemoveAccount}
            disabled={isLoading}
            loading={isLoading}
          >
            Yes, Remove It
          </Button>
        </div>
      </div>
    </Modal>
  );
};
