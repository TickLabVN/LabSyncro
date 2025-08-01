import type { UserDto } from '~~/shared/schemas';

export const user = {
  async getById(id: string): Promise<UserDto> {
    return $fetch(`/api/users/${id}`);
  },
  async list(): Promise<UserDto[]> {
    return $fetch('/api/users');
  }
};