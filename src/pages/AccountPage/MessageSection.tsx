import { FC } from "react";
import { MessageResponse } from "../../apis/message/apiGetMessageList";

type Props = {
  selectedMessage: MessageResponse;
};

export const MessageSection: FC<Props> = ({ selectedMessage }) => {
  return (
    <div className="p-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-3xl leading-8">
            {selectedMessage.subject}
          </h2>
          <div className="text-gray-600">
            <div>
              <div className="flex flex-row gap-2">
                <div>
                  {new Date(selectedMessage.sentDateTime).toLocaleString(
                    undefined,
                    {
                      dateStyle: "full",
                      timeStyle: "short",
                    }
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div>From:</div>
              <div>
                <b>{selectedMessage.from.name}</b> (
                {selectedMessage.from.address})
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div>To: </div>
              {selectedMessage.toRecipients.map((recipient) => (
                <div>
                  <b>{recipient.name}</b> ({recipient.address})
                </div>
              ))}
            </div>
            {selectedMessage.ccRecipients.length > 0 && (
              <div className="flex flex-row gap-2">
                <div>Cc: </div>
                {selectedMessage.ccRecipients.map((recipient) => (
                  <div>
                    <b>{recipient.name}</b> ({recipient.address})
                  </div>
                ))}
              </div>
            )}
            {selectedMessage.bccRecipients.length > 0 && (
              <div className="flex flex-row gap-2">
                <div>Bcc: </div>
                {selectedMessage.bccRecipients.map((recipient) => (
                  <div>
                    <b>{recipient.name}</b> ({recipient.address})
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            {selectedMessage.body.contentType === "html" ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedMessage.body.content,
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
