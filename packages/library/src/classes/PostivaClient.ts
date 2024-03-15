import {
  Content,
  ContentStatusEnum,
  ContentsResponse,
  GetContentsType,
  PaginatableResponse,
  PaginationResponse,
  PostivaClientOptions,
} from "../libs/types";

export class PostivaClient {
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
  }

  private getApiURL() {
    return `https://postiva.app/api/public/` + this.workspaceId + "/";
  }

  /**
   * The function `fetcher` in TypeScript is an asynchronous method that fetches data from a specified
   * path with custom options and error handling.
   * @param {string} path - The `path` parameter in the `fetcher` function is a string representing the
   * URL path or endpoint to which the HTTP request will be made. It can be a relative path or a full URL
   * starting with "https://".
   * @param {RequestInit} options - The `options` parameter in the `fetcher` function is of type
   * `RequestInit`, which is an interface representing the options that can be passed to the `fetch`
   * function in JavaScript for making HTTP requests. It includes properties like `method`, `headers`,
   * `body`, `mode`, `
   * @returns The `fetcher` function is returning a `Promise` that resolves to a value of type `T`. The
   * function makes a request to a specified `path` using the `fetch` API with the provided `options`. It
   * then processes the response and returns the JSON data from the response as a `Promise<T>`. If there
   * is an error during the fetch operation, it will log the error
   */
  private async fetcher<T>(path: string, options: RequestInit): Promise<T> {
    const requestOptions: RequestInit = {
      cache: "no-cache",
      ...options,
      headers: {
        ...options.headers,
        Apikey: this.apiKey,
      },
    };

    const url = path.startsWith("https://") ? path : this.getApiURL() + path;

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        console.log("response", await response.text());
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  /**
   * The function `getContents` retrieves content based on specified filters and supports pagination.
   * @param {GetContentsType} [filters] - The `filters` parameter in the `getContents` function is of
   * type `GetContentsType`, which is an object that may contain the following optional properties:
   * @returns The `getContents` method is returning a `ContentsResponse` object that contains a
   * `PaginationResponse` object which in turn contains an array of `Content` objects. The method makes a
   * GET request to retrieve contents based on optional filters such as query, category, and type. It
   * also allows for pagination by providing a `pagination` function that can be called with page and
   * size parameters. The method
   */
  getContents(
    filters?: GetContentsType
  ): ContentsResponse<PaginationResponse<Content[]>> {
    const defaultOptions = {
      method: "GET",
    };

    const url = new URL("contents", this.getApiURL());

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

    const fetchPromise: Promise<unknown> = this.fetcher(
      url.toString(),
      defaultOptions
    );

    const paginatable: PaginatableResponse<number> = {
      pagination: ({ page, size }) => {
        if (page) url.searchParams.append("page", page.toString());
        if (size) url.searchParams.append("size", size.toString());

        return this.fetcher(url.toString(), defaultOptions);
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
   * This function retrieves content by its ID using a GET request.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * content you want to retrieve.
   * @returns A Promise that resolves to a Content object.
   */
  getContentById(id: string): Promise<Content> {
    const defaultOptions = {
      method: "GET",
    };

    return this.fetcher(`contents/${id}`, defaultOptions);
  }

  getContentBySlug(slug: string): Promise<Content> {
    const defaultOptions = {
      method: "GET",
    };

    return this.fetcher(`contents/slug/${slug}`, defaultOptions);
  }
}
