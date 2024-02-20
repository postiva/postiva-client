import { Content, ContentsResponse, PaginatableResponse, PostivaClientOptions } from "../libs/types.js";

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
    return `https://postiva.app/api/public/` + this.workspaceId + "/"
  }

  private fetcher<T>(path: string, options: RequestInit): Promise<T> {
    const requestOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Apikey': this.apiKey,
      },
    };

    const url = this.getApiURL() + path;

    console.log("url",url);
    

    return fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<T>;
      });
  }

  getContents(): ContentsResponse<Content> {
    const defaultOptions = {
      method: 'GET',
    };

    const fetchPromise: Promise<Content[]> = this.fetcher("contents", defaultOptions);

    const paginatable: PaginatableResponse<Content> = {
      pagination: ({ page, size }) => {
        const path = `contents?page=${page}&size=${size}`;
        return this.fetcher(path, defaultOptions);
      }
    };

    return new Proxy(fetchPromise, {
      get: (target, prop:string, receiver) => {
        if (prop === 'pagination') {
          return paginatable.pagination;
        } else if (['then', 'catch', 'finally'].includes(prop)) {
          return (...args) => Promise.prototype[prop].apply(target, args);
        }

        return Reflect.get(target, prop, receiver);
      }
    }) as ContentsResponse<Content>;
  }

  getContent(id: string): Promise<Content> {
    const defaultOptions = {
      method: 'GET',
    };

    return this.fetcher(`contents/${id}`, defaultOptions);
  }
}