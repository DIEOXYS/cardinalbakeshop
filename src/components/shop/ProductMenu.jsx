import menu from '../../data/menu.json';
import ProductRow from './ProductRow.jsx';
import './ProductMenu.css';

export default function ProductMenu({categoryId, category, search, query, displayed, onCategoryChange, onQueryChange, onAdd}) {
  return <section id="menu" className="menu-section" aria-label="Product menu">
          <nav className="category-navigation" aria-label="Menu categories">{menu.categories.map((item) => <button key={item.id} type="button" aria-pressed={item.id === categoryId} onClick={() => onCategoryChange(item.id)}>{item.name.replace(' / ', ' & ')}</button>)}</nav>
          <div className="menu-toolbar"><h2>{search ? 'Search results' : category.name.replace(' / ', ' & ')}</h2>
            <label className="search-field"><span className="sr-only">Search all menu items</span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>
              <input type="search" placeholder="Search the menu" value={query} onChange={(event) => onQueryChange(event.target.value)} /></label>
          </div>
          <p className="menu-help">Prices are shown with the pack size listed on our menu.</p>
          <div className="product-list">{displayed.map((product) => <ProductRow key={product.id} product={product} onAdd={onAdd} />)}</div>
          {displayed.length === 0 && <div className="search-empty"><h3>No items found</h3><p>Try searching for a different product or flavor.</p><button type="button" onClick={() => onQueryChange('')}>Clear search</button></div>}
        </section>;
}
