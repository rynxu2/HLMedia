/**
 * Parse and validate a route :id parameter as a positive integer.
 */
export function parseId(id: string | string[]): number {
  const raw = Array.isArray(id) ? id[0] : id;
  const parsed = parseInt(raw, 10);
  if (isNaN(parsed) || parsed < 1) {
    throw Object.assign(new Error("Invalid ID"), { status: 400 });
  }
  return parsed;
}

