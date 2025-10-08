import { json } from "@remix-run/node";

/**
 * Returns a JSON 500 Iternal error
 * @param data String message or data object to return in the response body
 * @returns Response
 */
export const InternalError = (
  data: string | Record<string, any>
) => {
  const responseData = typeof data === "string"
    ? { message: data }
    : data;

  return json({
    error: {
      title: '500 Internal server error',
      ...responseData
    }
  }, {
    status: 500
  });
}

