import {
  Content,
  ContentsResponse,
  GetContentsType,
  PaginatableResponse,
  PostivaClientOptions,
} from "../libs/types.js";

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

  private fetcher<T>(path: string, options: RequestInit): Promise<T> {
    const requestOptions = {
      ...options,
      headers: {
        ...options.headers,
        Apikey: this.apiKey,
      },
    };

    const url = path.startsWith("https://") ? path : this.getApiURL() + path;

    return fetch(url, requestOptions).then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }
      return response.json() as Promise<T>;
    });
  }

  getContents(filters?: GetContentsType): ContentsResponse<Content> {
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
    }

    const fetchPromise: Promise<Content[]> = this.fetcher(
      url.toString(),
      defaultOptions
    );

    const paginatable: PaginatableResponse<Content> = {
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
    }) as ContentsResponse<Content>;
  }

  getContent(id: string): Promise<Content> {
    const defaultOptions = {
      method: "GET",
    };

    return this.fetcher(`contents/${id}`, defaultOptions);
  }
}
