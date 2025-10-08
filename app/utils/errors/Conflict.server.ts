import { json } from "@remix-run/node";

/**
 * Returns a JSON 409 Conflict error
 * @param data String message or data object to return in the response body
 * @returns Response
 */
export const ConflictError = (
  data: string | Record<string, any>
) => {
  const responseData = typeof data === "string"
    ? { message: data }
    : data;

  return json({
    error: {
      title: '409 Conflict',
      ...responseData
    }
  }, {
    status: 409
  });
}

