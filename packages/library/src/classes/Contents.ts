import { Fetcher } from "../libs/classes/fetcher";
import {
  APIResponse,
  ClapParams,
  Content,
  ContentStatusEnum,
  DetailContent,
  GetContentsType,
  IPaginatinoOptions,
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

  async getContents(
    filters?: GetContentsType & { pagination: IPaginatinoOptions }
  ): Promise<PaginationResponse<Content[]>> {
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

    if (filters?.pagination.page) {
      url.searchParams.append("page", filters.pagination.page.toString());
    }

    if (filters?.pagination.size) {
      url.searchParams.append("size", filters.pagination.size.toString());
    }

    return this.fetcher.request<PaginationResponse<Content[]>>(
      url.toString(),
      defaultOptions
    );
  }

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

  async clap(id: string, { count }: ClapParams): Promise<number> {
    const defaultOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify({ count }),
    };

    const response = await this.fetcher.request<{ data: number }>(
      `contents/${id}/claps`,
      defaultOptions
    );

    return response.data;
  }
}
