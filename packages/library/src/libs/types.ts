export interface PostivaClientOptions {}

export interface PaginatableResponse<T> {
  pagination: ({ page, size }: { page: number; size: number }) => Promise<T[]>;
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
}
