import './Shop.css';
import {useEffect, useState} from 'react';
import menu from '../data/menu.json';
import {products} from '../lib/menu.js';
import {addToCart, CART_STORAGE_KEY, cartSubtotal, changeQuantity, lineKey, restoreCart} from '../lib/cart.js';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';
import MenuIntroduction from './shop/MenuIntroduction.jsx';
import ProductMenu from './shop/ProductMenu.jsx';
import CartPanel from './shop/CartPanel.jsx';
import MobileCartLink from './shop/MobileCartLink.jsx';

export default function Shop({initialCategory}) {
  const [categoryId, setCategoryId] = useState(() => menu.categories.some((item) => item.id === initialCategory) ? initialCategory : menu.categories[0].id);
  const [query, setQuery] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [cart, setCart] = useState(() => {
    try { return restoreCart(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '[]'), products); } catch { return []; }
  });
  useEffect(() => {
    try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); } catch { setStorageAvailable(false); }
  }, [cart]);
  const category = menu.categories.find((item) => item.id === categoryId);
  const search = query.trim().toLocaleLowerCase();
  const displayed = search ? menu.categories.flatMap((item) => item.items).filter((product) => `${product.name} ${(product.flavors ?? []).join(' ')}`.toLocaleLowerCase().includes(search)) : category.items;
  const count = cart.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cartSubtotal(cart, products);
  function handleAdd(product, flavor) {
    setCart((current) => addToCart(current, product.id, flavor));
    setAnnouncement(`${product.name}${flavor ? `, ${flavor}` : ''} added to your cart. ${count + 1} items in your cart.`);
  }
  function handleChange(key, difference) {
    setCart((current) => changeQuantity(current, key, difference)); setAnnouncement(`Cart quantity updated. ${count + difference} items in your cart.`);
  }
  function handleRemove(key) {
    const removed = cart.find((line) => lineKey(line.productId, line.flavor) === key);
    setCart((current) => current.filter((line) => lineKey(line.productId, line.flavor) !== key));
    setAnnouncement(`Item removed. ${count - (removed?.quantity ?? 0)} items in your cart.`);
  }
  return <>
    <a className="skip-link" href="#menu">Skip to menu</a>
    <SiteHeader count={count} page="menu"/>
    <main id="top" className="page-shell">
      <MenuIntroduction/>
      <div className="shop-layout">
        <ProductMenu categoryId={categoryId} category={category} search={search} query={query} displayed={displayed} onCategoryChange={(id) => {setCategoryId(id); setQuery('');}} onQueryChange={setQuery} onAdd={handleAdd}/>
        <CartPanel cart={cart} onChange={handleChange} onRemove={handleRemove} storageAvailable={storageAvailable} announcement={announcement}/>
      </div>
      <SiteFooter/>
    </main>
    <MobileCartLink count={count} subtotal={subtotal}/>
  </>;
}
