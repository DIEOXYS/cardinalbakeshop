import contact from '../data/contact.json';
import './SiteFooter.css';

export default function SiteFooter({variant} = {}) {
  const footer = <footer className="site-footer"><div className="footer-identity"><a className="footer-brand" href="/">Cardinal Bakeshop</a><p>Baked with Pride</p></div>
    <nav aria-label="Explore Cardinal Bakeshop"><h2>Explore</h2>
      <a href="/">Home</a><a href="/menu">Our menu</a><a href="/#contact">Location & contact</a>
    <a href="/price-list.png" target="_blank" rel="noopener noreferrer">Original price list</a>
    </nav><nav aria-label="Connect with Cardinal Bakeshop"><h2>Connect</h2>
    <a href="https://www.facebook.com/cebucardinalbakeshop" target="_blank" rel="noopener noreferrer">Facebook</a>
    <a href="https://www.instagram.com/cardinalbakeshop/" target="_blank" rel="noopener noreferrer">Instagram</a>
    <a className="footer-email" href={`mailto:${contact.email}`}>{contact.email}</a>
  </nav><div className="footer-bottom"><span>© {new Date().getFullYear()} Cardinal Bakeshop</span><a href="#site-top">Back to top <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 20V4m-6 6 6-6 6 6"/></svg></a></div></footer>;
  return variant === 'home' ? <div className="home-footer"><div className="home-container">{footer}</div></div> : footer;
}
