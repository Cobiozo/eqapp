import { json } from "@remix-run/node";

/**
 * Returns a JSON 401 Unauthorized error
 * @param data String message or data object to return in the response body
 * @returns Response
 */
export const UnauthorizedError = (
  data: string | Record<string, any>
) => {
  const responseData = typeof data === "string"
    ? { message: data }
    : data;

  return json({
    error: {
      title: '401 Unauthorized',
      ...responseData
    }
  }, {
    status: 401
  });
}
