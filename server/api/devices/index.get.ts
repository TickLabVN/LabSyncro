import { PaginateDto, PaginateQuery } from '~~/shared/schemas/paginate';
import { DeviceDto, DeviceQuery } from '~~/shared/schemas/device';

export default defineApi({
  query: PaginateQuery(DeviceQuery),
  response: PaginateDto(DeviceDto)
}, (async (event) => {
  const [data, meta] = await db.device.paginate({
    select: {
      id: true,
      status: true,
      deviceKind: {
        select: {
          id: true,
          brand: true,
          price: true,
          unit: true,
        }
      },
      lab: { select: { branch: true, room: true } },
      createdAt: true,
      printedAt: true,
    },
    where: {
      deviceKindId: event.query.deviceKindId,
      labId: event.query.labId,
      deletedAt: null,
      deviceKind: event.query.search ? { name: { contains: event.query.search, mode: 'insensitive' } } : undefined,
    }
  }).withPages({
    page: event.query.page,
    limit: event.query.limit,
  });

  const devices: DeviceDto[] = data.map((device) => ({
    id: device.id,
    kindId: device.deviceKind.id,
    status: device.status,
    room: device.lab?.room,
    branch: device.lab?.branch,
    price: device.deviceKind?.price,
    unit: device.deviceKind?.unit,
    createdAt: device.createdAt,
    printedAt: device.printedAt,
  }));
  return { data: devices, meta };
}));
