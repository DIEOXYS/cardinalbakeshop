import {Arrow} from '../Icons.jsx';
import {products, money} from '../../lib/menu.js';
import {productImage} from '../../lib/productImages.js';
import './FeaturedSection.css';

const featured = [
  {category: 'breads-pastries', productId: 'ube-ensaymada', unit: 'Box of 9'},
  {category: 'cakes', productId: 'mango-cream-cake', unit: 'Whole cake'},
  {category: 'breads-pastries', productId: 'egg-tart', unit: 'Box of 9'},
  {category: 'cookies-delicacies', productId: 'caramel-crunch', unit: 'Per jar'},
];

export default function FeaturedSection() {
  return <section id="bakes" className="home-collections home-container" aria-labelledby="bakes-heading">
    <div className="home-section-heading"><h2 id="bakes-heading">From our menu</h2><p>Breads and pastries, whole cakes, and treats by the jar.</p></div>
    <div className="signature-grid">{featured.map((item) => {
      const product = products.get(item.productId);
      const image = productImage(item.productId);
      return <article className="signature-card" key={item.productId}>
        <div className="signature-photo"><img src={image.src} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async"/></div>
        <div className="signature-copy"><h3>{product.name}</h3>
          <div className="signature-price"><strong>{money(product.price)}</strong><span>{item.unit}</span></div>
          <a className="home-text-link" href={`/menu?category=${item.category}#product-${product.id}`} aria-label={`View ${product.name} on the menu`}>View on menu <Arrow/></a>
        </div>
      </article>;
    })}</div>
  </section>;
}
