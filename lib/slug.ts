export const toBrandSlug = (brandName: string) => {
  return brandName.toLowerCase().trim().replace(/\s+/g, "-");
};
