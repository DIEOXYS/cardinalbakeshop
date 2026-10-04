import {CartIcon} from '../Icons.jsx';
import {products, money, unitLabel} from '../../lib/menu.js';
import {cartSubtotal, lineKey} from '../../lib/cart.js';
import './CartPanel.css';

export default function CartPanel({cart, onChange, onRemove, storageAvailable, announcement}) {
  return <aside id="cart" className="cart-panel" aria-labelledby="cart-heading" tabIndex="-1">
    <div className="cart-title"><h2 id="cart-heading">Your cart</h2><CartIcon /></div>
    <p className={announcement ? 'cart-feedback' : 'sr-only'} role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
    {cart.length === 0 ? <div className="cart-empty"><p>Your cart is empty.</p><span>Add items from the menu to build your cart.</span></div>
      : <ul className="cart-items">{cart.map((line) => {
        const product = products.get(line.productId);
        const key = lineKey(line.productId, line.flavor);
        const name = `${product.name}${line.flavor ? `, ${line.flavor}` : ''}`;
        return <li key={key} className="cart-item">
          <div className="cart-item-heading"><h3>{product.name}</h3><span>{money(product.price * line.quantity)}</span></div>
          <p>{line.flavor ? `${line.flavor} · ` : ''}{unitLabel(product)}</p>
          <div className="cart-item-controls"><div className="quantity-control" role="group" aria-label={`Quantity for ${name}`}>
            <button type="button" onClick={() => onChange(key, -1)} aria-label={`Decrease quantity of ${name}`}>−</button>
            <span aria-label={`${line.quantity} ${name}`}>{line.quantity}</span>
            <button type="button" onClick={() => onChange(key, 1)} aria-label={`Increase quantity of ${name}`}>+</button>
          </div><button className="remove-button" type="button" onClick={() => onRemove(key)} aria-label={`Remove ${name} from cart`}>Remove</button></div>
        </li>;
      })}</ul>}
    <div className="cart-total"><span>Subtotal</span><strong>{money(cartSubtotal(cart, products))}</strong></div>
    <p className="checkout-note">This website does not submit orders or take payments. Contact us on Facebook for order inquiries.</p>
    {!storageAvailable && <p className="storage-note" role="status">Your browser cannot save this cart. Keep this tab open while choosing your items.</p>}
  </aside>;
}
