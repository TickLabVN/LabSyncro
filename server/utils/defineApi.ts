import type { Static, TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import type { H3Event } from 'h3';
import { getToken } from '#auth';
import type { JWT } from 'next-auth/jwt';
import type { UserRole } from '../db/prisma/client';

type ApiDefinition<
  TParams extends TSchema | undefined = undefined,
  TQuery extends TSchema | undefined = undefined,
  TBody extends TSchema | undefined = undefined,
  TResponse extends TSchema | undefined = undefined
> = {
  params?: TParams;
  query?: TQuery;
  body?: TBody;
  response?: TResponse;
  auth?: boolean;
  roles?: UserRole[];
};

type ApiResponse<TResponse extends TSchema | undefined> = TResponse extends TSchema
  ? Static<TResponse>
  : undefined;
export function defineApi<
  TParams extends TSchema | undefined,
  TQuery extends TSchema | undefined,
  TBody extends TSchema | undefined,
  TResponse extends TSchema | undefined
>(
  { params, query, body, auth = true, roles }: ApiDefinition<TParams, TQuery, TBody, TResponse>,
  handler: (event: H3Event & {
    routerParams: TParams extends TSchema ? Static<TParams> : unknown;
    query: TQuery extends TSchema ? Static<TQuery> : unknown;
    body: TBody extends TSchema ? Static<TBody> : unknown;
    context: H3Event['context'] & { auth: JWT }
  }) => Promise<ApiResponse<TResponse>>
) {
  return defineEventHandler<Promise<ApiResponse<TResponse>>>(async (event) => {
    // Validate params
    let validatedParams: unknown = undefined;
    if (params) {
      const raw = getRouterParams(event);
      const converted = Value.Convert(params, raw);
      if (!Value.Check(params, converted)) {
        throw badRequest('Invalid params');
      }
      validatedParams = converted;
    }

    // Validate query
    let validatedQuery: unknown = undefined;
    if (query) {
      const raw = getQuery(event);
      const converted = Value.Convert(query, raw);
      if (!Value.Check(query, converted)) {
        throw badRequest('Invalid query params');
      }
      validatedQuery = converted;
    }

    // Validate body
    let validatedBody: unknown = undefined;
    if (body) {
      const raw = await readBody(event);
      const converted = Value.Convert(body, raw);
      if (!Value.Check(body, converted)) {
        throw badRequest('Invalid body');
      }
      validatedBody = converted;
    }

    // Check authentication if required
    if (auth) {
      const token = await getToken({ event });
      if (!token) throw unauthorized('You must be logged in to access this resource');
      if (roles) await requireRoles(event, roles);
      event.context.auth = token;
    }

    const decoratedEvent = Object.assign(event, {
      routerParams: validatedParams,
      query: validatedQuery,
      body: validatedBody,
    });
    // @ts-ignore
    return handler(decoratedEvent);
  });
}