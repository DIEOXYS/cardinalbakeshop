import './MenuIntroduction.css';

export default function MenuIntroduction() {
  return <div className="menu-introduction">
        <nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m9 6 6 6-6 6"/></svg><span aria-current="page">Our menu</span></nav>
        <h1>Explore our menu</h1><p>Breads and pastries, cakes, cookies and delicacies. Prices are in Philippine pesos.</p><p className="fulfillment-label">Pickup and delivery</p>
      </div>;
}
