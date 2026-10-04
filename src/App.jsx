import './styles/global.css';
import Shop from './components/Shop.jsx';
import Home from './components/Home.jsx';
import {useEffect} from 'react';

export default function App() {
  useEffect(() => {
    const hash = window.location.hash;
    const target = hash.startsWith('#product-') ? hash.slice(1) : {'#cart': 'cart', '#bakes': 'bakes', '#contact': 'contact'}[hash];
    if (target) document.getElementById(target)?.scrollIntoView();
  }, []);
  const category = new URLSearchParams(window.location.search).get('category');
  return window.location.pathname.replace(/\/$/, '') === '/menu'
    ? <Shop initialCategory={category}/>
    : <Home/>;
}
