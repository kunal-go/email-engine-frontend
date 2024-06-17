import { Button, Loader, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ComponentProps, FC, useState } from "react";
import { apiGetMicrosoftAuthUrl } from "../../apis";

type Props = ComponentProps<typeof Modal>;

export const AddAccountModal: FC<Props> = ({ ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkMicrosoftAccount = async () => {
    setIsLoading(true);
    try {
      const { data } = await apiGetMicrosoftAuthUrl();
      location.href = data.url;
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
    <Modal title={<b className="text-xl">Add Email Account</b>} {...rest}>
      <div className="flex flex-col gap-2">
        <div className="text-gray-600">
          Link you email account from providers
        </div>
        <div
          className="border p-3 px-4 rounded-lg hover:cursor-pointer hover:bg-gray-100 flex flex-row justify-between"
          onClick={() => !isLoading && handleLinkMicrosoftAccount()}
        >
          <div>
            <div className="font-bold text-lg">Microsoft</div>
            <div className="text-gray-600">Outlook and Microsoft Account</div>
          </div>
          <div>{isLoading && <Loader />}</div>
        </div>
        <div className="w-full text-right">
          <Button variant="light" color="dark" onClick={rest.onClose}>
            Not Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};
