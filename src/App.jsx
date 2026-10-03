import './App.css';

export default function App() {
  return (
    <main>
      <header>
        <h1>Cardinal Bakeshop</h1>
        <p className="tagline">Baked with Pride</p>
      </header>

      <section aria-labelledby="menu-heading">
        <h2 id="menu-heading">Explore our menu</h2>
        <p>Breads and pastries, cakes, cookies and delicacies.</p>
      </section>

      <nav aria-label="Cardinal Bakeshop social pages">
        <a href="https://www.facebook.com/cebucardinalbakeshop" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.instagram.com/cardinalbakeshop/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </nav>
    </main>
  );
}
