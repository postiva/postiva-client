import { PostivaClient } from "./classes/PostivaClient.js";
import { PostivaClientOptions } from "./libs/types.js";

export const createClient = (workspaceId: string, apiKey: string, options?: PostivaClientOptions) => {
  return new PostivaClient(workspaceId, apiKey, options);
}