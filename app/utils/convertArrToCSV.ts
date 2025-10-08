export const convertArrToCSV = (arr: any[]) => {
  const header = Object.keys(arr[0]).join(",");
  const rows = arr.map((obj) => Object.values(obj).join(","));
  return [header, ...rows].join("\n");
}