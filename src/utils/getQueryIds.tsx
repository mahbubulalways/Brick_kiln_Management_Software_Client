// utils/getQueryIds.ts
export const getQueryIds = (ids: number[]): string => {
  if (!ids?.length) return "";
  return ids.join(",");
};
