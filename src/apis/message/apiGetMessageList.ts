import { HttpApi } from "../../core";

export type AddressObject = {
  name: string;
  address: string;
};

export type MessageResponse = {
  id: string;
  createdDateTime: number;
  lastModifiedDateTime: number;
  receivedDateTime: number;
  sentDateTime: number;
  hasAttachments: boolean;
  internetMessageId: string;
  subject: string;
  bodyPreview: string;
  conversationId: string | null;
  isRead: boolean;
  isDraft: boolean;
  webLink: string;
  body: { contentType: string; content: string };
  sender: AddressObject;
  from: AddressObject;
  toRecipients: AddressObject[];
  ccRecipients: AddressObject[];
  bccRecipients: AddressObject[];
  replyTo: AddressObject[];
  isFlagged: boolean;
  lastSyncedAt: number;
};

type ResponseShape = {
  count: number;
  list: MessageResponse[];
};

export async function apiGetMessageList({
  accountId,
  mailFolderId,
  page,
  size,
}: {
  accountId: string;
  mailFolderId: string;
  page: number;
  size: number;
}) {
  const httpApi = new HttpApi<ResponseShape>(
    "get",
    `/account/${accountId}/mail-folder/${mailFolderId}/message`
  );
  return await httpApi.send({ useAccessToken: true, query: { page, size } });
}
