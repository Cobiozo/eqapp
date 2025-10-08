export default function extractError(error: string): [string, string | undefined] {
  const errorParts = error.split('|');
  return [errorParts[0], errorParts[1] || undefined];
}
