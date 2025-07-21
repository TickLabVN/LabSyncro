export function getImageUrl(imageId: string) {
  const config = useRuntimeConfig();
  return `${config.IMAGE_CDN_URL}/images/${imageId}`;
}
