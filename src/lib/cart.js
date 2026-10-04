export const CART_STORAGE_KEY = 'cardinalbakeshop.cart.v1';
export const lineKey = (productId, flavor = '') => JSON.stringify([productId, flavor]);

export function restoreCart(value, products) {
  if (!Array.isArray(value)) return [];
  const restored = new Map();
  for (const line of value) {
    if (!line || typeof line.productId !== 'string') continue;
    const product = products.get(line.productId);
    const flavor = typeof line.flavor === 'string' ? line.flavor : '';
    if (!product || !Number.isSafeInteger(line.quantity) || line.quantity < 1) continue;
    if (product.flavors ? !product.flavors.includes(flavor) : flavor !== '') continue;
    const key = lineKey(product.id, flavor);
    const quantity = (restored.get(key)?.quantity ?? 0) + line.quantity;
    if (!Number.isSafeInteger(product.price * quantity)) continue;
    restored.set(key, {productId: product.id, flavor, quantity});
  }
  return [...restored.values()];
}

export function addToCart(cart, productId, flavor = '') {
  const key = lineKey(productId, flavor);
  const existing = cart.find((line) => lineKey(line.productId, line.flavor) === key);
  if (!existing) return [...cart, {productId, flavor, quantity: 1}];
  if (!Number.isSafeInteger(existing.quantity + 1)) return cart;
  return cart.map((line) => lineKey(line.productId, line.flavor) === key ? {...line, quantity: line.quantity + 1} : line);
}

export function changeQuantity(cart, key, difference) {
  return cart.map((line) => {
    if (lineKey(line.productId, line.flavor) !== key) return line;
    const quantity = line.quantity + difference;
    return Number.isSafeInteger(quantity) ? {...line, quantity} : line;
  }).filter((line) => line.quantity > 0);
}

export function cartSubtotal(cart, products) {
  return cart.reduce((total, line) => total + (products.get(line.productId)?.price ?? 0) * line.quantity, 0);
}
