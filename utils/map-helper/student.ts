/**
 * Ensures that a required string field is provided and not empty.
 * - Throws an error if the value is undefined, null, or only whitespace.
 * - Returns the trimmed string if valid.
 *
 * @param value - The string value to check.
 * @returns The trimmed non-empty string.
 * @throws Error if the value is missing or empty.
 */
export function cleanRequiredField(value?: string | null): string {
  if (!value) throw new Error("Required field is missing"); // Check for undefined or null
  const trimmed = value.trim();
  if (trimmed === "") throw new Error("Required field is empty"); // Check for only whitespace
  return trimmed; // Return trimmed value
}

/**
 * Cleans up an optional string field.
 * - Trims the string if present.
 * - Returns undefined if the input is null, undefined, or becomes empty after trimming.
 *
 * @param value - The optional string value.
 * @returns The trimmed string or undefined.
 */
export function cleanField(value?: string | null): string | undefined {
  if (value == null) return undefined; // Skip if null or undefined
  const t = value.trim();
  return t === "" ? undefined : t; // Return undefined if only whitespace, otherwise trimmed string
}
