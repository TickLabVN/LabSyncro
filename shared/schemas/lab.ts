import { Type } from '@sinclair/typebox';
import { Nullable } from './null';

const LabAdminDto = Type.Object({
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
  admin: Nullable(LabAdminDto),
});

export const AdminLabDto = Type.Object({
  id: Type.String(),
  branch: Type.String(),
  name: Type.String(),
  room: Type.String(),
  timetable: Type.Record(Type.String(), Type.Array(Type.String())),
});
