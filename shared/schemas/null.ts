import { Type, type TSchema } from '@sinclair/typebox';

export const Nullable = <D extends TSchema>(T: D) => Type.Union([Type.Null(), T, Type.Undefined()]);