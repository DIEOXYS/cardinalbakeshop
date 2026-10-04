import contact from '../../data/contact.json';
import {Arrow, ContactIcon, AddressIcon} from '../Icons.jsx';
import './ContactSection.css';

export default function ContactSection() {
  return <section id="contact" className="home-contact home-container" aria-labelledby="contact-heading">
    <div className="home-contact-copy"><h2 id="contact-heading">Let’s keep{' '}<em>in touch.</em></h2><p>Questions about pickup or delivery? Email us or get in touch on Facebook.</p></div>
    <address className="home-contact-details">
        <div className="contact-detail"><AddressIcon/><div><p>{contact.address}</p><a className="home-text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`} target="_blank" rel="noopener noreferrer" aria-label="Find Cardinal Bakeshop on Don Mariano Cui Street in Google Maps">Find us on Google Maps <Arrow diagonal/></a></div></div>
        <div className="contact-detail"><AddressIcon email/><a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a></div>
    </address>
    <nav className="home-social-links" aria-label="Get in touch with Cardinal">
      <a href="https://www.facebook.com/cebucardinalbakeshop" target="_blank" rel="noopener noreferrer"><span className="contact-icon"><ContactIcon/></span><span className="contact-link-copy"><strong>Find us on Facebook</strong><span>Pickup & delivery inquiries</span></span><Arrow diagonal/></a>
      <a href="https://www.instagram.com/cardinalbakeshop/" target="_blank" rel="noopener noreferrer"><span className="contact-icon"><ContactIcon camera/></span><span className="contact-link-copy"><strong>Follow us on Instagram</strong><span>@cardinalbakeshop</span></span><Arrow diagonal/></a>
    </nav>
  </section>;
}
