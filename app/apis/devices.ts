import type {
  DeviceCheckerResourceDto,
  ListOfDeviceResourceDto,
  PrintQRCodeDto,
} from '~~/shared/schemas';
import type { CreateDeviceDto, DeviceQuery } from '~~/shared/schemas/device';
import type { PaginateQuery } from '~~/shared/schemas/paginate';

const { PRINT_LABELS_URL } =
  useRuntimeConfig();

export const device = {
  async list(query: PaginateQuery<DeviceQuery>): Promise<ListOfDeviceResourceDto> {
    return $fetch('/api/devices', { query });
  },

  async create(data: CreateDeviceDto[]): Promise<{ count: number }> {
    return $fetch('/api/devices', {
      method: 'POST',
      body: data,
    });
  },

  async printQRCode({ devices }: { devices: PrintQRCodeDto[] }): Promise<void> {
    return await $fetch(
      PRINT_LABELS_URL,
      {
        method: 'POST',
        body: { devices },
      },
    );
  },

  async updatePrintedAt(
    devices: { id: string; printedAt: Date }[],
  ): Promise<void> {
    return await $fetch('/api/devices/printed', {
      method: 'PATCH',
      body: devices.map((device) => ({
        id: device.id,
        printed_at: device.printedAt,
      })),
    });
  },

  async checkDevice(
    deviceId: string,
    lab_id: string,
  ): Promise<DeviceCheckerResourceDto> {
    return await $fetch(`/api/devices/${deviceId}/checked`, {
      method: 'POST',
      body: {
        lab_id,
      },
    });
  },
};
