export function cleanRequired(value?: string | null): string {
  if (!value) throw new Error("Required field is missing");
  const trimmed = value.trim();
  if (trimmed === "") throw new Error("Required field is empty");
  return trimmed;
}

export function clean(value?: string | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}
