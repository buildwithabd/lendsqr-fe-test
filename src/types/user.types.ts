export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: UserStatus;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SingleResponse<T> {
  data: T;
}

export interface UserFilters {
  organization?: string;
  username?: string;
  email?: string;
  phone?: string;
  dateJoined?: string;
  status?: string;
}
