export function removeEmptyStrings<T extends object>(obj: T): T {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (value === "") return undefined; // removes it from JSON
      return value;
    })
  );
}
