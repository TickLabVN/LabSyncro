import type { CategoryDto } from '~~/shared/schemas';

export const categorySvc = {
  async getAll(): Promise<CategoryDto[]> {
    const { $cachedFetch } = useNuxtApp();
    return $cachedFetch('/api/categories', { ttl: 60 });
  },
  async get(id: number): Promise<CategoryDto> {
    return await $fetch(`/api/categories/${id}`);
  },
};
