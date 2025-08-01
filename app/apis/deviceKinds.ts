import type { DeviceKindDto, DeviceKindQuery, DeviceQuantityDto } from '~~/shared/schemas/deviceKind';
import type { Paginated } from '~~/shared/schemas/paginate';

const { $cachedFetch } = useNuxtApp();

export const deviceKind = {
  async list(query: DeviceKindQuery): Promise<Paginated<DeviceKindDto>> {
    return $cachedFetch('/api/device-kinds', {
      query,
      ttl: 60,
    });
  },
  async getById(id: string, labId?: string): Promise<DeviceKindDto> {
    return $cachedFetch(`/api/device-kinds/${id}`, {
      ttl: 60,
      query: labId ? { labId } : undefined,
    });
  },
  async getQuantity(id: string, search?: string): Promise<DeviceQuantityDto[]> {
    return $fetch(`/api/device-kinds/${id}/quantity`, {
      query: { search },
    });
  },
  async deleteByIds(ids: string[]): Promise<{ count: number }> {
    return $fetch('/api/device-kinds', {
      method: 'DELETE',
      query: { ids },
    });
  },
};
