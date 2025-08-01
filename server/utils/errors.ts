import { HttpCode } from '../constants/network';

export function internalServerError(message?: string) {
  return createError({
    statusCode: HttpCode.INTERNAL_SERVER_ERROR,
    message: message || 'Internal Server Error',
  });
}

export function badRequest(message?: string) {
  return createError({
    statusCode: HttpCode.BAD_REQUEST,
    message: message || 'Bad Request',
  });
}
export function unauthorized(message?: string) {
  return createError({
    statusCode: HttpCode.UNAUTHORIZED,
    message: message || 'Unauthorized',
  });
}

export function forbidden(message?: string) {
  return createError({
    statusCode: HttpCode.FORBIDDEN,
    message: message || 'Forbidden',
  });
}

export function notFound(message?: string) {
  return createError({
    statusCode: HttpCode.NOT_FOUND,
    message: message || 'Not Found',
  });
}

export function methodNotAllowed(message?: string) {
  return createError({
    statusCode: HttpCode.METHOD_NOT_ALLOWED,
    message: message || 'Method Not Allowed',
  });
}

export function notAcceptable(message?: string) {
  return createError({
    statusCode: HttpCode.NOT_ACCEPTABLE,
    message: message || 'Not Acceptable',
  });
}

export function requestTimeout(message?: string) {
  return createError({
    statusCode: HttpCode.REQUEST_TIMEOUT,
    message: message || 'Request Timeout',
  });
}

export function conflict(message?: string) {
  return createError({
    statusCode: HttpCode.CONFLICT,
    message: message || 'Conflict',
  });
}

export function gone(message?: string) {
  return createError({
    statusCode: HttpCode.GONE,
    message: message || 'Gone',
  });
}

export function unprocessableEntity(message?: string) {
  return createError({
    statusCode: HttpCode.UNPROCESSABLE_ENTITY,
    message: message || 'Unprocessable Entity',
  });
}

export function tooManyRequests(message?: string) {
  return createError({
    statusCode: HttpCode.TOO_MANY_REQUESTS,
    message: message || 'Too Many Requests',
  });
}

export function notImplemented(message?: string) {
  return createError({
    statusCode: HttpCode.NOT_IMPLEMENTED,
    message: message || 'Not Implemented',
  });
}

export function badGateway(message?: string) {
  return createError({
    statusCode: HttpCode.BAD_GATEWAY,
    message: message || 'Bad Gateway',
  });
}

export function serviceUnavailable(message?: string) {
  return createError({
    statusCode: HttpCode.SERVICE_UNAVAILABLE,
    message: message || 'Service Unavailable',
  });
}

export function gatewayTimeout(message?: string) {
  return createError({
    statusCode: HttpCode.GATEWAY_TIMEOUT,
    message: message || 'Gateway Timeout',
  });
}
