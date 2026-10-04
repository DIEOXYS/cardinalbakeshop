import './Home.css';
import {useState} from 'react';
import {products} from '../lib/menu.js';
import {CART_STORAGE_KEY, restoreCart} from '../lib/cart.js';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';
import HeroSection from './home/HeroSection.jsx';
import FeaturedSection from './home/FeaturedSection.jsx';
import GallerySection from './home/GallerySection.jsx';
import FacebookSection from './home/FacebookSection.jsx';
import FulfillmentSection from './home/FulfillmentSection.jsx';
import ContactSection from './home/ContactSection.jsx';

export default function Home() {
  const [count] = useState(() => {
    try { return restoreCart(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '[]'), products).reduce((total, line) => total + line.quantity, 0); } catch { return 0; }
  });
  return <div className="home-page">
    <a className="skip-link" href="#home-content">Skip to content</a>
    <SiteHeader count={count}/>
    <main id="home-content">
      <HeroSection/>
      <FeaturedSection/>
      <GallerySection/>
      <FacebookSection/>
      <FulfillmentSection/>
      <ContactSection/>
    </main>
    <SiteFooter variant="home"/>
  </div>;
}
