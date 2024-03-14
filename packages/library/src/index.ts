import { PostivaClient } from "./classes/PostivaClient";
import { PostivaClientOptions } from "./libs/types";
export * from "./libs/types";

/**
 * The function `createClient` creates a new instance of `PostivaClient` with the provided workspaceId,
 * apiKey, and optional options.
 * @param {string} workspaceId - The `workspaceId` parameter is a string that represents the unique
 * identifier for a specific workspace in the system. It is used to identify which workspace the client
 * will be interacting with.
 * @param {string} apiKey - The `apiKey` parameter is a string that represents the API key used for
 * authentication when making requests to the Postiva API. This key is typically provided by the
 * service provider and is used to identify and authorize the client making the API requests.
 * @param {PostivaClientOptions} [options] - The `options` parameter in the `createClient` function is
 * of type `PostivaClientOptions`. This parameter is optional and allows you to provide additional
 * configuration options when creating a new `PostivaClient` instance.
 * @returns A new instance of the `PostivaClient` class with the provided `workspaceId`, `apiKey`, and
 * optional `options` is being returned.
 */
export const createClient = (
  workspaceId: string,
  apiKey: string,
  options?: PostivaClientOptions
) => {
  return new PostivaClient(workspaceId, apiKey, options);
};
