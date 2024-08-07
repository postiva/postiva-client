import { APIResponse, Content, PaginationResponse } from "@postiva/client";

export type {
  APIResponse,
  Content,
  ContentAnalytics,
  ContentCategory,
  ContentPublishedBy,
  ContentsResponse,
  GetCategoriesType,
  GetContentsType,
  IPagination,
  PaginationResponse,
  PostivaClientOptions,
  SimilarContent,
  createClientParameters,
} from "@postiva/client";

export interface IAPIRes extends APIResponse<Content> {}
export interface IPaginationRes extends PaginationResponse<Content> {}
