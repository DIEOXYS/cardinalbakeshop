import {Arrow} from '../Icons.jsx';
import './HeroSection.css';

export default function HeroSection() {
  return <section className="home-hero" aria-labelledby="hero-heading">
    <img className="hero-background" src="/images/cardinal-table-hero.jpg" width="1672" height="941" alt="" fetchPriority="high"/>
    <div className="hero-shade" aria-hidden="true"/>
    <div className="hero-inner home-container">
      <h1 id="hero-heading">Cardinal Bakeshop</h1>
      <p className="hero-tagline">Baked with Pride</p>
      <p className="hero-description">Breads, pastries, whole cakes, cookies and delicacies.</p>
      <div className="hero-actions">
        <a className="home-button" href="/menu">Explore our menu <Arrow/></a>
        <a className="home-button hero-button-outline" href="https://www.facebook.com/cebucardinalbakeshop" target="_blank" rel="noopener noreferrer" aria-label="Pickup & delivery inquiries on Facebook">Pickup & delivery <Arrow diagonal/></a>
      </div>
    </div>
  </section>;
}
