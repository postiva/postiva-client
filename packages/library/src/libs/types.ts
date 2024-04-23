export interface PostivaClientOptions {
  debug?: boolean;
}

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

export interface ContentAnalytics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  claps: number;
}

export interface DetailContent extends Content {
  analytics: ContentAnalytics;
}

export interface Content {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  categories: ContentCategory[];
  publishedBy: ContentPublishedBy | null;
  description: string | null;
  publishedAt: string | null;
  slug: string;
  thumbnail: string | null;
  body: string;
  html: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoThumbnail: string | null;
  readingStatus: ContentReadingStatus | null;
  analytics: ContentAnalytics | null;
}

export interface ClapParams {
  count: number;
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

export interface GetCategoriesType {
  query?: string;
}
