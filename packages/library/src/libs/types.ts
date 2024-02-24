export interface PostivaClientOptions {}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationResponse<T> {
  data: T;
  pagination?: IPagination;
}

export interface PaginatableResponse<T> {
  pagination: ({
    page,
    size,
  }: {
    page: number;
    size: number;
  }) => Promise<PaginationResponse<T[]>>;
}

export type ContentsResponse<T> = Promise<T[]> & PaginatableResponse<T>;

export interface Content {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  slug: string;
  thumbnail?: string;
  body?: string;
}

export enum ContentStatusEnum {
  DRAFT = "draft",
  PUBLISHED = "publish",
  TRASH = "trash",
}

export interface GetContentsType {
  query?: string;
  category?: string;
  type?: ContentStatusEnum;
}
