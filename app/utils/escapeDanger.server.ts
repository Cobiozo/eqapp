const escape = (
  unsafeStr: string
): string => {

  return unsafeStr
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

}

const escapeDanger = (
  unsafeData: any
): any => {

  if (!unsafeData) return unsafeData
  if (typeof unsafeData === 'string')
    return escape(unsafeData);
  if (typeof unsafeData === 'object' && Array.isArray(unsafeData))
    return unsafeData.map(escapeDanger);
  if (typeof unsafeData === 'object') {
    const safeData: Record<keyof typeof unsafeData, any> = {};
    for(const key in unsafeData) {
      safeData[key] = escapeDanger(unsafeData[key]);
    }
    return safeData;
  }

  return unsafeData;

}

export default escapeDanger;
