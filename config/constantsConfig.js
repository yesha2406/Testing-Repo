// Defined status codes for the response
const constants = {
  statusCode: {
    SUCCESS: 200,
    NO_CONTENT: 204,
    CREATED: 201,
    MOVED_PERMENENTLY: 301,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    UNSUPPORTED_MEDIA_TYPE: 415,
    TIMEOUT: 408,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  },
};

module.exports = constants;
