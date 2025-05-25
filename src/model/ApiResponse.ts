export interface Meta {
  status: boolean;
  message: string;
}

export interface ApiResponse<T> {
  _embedded: T;
  _links?: {
    first?: { href: string };
    self?: { href: string };
    next?: { href: string };
    last?: { href: string };
    prev?: { href: string };
  };
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
