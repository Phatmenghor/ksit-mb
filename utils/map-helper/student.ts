export function cleanRequiredField(value?: string | null): string {
  if (!value) throw new Error("Required field is missing");
  const trimmed = value.trim();
  if (trimmed === "") throw new Error("Required field is empty");
  return trimmed;
}

/**
 * Trim a string input; return undefined if it's null, undefined, or empty after trim.
 */
export function cleanField(value?: string | null): string | undefined {
  if (value == null) return undefined;
  const t = value.trim();
  return t === "" ? undefined : t;
}
