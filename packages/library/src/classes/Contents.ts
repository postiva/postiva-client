import { Fetcher } from "../libs/classes/fetcher";
import {
  APIResponse,
  Content,
  ContentStatusEnum,
  ContentsResponse,
  GetContentsType,
  PaginatableResponse,
  PaginationResponse,
  PostivaClientOptions,
} from "../libs/types";

export class Contents {
  protected fetcher: Fetcher;

  constructor(
    protected workspaceId: string,
    protected apiKey: string,
    _options?: PostivaClientOptions
  ) {
    if (!workspaceId) {
      throw new Error("workspaceId is required");
    }
    if (!apiKey) {
      throw new Error("apiKey is required");
    }

    this.fetcher = new Fetcher(this.workspaceId, this.apiKey);
  }

  /**
   * The function `getContents` retrieves contents based on specified filters and supports pagination.
   * @param {GetContentsType} [filters] - The `getContents` function you provided is used to fetch
   * contents based on the specified filters. The `filters` parameter is an optional object that can
   * contain the following properties:
   * @returns The `getContents` function is returning a `ContentsResponse` object that contains a
   * `PaginationResponse` object which in turn contains an array of `Content` objects. The function makes
   * a GET request to retrieve contents based on optional filters such as query, category, and type.
   * Pagination is also supported through the `pagination` method that allows for specifying page and
   * size parameters.
   */
  getContents(
    filters?: GetContentsType
  ): ContentsResponse<PaginationResponse<Content[]>> {
    const defaultOptions = {
      method: "GET",
    };

    const url = new URL("contents", this.fetcher.getApiURL());

    if (filters?.query) {
      url.searchParams.append("query", filters.query);
    }

    if (filters?.category) {
      url.searchParams.append("category", filters.category);
    }

    if (filters?.type) {
      url.searchParams.append("type", filters.type);
    } else {
      url.searchParams.append("type", ContentStatusEnum.PUBLISHED);
    }

    const fetchPromise: Promise<unknown> = this.fetcher.request(
      url.toString(),
      defaultOptions
    );

    const paginatable: PaginatableResponse<number> = {
      pagination: ({ page, size }) => {
        if (page) url.searchParams.append("page", page.toString());
        if (size) url.searchParams.append("size", size.toString());

        return this.fetcher.request(url.toString(), defaultOptions);
      },
    };

    return new Proxy(fetchPromise, {
      get: (target, prop: string, receiver) => {
        if (prop === "pagination") {
          return paginatable.pagination;
        } else if (["then", "catch", "finally"].includes(prop)) {
          return (...args) => Promise.prototype[prop].apply(target, args);
        }

        return Reflect.get(target, prop, receiver);
      },
    }) as ContentsResponse<PaginationResponse<Content[]>>;
  }

  /**
   * This async function fetches content data by ID using a GET request and returns the content object.
   * @param {string} id - The `id` parameter in the `getContentById` function is a string that represents
   * the unique identifier of the content you want to retrieve.
   * @returns The `getContentById` function is returning a Promise that resolves to a `Content` object
   * fetched from the API endpoint `contents/`.
   */
  async getContentById(id: string): Promise<Content> {
    const defaultOptions = {
      method: "GET",
    };

    const { data } = await this.fetcher.request<APIResponse<Content>>(
      `contents/${id}`,
      defaultOptions
    );

    return data;
  }

  /**
   * This function asynchronously fetches content data based on a provided slug.
   * @param {string} slug - The `slug` parameter in the `getContentBySlug` function is a string that
   * represents a unique identifier for a specific piece of content. It is used to fetch content from a
   * server based on this identifier.
   * @returns The `getContentBySlug` function is returning a Promise that resolves to a `Content` object
   * fetched from the API endpoint `contents/slug/`.
   */
  async getContentBySlug(slug: string): Promise<Content> {
    const defaultOptions = {
      method: "GET",
    };

    const { data } = await this.fetcher.request<APIResponse<Content>>(
      `contents/slug/${slug}`,
      defaultOptions
    );

    return data;
  }
}
