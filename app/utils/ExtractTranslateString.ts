export default function extractTranslateString(str: string): [string, string | undefined] {
  const strParts = str.split('|');
  return [strParts[0], strParts[1] || undefined];
}
