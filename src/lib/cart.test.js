import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {addToCart, cartSubtotal, changeQuantity, lineKey, restoreCart} from './cart.js';

const menu = JSON.parse(readFileSync(new URL('../data/menu.json', import.meta.url), 'utf8'));
const products = new Map(menu.categories.flatMap((category) => category.items.map((product) => [product.id, product])));

test('box quantity uses the box price, not the number of pieces', () => {
  let cart = addToCart([], 'cheese-roll');
  cart = addToCart(cart, 'cheese-roll');
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 2);
  assert.equal(cartSubtotal(cart, products), 440);
});

test('different flavors remain separate and duplicate flavors merge', () => {
  let cart = addToCart([], 'small-chiffon-cake', 'Orange');
  cart = addToCart(cart, 'small-chiffon-cake', 'Ube');
  cart = addToCart(cart, 'small-chiffon-cake', 'Ube');
  assert.equal(cart.length, 2);
  assert.deepEqual(cart.map((line) => line.quantity), [1, 2]);
  assert.equal(cartSubtotal(cart, products), 540);
});

test('decreasing the last package removes only that cart line', () => {
  const cart = addToCart(addToCart([], 'cheese-roll'), 'yema-bun');
  const updated = changeQuantity(cart, lineKey('cheese-roll'), -1);
  assert.deepEqual(updated, [{productId: 'yema-bun', flavor: '', quantity: 1}]);
  assert.equal(cartSubtotal(updated, products), 220);
});

test('saved cart recovery rejects unavailable IDs, bad quantities and invalid flavors', () => {
  const restored = restoreCart([
    {productId: 'deleted-product', quantity: 1},
    {productId: 'cheese-roll', quantity: -1},
    {productId: 'cheese-roll', quantity: '2'},
    {productId: 'cheese-roll', flavor: 'Ube', quantity: 1},
    {productId: 'small-chiffon-cake', flavor: '', quantity: 1},
    {productId: 'small-chiffon-cake', flavor: 'Banana', quantity: 1},
    {productId: 'cheese-roll', quantity: 2, price: 1},
    {productId: 'small-chiffon-cake', flavor: 'Ube', quantity: 1},
  ], products);
  assert.equal(restored.length, 2);
  assert.equal(cartSubtotal(restored, products), 620);
  assert.equal(Object.hasOwn(restored[0], 'price'), false);
});

test('restoration merges duplicate lines and supports an empty cart', () => {
  assert.deepEqual(restoreCart(null, products), []);
  assert.deepEqual(restoreCart({}, products), []);
  assert.deepEqual(restoreCart([], products), []);
  const restored = restoreCart([
    {productId: 'yema-bun', quantity: 1},
    {productId: 'yema-bun', quantity: 2},
  ], products);
  assert.deepEqual(restored, [{productId: 'yema-bun', flavor: '', quantity: 3}]);
});

test('saved quantities that overflow currency arithmetic are rejected', () => {
  assert.deepEqual(restoreCart([{productId: 'cheese-roll', quantity: Number.MAX_SAFE_INTEGER}], products), []);
});
