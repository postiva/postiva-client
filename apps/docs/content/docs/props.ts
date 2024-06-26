import { APIResponse, Content, PaginationResponse } from "@postiva/client";

export type {
  APIResponse,
  Content,
  ContentAnalytics,
  ContentsResponse,
  GetCategoriesType,
  GetContentsType,
  IPagination,
  PaginationResponse,
  createClientParameters,
  PostivaClientOptions,
  ContentCategory,
  ContentPublishedBy
} from "@postiva/client";

export interface IAPIRes extends APIResponse<Content> {}
export interface IPaginationRes extends PaginationResponse<Content> {}
