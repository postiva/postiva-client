import { Fetcher } from "../libs/classes/fetcher";
import {
  APIResponse,
  ClapParams,
  Content,
  ContentStatusEnum,
  ContentsResponse,
  DetailContent,
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

    this.fetcher = new Fetcher(this.workspaceId, this.apiKey, _options);
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

    if (filters?.categories) {
      const categories = filters.categories.join(",");
      url.searchParams.append("categories", categories);
    }

    if (filters?.tags) {
      const tags = filters.tags.join(",");
      url.searchParams.append("tags", tags);
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
  async getContentById(id: string): Promise<DetailContent> {
    const defaultOptions = {
      method: "GET",
    };

    const { data } = await this.fetcher.request<APIResponse<DetailContent>>(
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
  async getContentBySlug(slug: string): Promise<DetailContent> {
    const defaultOptions = {
      method: "GET",
    };

    const { data } = await this.fetcher.request<APIResponse<DetailContent>>(
      `contents/slug/${slug}`,
      defaultOptions
    );

    return data;
  }

  async searchContents(query: string): Promise<Content[]> {
    const defaultOptions = {
      method: "GET",
    };

    const { data } = await this.fetcher.request<APIResponse<Content[]>>(
      `contents/search?query=${query}`,
      defaultOptions
    );

    return data;
  }

  /**
   * This TypeScript function asynchronously sends a POST request to increment the number of claps for a
   * specific content ID and returns the updated number of claps.
   * @param {string} id - The `id` parameter in the `clap` function is a string that represents the
   * identifier of the content for which the user wants to submit a clap.
   * @returns The `clap` function is returning a Promise that resolves to a number.
   */
  async clap(id: string, { count }: ClapParams): Promise<number> {
    const defaultOptions: RequestInit = {
      method: "post",
      body: JSON.stringify({ count }),
    };

    const response = await this.fetcher.request<{ data: number }>(
      `contents/${id}/claps`,
      defaultOptions
    );

    return response.data;
  }
}
