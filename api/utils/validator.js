export function validateId(id) {
  const num = Number(id);
  if (!id || isNaN(num) || num <= 0) {
    return { valid: false, message: "Invalid ID" };
  }
  return { valid: true, value: num };
}
