import type { CategoryDto } from '~~/shared/schemas/category';

const { $cachedFetch } = useNuxtApp();
export const category = {
  async getAll(): Promise<CategoryDto[]> {
    return $cachedFetch('/api/categories', { ttl: 60 });
  },
  async get(id: number): Promise<CategoryDto> {
    return $fetch(`/api/categories/${id}`);
  },
};
