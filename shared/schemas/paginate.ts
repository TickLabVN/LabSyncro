import { Type, type Static, type TEnum, type TIntersect, type TObject, type TOptional, type TSchema, type TUndefined } from '@sinclair/typebox';
import { Nullable } from './null';
import { Prisma } from '~~/server/datasources/prisma/client';

const PaginateOptions = Type.Object({
  page: Type.Number({ default: 1 }),
  limit: Type.Number({ default: 10 }),
});

export function PaginateQuery<F extends TSchema, S extends TSchema>(
  filter: F,
  sort?: S
) {
  const options: TSchema[] = [PaginateOptions, filter];
  if (sort) {
    options.push(Type.Object({ sort: Type.Optional(sort) }));
  }
  return Type.Intersect(options) as TIntersect<[typeof PaginateOptions, F, TObject<{
    sort: TOptional<S>;
  }> | TUndefined]>;
};

type SortOptionObject<K extends string> = Record<K, TOptional<TEnum<{
  asc: 'asc';
  desc: 'desc';
}>>>
export function SortOption<K extends string>(fields: K[]) {
  const props = {} as SortOptionObject<K>;
  for (const key of fields)
    props[key] = Type.Optional(Type.Enum(Prisma.SortOrder));
  return Type.Object(props);
}
export function toPrismaSort<T extends string>(
  options: Partial<Record<T, Prisma.SortOrder>>
): Partial<{ [K in T]: Prisma.SortOrder }>[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.entries(options).map(([key, value]) => ({ [key]: value })) as any;
}
export const PaginateMetadataDto = Type.Object({
  pageCount: Type.Number(),
  totalCount: Type.Number(),
  isFirstPage: Type.Boolean(),
  isLastPage: Type.Boolean(),
  currentPage: Type.Number(),
  previousPage: Nullable(Type.Number()),
  nextPage: Nullable(Type.Number()),
});
export type PaginateMetadataDto = Static<typeof PaginateMetadataDto>;

export const PaginateDto = <S extends TSchema>(T: S) => Type.Object({
  data: Type.Array(T),
  meta: PaginateMetadataDto,
});