import { PostivaClient } from "./classes/PostivaClient";
import { PostivaClientOptions } from "./libs/types";
export * from "./libs/types.js";

export const createClient = (
  workspaceId: string,
  apiKey: string,
  options?: PostivaClientOptions
) => {
  return new PostivaClient(workspaceId, apiKey, options);
};
