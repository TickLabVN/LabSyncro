import type { LabQuery, LabDto } from '~~/shared/schemas/lab';

const { $cachedFetch: fetch } = useNuxtApp();

export const lab = {
  async list(query?: LabQuery): Promise<LabDto> {
    return await fetch('/api/labs', {
      query,
      ttl: 300,
    });
  },

  async setHmiLab(hmiCode: string, labId: string): Promise<{ success: boolean; message: string }> {
    return await $fetch('/api/auth/hmi/lab', {
      method: 'POST',
      body: {
        hmiCode,
        labId,
      },
    });
  },
};
