export function isRoutableModelName(model: string): boolean {
  const value = model.trim();
  return value.length > 0 && !value.includes(":");
}
