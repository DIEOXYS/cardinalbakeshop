import menu from '../data/menu.json';

export const products = new Map(menu.categories.flatMap((category) => category.items.map((product) => [product.id, product])));
export const money = (amount) => new Intl.NumberFormat('en-PH', {style: 'currency', currency: menu.currency, maximumFractionDigits: 0}).format(amount);
export const unitLabel = (product) => product.pieces ? `Box of ${product.pieces}` : ({whole: 'Whole', jar: 'Per jar', pack: 'Per pack'}[product.unit] ?? 'Pack size to be confirmed');
