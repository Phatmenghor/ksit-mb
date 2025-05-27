export function cleanRequiredField(value?: string | null): string {
  if (!value) throw new Error("Required field is missing"); // Check for undefined or null
  const trimmed = value.trim();
  if (trimmed === "") throw new Error("Required field is empty"); // Check for only whitespace
  return trimmed; // Return trimmed value
}

export function cleanField(value?: string | null): string | undefined {
  if (value == null) return undefined; // Skip if null or undefined
  const t = value.trim();
  return t === "" ? undefined : t; // Return undefined if only whitespace, otherwise trimmed string
}

export function formatValue(value: any) {
  return value === null || value === undefined || value === "" ? "---" : value;
}
