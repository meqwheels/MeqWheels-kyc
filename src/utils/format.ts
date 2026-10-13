/**
 * Automatically capitalizes the first letter of first name and last name (and any words)
 * while preserving spaces, hyphens, and apostrophes.
 *
 * Examples:
 * - "rahul" -> "Rahul"
 * - "rahul patil" -> "Rahul Patil"
 * - "amit kumar sharma" -> "Amit Kumar Sharma"
 * - "mary-jane watson" -> "Mary-Jane Watson"
 * - "john o'connor" -> "John O'Connor"
 */
export function capitalizeName(input: string): string {
  if (!input) return '';
  return input.replace(/(^|[\s\-'’])(\p{L})/gu, (_, prefix, char) => prefix + char.toUpperCase());
}
