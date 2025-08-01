import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';

export const FacultyResourceDto = Type.Object({
  faculties: Type.Array(
    Type.Object({
      id: Type.Number(),
      name: Type.String(),
    }),
  ),
});

export type FacultyResourceDto = Static<typeof FacultyResourceDto>;

export const BorrowedReceiptResourceDto = Type.Object({
  receipts: Type.Array(
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      mainImage: Type.String(),
      subImages: Type.Array(Type.String()),
      quantity: Type.Number(),
      borrowedPlace: Type.String(),
      returnedPlace: Type.String(),
      borrowedAt: Type.Date(),
      expectedReturnedAt: Type.Date(),
      status: Type.String(),
    }),
  ),
  totalPages: Type.Number(),
  currentPage: Type.Number(),
});

export type BorrowedReceiptResourceDto = Static<
  typeof BorrowedReceiptResourceDto
>;

export const ReadyBorrowedDevicesResourceDto = Type.Object({
  devices: Type.Array(
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      mainImage: Type.String(),
      subImages: Type.Array(Type.String()),
      quantity: Type.Number(),
      place: Type.String(),
    }),
  ),
  totalPages: Type.Number(),
  currentPage: Type.Number(),
});

export type ReadyBorrowedDevicesResourceDto = Static<
  typeof ReadyBorrowedDevicesResourceDto
>;

export const ReturnedReceiptResourceDto = Type.Object({
  receipts: Type.Array(
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      mainImage: Type.String(),
      subImages: Type.Array(Type.String()),
      borrowedPlace: Type.String(),
      returnedPlace: Type.String(),
      borrowedAt: Type.Date(),
      expectedReturnedAt: Type.Date(),
      returnedAt: Type.Date(),
      status: Type.String(),
      deviceStatus: Type.String(),
      note: Type.Union([Type.String(), Type.Null()]),
    }),
  ),
  totalPages: Type.Number(),
  currentPage: Type.Number(),
});

export type ReturnedReceiptResourceDto = Static<
  typeof ReturnedReceiptResourceDto
>;

export const ListOfDeviceKindResourceDto = Type.Object({
  deviceKinds: Type.Array(
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      brand: Type.Union([Type.String(), Type.Null()]),
      manufacturer: Type.Union([Type.String(), Type.Null()]),
      mainImage: Type.String(),
      subImages: Type.Array(Type.String()),
      quantity: Type.Number(),
      borrowableQuantity: Type.Number(),
      category: Type.String(),
      unit: Type.String(),
      description: Type.Union([Type.String(), Type.Null()]),
      meta: Type.Union([
        Type.Record(
          Type.String(),
          Type.Union([Type.String(), Type.Number(), Type.Null()]),
        ),
        Type.Null(),
      ]),
      dataSheet: Type.Union([Type.String(), Type.Null()]),
    }),
  ),
  totalPages: Type.Number(),
  currentPage: Type.Number(),
});

export type ListOfDeviceKindResourceDto = Static<
  typeof ListOfDeviceKindResourceDto
>;

export const ListOfDeviceResourceDto = Type.Object({
  devices: Type.Array(
    Type.Object({
      id: Type.String(),
      kind: Type.String(),
      status: Type.String(),
      room: Type.String(),
      branch: Type.String(),
      price: Type.String(),
      createdAt: Type.Date(),
      printedAt: Type.Union([Type.Date(), Type.Null()]),
    }),
  ),
  totalPages: Type.Number(),
  currentPage: Type.Number(),
});

export type ListOfDeviceResourceDto = Static<typeof ListOfDeviceResourceDto>;

export const UserDto = Type.Object({
  id: Type.String(),
  avatar: Type.Union([Type.String(), Type.Null()]),
  tel: Type.Union([Type.String(), Type.Null()]),
  name: Type.String(),
  email: Type.String(),
  lastActiveAt: Type.Date(),
  roles: Type.Array(Type.String()),
});

export type UserDto = Static<typeof UserDto>;

export const PrintQRCodeDto = Type.Object({
  id: Type.String(),
  name: Type.String(),
  url: Type.String(),
});

export type PrintQRCodeDto = Static<typeof PrintQRCodeDto>;
