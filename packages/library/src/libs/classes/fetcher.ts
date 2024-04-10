import { PostivaClientOptions } from "../types";

export class Fetcher {
  constructor(
    protected workspaceId: string,
    protected apiKey: string,
    protected _options?: PostivaClientOptions
  ) {
    if (!workspaceId) {
      throw new Error("workspaceId is required");
    }
    if (!apiKey) {
      throw new Error("apiKey is required");
    }
  }

  getApiURL() {
    return `https://postiva.app/api/public/` + this.workspaceId + "/";
  }

  /**
   * The function `request` sends an asynchronous HTTP request with specified options and returns the
   * response data as a Promise.
   * @param {string} path - The `path` parameter in the `request` function is a string that represents
   * the URL path or endpoint to which the HTTP request will be made. It can be a relative path or a
   * full URL starting with "https://".
   * @param {RequestInit} options - The `options` parameter in the `request` function is of type
   * `RequestInit`, which is an interface representing the options that can be passed to the `fetch`
   * function in JavaScript for making HTTP requests. It includes properties like `method`, `headers`,
   * `body`, `mode`, `cache
   * @returns The `request` function is returning a Promise that resolves to a value of type `T`. The
   * function makes an asynchronous request using the `fetch` API, processes the response, and returns
   * the JSON data from the response as a Promise of type `T`. If there is an error during the request
   * or response processing, it will be caught and rethrown.
   */
  async request<T>(path: string, options: RequestInit): Promise<T> {
    const requestOptions: RequestInit = {
      cache: "no-cache",
      mode: "no-cors",
      headers: {
        ...options.headers,
        Apikey: this.apiKey,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...options,
    };

    const url = path.startsWith("https://") ? path : this.getApiURL() + path;

    if (this._options?.debug) {
      console.log(`Request to ${url} with options: `, requestOptions);
    }

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        console.log("response", await response.text());
        throw new Error(
          `HTTP error! status: ${response.statusText} url: ${url}`
        );
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error("Error fetching data:", error);
      // throw error;
    }
  }
}
