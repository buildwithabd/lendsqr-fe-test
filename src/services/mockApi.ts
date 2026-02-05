import mockUsers from '../data/mockUsers';
import type { User, PaginatedResponse, SingleResponse, UserFilters } from '../types/user.types';

// Simulate API delay
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API service
export const mockApi = {
  // Get all users with pagination
  async getUsers(page: number = 1, limit: number = 100): Promise<PaginatedResponse<User>> {
    await delay(500); // Simulate network delay

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = mockUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      total: mockUsers.length,
      page,
      limit,
      totalPages: Math.ceil(mockUsers.length / limit),
    };
  },

  // Get single user by ID
  async getUserById(id: number): Promise<SingleResponse<User>> {
    await delay(300);
    const user = mockUsers.find((u) => u.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return { data: user };
  },

  // Filter users
  async filterUsers(filters: UserFilters): Promise<PaginatedResponse<User>> {
    await delay(400);

    let filtered = [...mockUsers];

    (Object.keys(filters) as Array<keyof UserFilters>).forEach((key) => {
      const filterValue = filters[key];
      if (filterValue) {
        filtered = filtered.filter((user) =>
          user[key].toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    });

    return {
      data: filtered,
      total: filtered.length,
      page: 1,
      limit: filtered.length,
      totalPages: 1,
    };
  },
};
