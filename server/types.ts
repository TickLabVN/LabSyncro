import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { ID_LENGTH } from '~/server/constants';

export const ObjectId = Type.String({
  minLength: ID_LENGTH,
  maxLength: ID_LENGTH,
});

export type ObjectId = Static<typeof ObjectId>;
