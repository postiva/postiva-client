export interface PostivaClientOptions {}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface APIResponse<T> {
  data: T;
}

export interface PaginationResponse<T> {
  data: T;
  pagination?: IPagination;
}

export interface IPaginatinoOptions {
  page: number;
  size: number;
}

export interface PaginatableResponse<T> {
  pagination: ({
    page,
    size,
  }: IPaginatinoOptions) => Promise<PaginationResponse<T[]>>;
}

export type ContentsResponse<T> = Promise<T> & PaginatableResponse<T>;

export interface ContentPublishedBy {
  role: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export interface ContentCategory {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  category: ContentCategory | null;
  publishedBy: ContentPublishedBy | null;
  description: string;
  publishedAt: string | null;
  slug: string;
  thumbnail: string | null;
  body: string;
  html: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoThumbnail: string | null;
  readingStatus: ContentReadingStatus | null;
}

export interface ContentReadingStatus {
  time: number;
  wordsCount: number;
  minutes: number;
}

export enum ContentStatusEnum {
  DRAFT = "draft",
  PUBLISHED = "published",
  TRASH = "trash",
}

export interface GetContentsType {
  query?: string;
  category?: string;
  type?: ContentStatusEnum;
}
