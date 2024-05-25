import { PostivaClient } from "./classes/PostivaClient";
import { PostivaClientOptions } from "./libs/types";

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
  return new PostivaClient(workspaceId, apiKey, options);
};
