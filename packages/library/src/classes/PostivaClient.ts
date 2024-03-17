import { PostivaClientOptions } from "../libs/types";
import { Categories } from "./Categories";
import { Contents } from "./Contents";

export class PostivaClient {
  protected workspaceId: string;
  protected apiKey: string;
  contents: Contents;
  categories: Categories;

  constructor(
    workspaceId: string,
    apiKey: string,
    _options?: PostivaClientOptions
  ) {
    if (!workspaceId) {
      throw new Error("workspaceId is required");
    }

    if (!apiKey) {
      throw new Error("apiKey is required");
    }

    this.workspaceId = workspaceId;
    this.apiKey = apiKey;
    this.contents = new Contents(this.workspaceId, this.apiKey);
    this.categories = new Categories(this.workspaceId, this.apiKey);
  }
}
