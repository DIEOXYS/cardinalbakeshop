import {Arrow} from '../Icons.jsx';
import './FulfillmentSection.css';

export default function FulfillmentSection() {
  return <section className="sharing-section" aria-labelledby="sharing-heading"><div className="sharing-inner home-container">
    <h2 id="sharing-heading">Pickup<em>and delivery.</em></h2>
    <div className="sharing-copy"><p>Ask about pickup locations, delivery availability and arrangements through our Facebook page.</p><a className="home-button home-button-light" href="https://www.facebook.com/cebucardinalbakeshop" target="_blank" rel="noopener noreferrer">Contact us on Facebook <Arrow diagonal/></a></div>
  </div></section>;
}
