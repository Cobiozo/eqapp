const escapeReverse = (
  unsafeStr: string
): string => {

  return unsafeStr
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
}


const escapeDangerReverse = (
  unsafeData: any
): any => {
  
    if (!unsafeData) return unsafeData
    if (typeof unsafeData === 'string')
      return escapeReverse(unsafeData);
    if (typeof unsafeData === 'object' && Array.isArray(unsafeData))
      return unsafeData.map(escapeDangerReverse);
    if (typeof unsafeData === 'object') {
      const safeData: Record<keyof typeof unsafeData, any> = {};
      for(const key in unsafeData) {
        safeData[key] = escapeDangerReverse(unsafeData[key]);
      }
      return safeData;
    }
  
    return unsafeData;

}
export default escapeDangerReverse;
