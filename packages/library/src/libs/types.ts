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
  pagination: IPagination;
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
  similarityContents: SimilarContent[];
}

export interface Content {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
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

export interface SimilarContent {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  tags: string;
  thumbnail: string | null;
  createdAt: string;
  publishedBy: ContentPublishedBy | null;
  publishedAt: string;
  readingStatus: ContentReadingStatus;
  type: ContentStatusEnum;
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
  categories?: string[];
  tags?: string[];
  type?: ContentStatusEnum;
  pagination?: IPaginatinoOptions;
}

export interface GetRandomContents {
  tags?: string[];
  limit?: number;
}

export interface GetCategoriesType {
  query?: string;
}
