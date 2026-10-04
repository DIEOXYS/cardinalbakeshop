import {CartIcon} from './Icons.jsx';
import './SiteHeader.css';

export default function SiteHeader({count = 0, page = 'home'}) {
  return <header id="site-top" className="site-header"><div className="site-header-inner">
    <a className="wordmark" href="/" aria-label="Cardinal Bakeshop home">
      <span className="brand-logo"><img src="/price-list.png" alt="Cardinal. Baked with Pride" width="2048" height="2048" fetchPriority="high"/></span>
    </a>
    <nav className="header-navigation" aria-label="Main navigation">
      <a className="menu-link" href="/menu" aria-current={page === 'menu' ? 'page' : undefined}>Our menu</a>
      <a className="home-section-link" href="/#bakes">Our bakes</a>
      <a className="home-section-link" href="/#contact">Get in touch</a>
      <details className="mobile-navigation">
        <summary aria-label="More navigation links"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg></summary>
        <div className="mobile-navigation-links"><a href="/">Home</a><a href="/#bakes">Our bakes</a><a href="/#contact">Get in touch</a></div>
      </details>
      <a className="header-cart" href={page === 'menu' ? '#cart' : '/menu#cart'} aria-label={`View cart, ${count} items`}><CartIcon/><span className="cart-label">Cart</span><span className="cart-count">{count}</span></a>
    </nav>
  </div></header>;
}
