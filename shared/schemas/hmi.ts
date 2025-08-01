import { Type, type Static } from '@sinclair/typebox';
import { Nullable } from './null';

export const CreateHmiDto = Type.Object({
  labId: Nullable(Type.String({
    description: 'ID of the lab to which the HMI belongs',
  })),
  expiresIn: Type.Integer({ default: 86400 * 30, description: 'Expiration time in seconds (default: 30 days)' }),
});
export type CreateHmiDto = Static<typeof CreateHmiDto>;

export const HmiTokenDto = Type.Object({
  id: Type.String({ description: 'ID of the HMI' }),
  token: Type.String({ description: 'JWT token for HMI authentication' }),
});
export type HmiTokenDto = Static<typeof HmiTokenDto>;