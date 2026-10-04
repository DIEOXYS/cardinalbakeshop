import {useState} from 'react';
import {money, unitLabel} from '../../lib/menu.js';
import {productImage} from '../../lib/productImages.js';
import './ProductRow.css';

export default function ProductRow({product, onAdd}) {
  const [flavor, setFlavor] = useState('');
  const image = productImage(product.id, flavor);
  return <article id={`product-${product.id}`} className={`product${image ? ' product--illustrated' : ''}`}>
    {image && <figure className="product-photo">
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async"/>
      {image.flavor && <figcaption>{image.flavor} shown</figcaption>}
    </figure>}
    <div className="product-description"><h3>{product.name}</h3><p className="package-label">{unitLabel(product)}</p>
      {product.flavors && <div className="flavor-field"><label htmlFor={`flavor-${product.id}`}>Flavor</label>
        <select id={`flavor-${product.id}`} value={flavor} onChange={(event) => setFlavor(event.target.value)}>
          <option value="">Choose flavor</option>{product.flavors.map((option) => <option key={option} value={option}>{option}</option>)}
        </select></div>}
    </div>
    <div className="product-action"><span className="product-price">{money(product.price)}</span>
      <button className="add-button" type="button" disabled={Boolean(product.flavors) && !flavor}
        aria-label={`Add ${product.name}${flavor ? `, ${flavor}` : ''} to cart`} onClick={() => onAdd(product, flavor)}>Add</button></div>
  </article>;
}
