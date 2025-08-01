import { Type, type Static } from '@sinclair/typebox';
import { DeviceStatus, UserRole } from '~~/server/db/prisma/client';
import { Nullable } from './null';

export const DeviceQuery = Type.Object({
  deviceKindId: Type.Optional(Type.String()),
  labId: Type.Optional(Type.String()),
  search: Type.Optional(Type.String()),
});
export type DeviceQuery = Static<typeof DeviceQuery>;

export const CreateDeviceDto = Type.Object({
  kindId: Type.String(),
  labId: Type.String(),
});
export type CreateDeviceDto = Static<typeof CreateDeviceDto>;

export const DeviceDto = Type.Object({
  id: Type.String(),
  kindId: Type.String(),
  status: Type.Enum(DeviceStatus),
  room: Nullable(Type.String()),
  branch: Nullable(Type.String()),
  price: Nullable(Type.Number()),
  unit: Nullable(Type.String()),
  createdAt: Type.Date(),
  printedAt: Nullable(Type.Date()),
});
export type DeviceDto = Static<typeof DeviceDto>;

export const DeviceStatusDto = Type.Object({
  id: Type.String(),
  status: Type.String(),
  requiredBorrowerRoles: Type.Array(Type.Enum(UserRole)),
});
export type DeviceStatusDto = Static<typeof DeviceStatusDto>;