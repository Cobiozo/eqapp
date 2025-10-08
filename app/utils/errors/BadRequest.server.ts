import { json } from "@remix-run/node";

/**
 * Returns a JSON 400 Bad Request error
 * @param data String message or data object to return in the response body
 * @returns Response
 */
export const BadRequestError = (
  data: string | Record<string, any>
) => {
  const responseData = typeof data === "string"
    ? { message: data }
    : data;

  return json({
    error: {
      title: '400 Bad request',
      ...responseData
    }
  }, {
    status: 400
  });
}

