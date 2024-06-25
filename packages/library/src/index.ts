import { PostivaClient } from "./classes/PostivaClient";
import { PostivaClientOptions } from "./libs/types";
import { checkUpdate } from "./utils/check-version";
export * from "./libs/types";

export interface createClientParameters {
  apiKey: string;
  workspaceId: string;
  options?: PostivaClientOptions;
}

export const createClient = ({
  apiKey,
  workspaceId,
  options,
}: createClientParameters) => {
  checkUpdate();
  return new PostivaClient(workspaceId, apiKey, options);
};
