import menu from '../../data/menu.json';
import {productImage} from '../../lib/productImages.js';
import AccordionGallery from '../AccordionGallery.jsx';
import './GallerySection.css';

const galleryProducts = {'breads-pastries': 'ube-ensaymada', cakes: 'mango-cream-cake', 'cookies-delicacies': 'caramel-crunch'};
const galleryItems = menu.categories.map((category) => {
  const image = productImage(galleryProducts[category.id]);
  return {image: image.src, alt: image.alt, width: image.width, height: image.height,
    id: category.id, label: category.name.replace(' / ', ' & '), link: `/menu?category=${category.id}`};
});

export default function GallerySection() {
  return <section className="bakes-gallery home-container" aria-labelledby="gallery-heading">
    <div className="home-section-heading"><h2 id="gallery-heading">Explore our bakes</h2><p>Select a category to browse its menu.</p></div>
    <AccordionGallery items={galleryItems} defaultIndex={1} expandRatio={0.52} trigger="hover" accentColor="#a40943" overlayColor="#790631" textColor="#fffaf6" grayscale showLabels duration={0.35} ease="power3.out" parallax={0} tilt={0} height={460} gap={10} radius={12} ariaLabel="Browse bakery categories"/>
  </section>;
}
