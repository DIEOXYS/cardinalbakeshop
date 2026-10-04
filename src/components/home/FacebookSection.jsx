import {Arrow} from '../Icons.jsx';
import './FacebookSection.css';

export default function FacebookSection() {
  return <section className="home-explore" aria-labelledby="explore-heading"><div className="home-container">
    <div className="home-section-heading"><h2 id="explore-heading">Cardinal on Facebook</h2></div>
    <a className="explore-banner" href="https://www.facebook.com/cebucardinalbakeshop" target="_blank" rel="noopener noreferrer"><img src="/images/caramel-crunch.jpg" width="1084" height="1084" alt="Cardinal Caramel Crunch in its branded jar" loading="lazy"/><span className="explore-caption"><span>Visit Cardinal Bakeshop on Facebook</span><span className="explore-action">Open Facebook <Arrow diagonal/></span></span></a>
  </div></section>;
}
