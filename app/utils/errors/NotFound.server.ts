import { json } from "@remix-run/node";

/**
 * Returns a JSON 404 Not Found error
 * @param data String message or data object to return in the response body
 * @returns Response
 */
export const NotFoundError = (
  data: string | Record<string, any>
) => {
  const responseData = typeof data === "string"
    ? { message: data }
    : data;

  return json({
    error: {
      title: '404 Bad request',
      ...responseData
    }
  }, {
    status: 404
  });
}

