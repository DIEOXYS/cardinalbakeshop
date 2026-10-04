import {CartIcon} from '../Icons.jsx';
import {money} from '../../lib/menu.js';
import './MobileCartLink.css';

export default function MobileCartLink({count, subtotal}) {
  return count > 0 && <a className="mobile-cart-link" href="#cart"><span><CartIcon/> View cart ({count})</span><strong>{money(subtotal)}</strong></a>;
}
