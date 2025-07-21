import { Type } from '@sinclair/typebox';
import { DeviceStatusDto } from '~~/shared/schemas/device';

export default defineApi({
  query: Type.Object({ labId: Type.String() }),
  params: Type.Object({ id: Type.String() }),
  response: DeviceStatusDto,
}, async (event) => {
  const deviceId = event.routerParams.id;
  const labId = event.query.labId;

  const device = await db.device.findUniqueOrThrow({
    select: {
      id: true,
      status: true,
      deviceKind: { select: { requiredBorrowerRoles: true } },
    },
    where: {
      id: deviceId,
      labId: labId,
      deletedAt: null,
    },
  });

  return {
    id: device.id,
    status: device.status,
    requiredBorrowerRoles: device.deviceKind.requiredBorrowerRoles,
  };
});
