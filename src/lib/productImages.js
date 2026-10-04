import images from '../data/product-images.json';

// A flavor-specific reference must never stand in for another selected flavor.
export function productImage(productId, flavor = '') {
  const image = images[productId];
  if (!image || (image.flavor && flavor && image.flavor !== flavor)) return null;
  return image;
}
