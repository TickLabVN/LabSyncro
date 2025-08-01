import { Type } from '@sinclair/typebox';
import { DeviceQuantityDto } from '~~/shared/schemas/deviceKind';

export default defineApi({
  query: Type.Object({ search: Type.Optional(Type.String()) }),
  params: Type.Object({ id: Type.String() }),
  response: Type.Array(DeviceQuantityDto),
}, async (event) => {
  const labs = await db.lab.findMany({
    select: {
      id: true,
      name: true,
      branch: true,
      room: true,
      _count: {
        select: { devices: { where: { deletedAt: null, deviceKindId: event.routerParams.id, status: 'HEALTHY' } } },
      },
    },
    where: {
      name: event.query.search ? { contains: event.query.search, mode: 'insensitive' } : undefined,
      deletedAt: null,
      devices: { some: { deviceKindId: event.routerParams.id, deletedAt: null } }
    }
  });

  return labs.map((lab) => ({
    id: lab.id,
    name: lab.name,
    branch: lab.branch,
    room: lab.room,
    borrowableQuantity: lab._count.devices,
  }));
});
