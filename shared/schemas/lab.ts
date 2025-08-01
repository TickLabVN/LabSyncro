import { Type, type Static } from '@sinclair/typebox';
import { Nullable } from './null';

export const LabQuery = Type.Object({ 
  search: Type.Optional(Type.String()), 
  adminId: Type.Optional(Type.String()) 
});
export type LabQuery = Static<typeof LabQuery>;

// Response
const AdminDto = Type.Object({
  id: Type.String(),
  name: Type.String(),
  tel: Nullable(Type.String()),
  email: Nullable(Type.String()),
});
export const LabDto = Type.Object({
  id: Type.String(),
  branch: Type.String(),
  name: Type.String(),
  room: Type.String(),
  timetable: Type.Record(Type.String(), Type.Array(Type.String())),
  admin: Nullable(AdminDto),
});
export type LabDto = Static<typeof LabDto>;

export const AdminLabDto = Type.Object({
  id: Type.String(),
  branch: Type.String(),
  name: Type.String(),
  room: Type.String(),
  timetable: Type.Record(Type.String(), Type.Array(Type.String())),
});
