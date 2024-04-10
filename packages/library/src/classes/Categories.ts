import { Fetcher } from "../libs/classes/fetcher";
import {
  APIResponse,
  ContentCategory,
  ContentsResponse,
  GetCategoriesType,
  PaginatableResponse,
  PaginationResponse,
  PostivaClientOptions,
} from "../libs/types";

export class Categories {
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
   * The function `getCategories` retrieves content categories with optional filters and pagination
   * support.
   * @param {GetContentsType} [filters] - The `getCategories` function is designed to fetch content
   * categories based on the provided filters. The `filters` parameter of type `GetContentsType` allows
   * you to specify query parameters for filtering the categories.
   * @returns The `getCategories` function is returning a `ContentsResponse` object that contains a
   * `PaginationResponse` object which in turn contains an array of `ContentCategory` objects. The
   * function uses a Proxy to intercept property access on the fetchPromise object and provide custom
   * behavior for the `pagination` property.
   */
  getCategories(
    filters?: GetCategoriesType
  ): ContentsResponse<PaginationResponse<ContentCategory[]>> {
    const defaultOptions = {
      method: "GET",
    };

    const url = new URL("categories", this.fetcher.getApiURL());

    if (filters?.query) {
      url.searchParams.append("query", filters.query);
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
    }) as ContentsResponse<PaginationResponse<ContentCategory[]>>;
  }

  /**
   * This async function fetches a content category by its ID using a GET request.
   * @param {string} id - The `id` parameter in the `getCategoryById` function is a string representing
   * the unique identifier of the category that you want to retrieve from the server.
   * @returns The `getCategoryById` function returns a Promise that resolves to a `ContentCategory`
   * object fetched from the API endpoint `categories/`.
   */
  async getCategoryById(id: string): Promise<ContentCategory> {
    const defaultOptions = {
      method: "GET",
    };

    const { data } = await this.fetcher.request<APIResponse<ContentCategory>>(
      `categories/${id}`,
      defaultOptions
    );

    return data;
  }
}
