export const objectToQuery = (obj: Record<string, any>): string => {
  const query = Object.entries(obj)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return query ? `?${query}` : "";
};

export const queryToObject = (query: string): Record<string, any> => {
  const result: Record<string, any> = {};
  const queryString = query.startsWith("?") ? query.substring(1) : query;
  if (!queryString) return result;
  queryString.split("&").forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key) {
      result[decodeURIComponent(key)] = value ? decodeURIComponent(value) : "";
    }
  });
  return result;
};
