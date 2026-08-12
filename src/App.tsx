import { useMemo, useState } from 'react';
import { Facebook, Heart, Instagram, Menu, Search, ShoppingBag, X } from 'lucide-react';

type Lang = 'de' | 'en';
type Product = { nameDe: string; nameEn: string; brand: string; price: number; oldPrice?: number; image: string; tag?: 'new' | 'sale' };

const products: Product[] = [
  { nameDe: 'Vintage 90er Levi\'s 501 Jeans', nameEn: "Vintage 90s Levi's 501 Jeans", brand: "Levi's", price: 48, image: 'https://images.pexels.com/photos/10548744/pexels-photo-10548744.jpeg?auto=compress&cs=tinysrgb&w=900', tag: 'new' },
  { nameDe: 'Vintage Ralph Lauren Denim Shorts', nameEn: 'Vintage Polo Ralph Lauren Denim Shorts', brand: 'Ralph Lauren', price: 21, oldPrice: 30, image: 'https://images.pexels.com/photos/15404804/pexels-photo-15404804.jpeg?auto=compress&cs=tinysrgb&w=900', tag: 'sale' },
  { nameDe: 'Vintage Adidas Trainingsjacke', nameEn: 'Vintage Adidas Track Jacket', brand: 'Adidas', price: 34, image: 'https://images.pexels.com/photos/10427342/pexels-photo-10427342.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { nameDe: 'Vintage Wrangler Westernhemd', nameEn: 'Vintage Wrangler Western Shirt', brand: 'Wrangler', price: 42, image: 'https://images.pexels.com/photos/29346779/pexels-photo-29346779.jpeg?auto=compress&cs=tinysrgb&w=900', tag: 'new' },
];

const t = {
  de: {
    stripA: '40 JAHRE VINTAGE', stripB: 'GRATIS VERSAND AB €75',
    account: 'Konto', giftVoucher: 'Geschenkgutschein',
    searchPh: 'Finde deinen neuen Liebling...', wishlist: 'Wunschliste', bag: 'Warenkorb',
    nav: ['NEU', 'DAMEN', 'HERREN', 'MARKEN', 'UMGESTALTET', 'DENIM', 'SALE'],
    denim: [
      ['Neuheiten', 'Herren Denim', 'Damen Denim', 'Alle Denim'],
      ['Top Marken', "Levi's", 'Lee', 'GWG', 'Wrangler'],
      ['Produkt', 'Jeans', 'Jacken', 'Latzhosen', 'Shorts', 'Hemden', 'Alle Denim-Arten'],
      ['Jeans-Stil', 'High Waist', 'Straight Leg', 'Bootcut', 'Ausgestellt', 'Alle Jeans-Stile'],
      ['Denim-Waschung', 'Schwarz', 'Dunkle Waschung', 'Helle Waschung', 'Mittlere Waschung', 'Stone Wash', 'Alle Waschungen'],
    ],
    menNew: 'HERREN NEU', womenNew: 'DAMEN NEU', saleUpTo: 'BIS ZU', saleOff: 'RABATT', shopNow: 'JETZT SHOPPEN',
    welcomeA: 'VINTAGE', welcomeB: 'FÜR ALLE',
    welcomeP: 'Kuratierte Vintage-Mode, umgestaltete Stücke und ikonische Marken. Einzigartige Fundstücke für dein nächstes Kapitel.',
    shopNewIn: 'NEUHEITEN SHOPPEN',
    freshMicro: 'FRISCH VON DER STANGE', newArrivals: 'NEUHEITEN',
    filters: [['all', 'ALLE'], ['new', 'NEU'], ['sale', 'SALE']] as [string, string][],
    tagNew: 'Neu', tagSale: 'Sale', quickAdd: 'IN DEN KORB', oneOfAKind: 'EINZIGARTIG',
    iconicMicro: 'DIE IKONISCHE AUSWAHL', denimA: 'DENIM', denimB: 'FÜR IMMER.',
    denimP: 'Von klassischen 501ern bis zu seltenen Vintage-Waschungen – entdecke Denim, der nie aus der Mode kommt.',
    shopDenim: 'DENIM SHOPPEN',
    footerTag1: '40 Jahre Vintage.', footerTag2: 'Wir finden immer noch die guten Stücke.',
    shopCol: 'SHOP', shopLinks: ['Neu', 'Damen', 'Herren', 'Denim'],
    helpCol: 'HILFE', helpLinks: ['Versand & Rückgabe', 'Kontakt', 'FAQ', 'Filialen'],
    nlTitle: 'SECONDHANDBOUTIQUE NEWSLETTER', nlText: 'Die besten Stücke zuerst – direkt in dein Postfach.', emailPh: 'E-Mail-Adresse',
    copyright: '© 2024 SECONDHANDBOUTIQUE · VINTAGE MODE',
    yourBag: 'DEIN WARENKORB', emptyBag: 'LEERER WARENKORB', qty: 'Menge',
    subtotal: 'Zwischensumme', checkout: 'ZUR KASSE',
    emptyMsg: 'Dein Warenkorb wartet auf etwas Besonderes.', continueShopping: 'WEITER SHOPPEN',
    mSearchPh: 'Vintage-Mode suchen',
    itemLabel: (n: number) => `${n} ARTIKEL`,
  },
  en: {
    stripA: 'CELEBRATING 40 YEARS OF VINTAGE', stripB: 'FREE SHIPPING OVER €75',
    account: 'Account', giftVoucher: 'Gift Voucher',
    searchPh: 'Find your new favourite...', wishlist: 'Wishlist', bag: 'Bag',
    nav: ['NEW IN', 'WOMEN', 'MEN', 'BRANDS', 'REWORKED', 'DENIM', 'SALE'],
    denim: [
      ['New Arrivals', "Men's Denim", "Women's Denim", 'All Denim'],
      ['Top Brands', "Levi's", 'Lee', 'GWG', 'Wrangler'],
      ['Product', 'Jeans', 'Jackets', 'Dungarees', 'Shorts', 'Shirts', 'All Denim Type'],
      ['Jeans Style', 'High Waisted', 'Straight Leg', 'Bootcut', 'Flared', 'All Jeans Styles'],
      ['Denim Wash', 'Black', 'Dark Wash', 'Light Wash', 'Medium Wash', 'Stone Wash', 'All Jeans Wash'],
    ],
    menNew: "MEN'S NEW IN", womenNew: "WOMEN'S NEW IN", saleUpTo: 'UP TO', saleOff: 'OFF', shopNow: 'SHOP NOW',
    welcomeA: 'VINTAGE', welcomeB: 'FOR EVERYONE',
    welcomeP: 'Curated vintage clothing, reworked pieces and iconic brands. One-of-a-kind finds for your next chapter.',
    shopNewIn: 'SHOP NEW IN',
    freshMicro: 'FRESH FROM THE RAIL', newArrivals: 'NEW ARRIVALS',
    filters: [['all', 'ALL'], ['new', 'NEW IN'], ['sale', 'SALE']] as [string, string][],
    tagNew: 'New in', tagSale: 'Sale', quickAdd: 'QUICK ADD', oneOfAKind: 'ONE-OF-A-KIND',
    iconicMicro: 'THE ICONIC EDIT', denimA: 'DENIM', denimB: 'FOREVER.',
    denimP: 'From classic 501s to rare vintage washes, discover the denim that never goes out of style.',
    shopDenim: 'SHOP DENIM',
    footerTag1: '40 years of vintage.', footerTag2: 'Still finding the good stuff.',
    shopCol: 'SHOP', shopLinks: ['New in', 'Women', 'Men', 'Denim'],
    helpCol: 'HELP', helpLinks: ['Delivery & returns', 'Contact', 'FAQs', 'Stores'],
    nlTitle: 'JOIN THE SECONDHANDBOUTIQUE LIST', nlText: 'First dibs on the good stuff, straight to your inbox.', emailPh: 'Email address',
    copyright: '© 2024 SECONDHANDBOUTIQUE · VINTAGE CLOTHING',
    yourBag: 'YOUR BAG', emptyBag: 'EMPTY BAG', qty: 'Qty',
    subtotal: 'Subtotal', checkout: 'CHECKOUT',
    emptyMsg: 'Your bag is waiting for something rare.', continueShopping: 'CONTINUE SHOPPING',
    mSearchPh: 'Search vintage clothing',
    itemLabel: (n: number) => `${n} ITEM${n > 1 ? 'S' : ''}`,
  },
};

function BoutiqueLogo() {
  return (
    <svg className="logo-mark" viewBox="0 0 120 120" role="img" aria-label="secondhandboutique logo">
      <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="33" r="7.5" fill="currentColor" />
      <path d="M60 41 L49 78 L71 78 Z" fill="currentColor" />
      <line x1="55" y1="78" x2="53" y2="95" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="65" y1="78" x2="67" y2="95" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="52" y1="50" x2="38" y2="62" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="68" y1="50" x2="82" y2="62" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M30 62 h16 v16 h-16 Z" fill="#b25a2f" />
      <path d="M33 62 v-3 a5 5 0 0 1 10 0 v3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M74 62 h16 v16 h-16 Z" fill="#b25a2f" />
      <path d="M77 62 v-3 a5 5 0 0 1 10 0 v3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function App() {
  const [lang, setLang] = useState<Lang>('de');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('DENIM');
  const [denimOpen, setDenimOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const c = t[lang];
  const filteredProducts = useMemo(() => activeFilter === 'all' ? products : products.filter((item) => item.tag === activeFilter), [activeFilter]);
  const toggleLike = (index: number) => setLiked((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index]);
  const addToBag = () => { setCartCount((count) => count + 1); setCartOpen(true); };

  return (
    <div className="rokit-site">
      <div className="top-strip">{c.stripA} <span>•</span> {c.stripB}</div>
      <header className="rokit-header">
        <div className="utility"><a href="#footer">{c.account}</a><a href="#footer">{c.giftVoucher}</a></div>
        <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Menu"><Menu size={21} /></button>
        <a className="rokit-logo" href="#top" aria-label="secondhandboutique home"><BoutiqueLogo /><span>secondhandboutique</span></a>
        <div className="header-tools">
          <div className="lang-switch">{(['de', 'en'] as Lang[]).map((l) => <button key={l} className={lang === l ? 'active' : ''} onClick={() => setLang(l)}>{l.toUpperCase()}</button>)}</div>
          <div className={searchOpen ? 'search-box active' : 'search-box'}><input placeholder={c.searchPh} /><button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search size={21} /></button></div><a href="#footer">{c.wishlist} <Heart size={21} /></a><button onClick={() => setCartOpen(true)} className="bag-link" aria-label="Open bag">{c.bag} <ShoppingBag size={24} /><span>{cartCount}</span></button></div>
      </header>
      <div className="nav-zone" onMouseLeave={() => setDenimOpen(false)}>
      <nav className={menuOpen ? 'main-nav mobile-open' : 'main-nav'}>{menuOpen && <div className="mobile-nav-head"><span>secondhandboutique</span><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={21} /></button></div>}{c.nav.map((item) => <a href={item === 'DENIM' ? '#denim-menu' : '#products'} className={activeNav === item ? 'selected' : ''} onMouseEnter={() => setDenimOpen(item === 'DENIM')} onClick={() => { setActiveNav(item); setMenuOpen(false); }} key={item}>{item}</a>)}</nav>
      {denimOpen && <div id="denim-menu" className="mega-menu">{c.denim.map((column) => <div key={column[0]}><strong>{column[0]}</strong>{column.slice(1).map((link) => <a href="#products" onClick={() => setDenimOpen(false)} key={link}>{link}</a>)}</div>)}</div>}
      </div>
      {searchOpen && <div className="mobile-search"><Search size={18} /><input autoFocus placeholder={c.mSearchPh} /></div>}

      <main id="top">
        <section className="home-panels">
          <a className="home-panel panel-men" href="#products"><img src="https://images.pexels.com/photos/36601357/pexels-photo-36601357.jpeg?auto=compress&cs=tinysrgb&w=1100" alt={c.menNew} /><div className="panel-label"><span>{c.menNew}</span></div></a>
          <a className="home-panel panel-women" href="#products"><img src="https://images.pexels.com/photos/16632342/pexels-photo-16632342.jpeg?auto=compress&cs=tinysrgb&w=1100" alt={c.womenNew} /><div className="panel-label"><span>{c.womenNew}</span></div></a>
          <a className="home-panel panel-sale" href="#products"><img src="https://images.pexels.com/photos/18053307/pexels-photo-18053307.jpeg?auto=compress&cs=tinysrgb&w=1100" alt="Sale" /><div className="panel-sale-overlay"><b>SALE</b><strong>{c.saleUpTo}<br />75% <small>{c.saleOff}</small></strong><span className="shop-now-btn">{c.shopNow}</span></div></a>
        </section>

        <section className="welcome"><p className="micro-heading">SECONDHANDBOUTIQUE</p><h1>{c.welcomeA}<br /><i>{c.welcomeB}</i></h1><p>{c.welcomeP}</p><a className="outline-button" href="#products">{c.shopNewIn}</a></section>

        <section className="products-section" id="products"><div className="section-top"><div><p className="micro-heading">{c.freshMicro}</p><h2>{c.newArrivals}</h2></div><div className="filters">{c.filters.map(([key, label]) => <button className={activeFilter === key ? 'active' : ''} onClick={() => setActiveFilter(key)} key={key}>{label}</button>)}</div></div><div className="product-grid">{filteredProducts.map((product, index) => <article className="product-card" key={product.nameEn}><div className="product-photo"><img src={product.image} alt={lang === 'de' ? product.nameDe : product.nameEn} />{product.tag && <span className={product.tag === 'sale' ? 'tag sale-tag' : 'tag'}>{product.tag === 'sale' ? c.tagSale : c.tagNew}</span>}<button className={liked.includes(index) ? 'wishlist liked' : 'wishlist'} onClick={() => toggleLike(index)} aria-label="Wishlist"><Heart size={20} fill={liked.includes(index) ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={addToBag}>{c.quickAdd}</button></div><p className="product-brand">{product.brand}</p><h3>{lang === 'de' ? product.nameDe : product.nameEn}</h3><div className="product-price"><span className={product.oldPrice ? 'sale-price' : ''}>€{product.price.toFixed(2)}</span>{product.oldPrice && <del>€{product.oldPrice.toFixed(2)}</del>}<small>{c.oneOfAKind}</small></div></article>)}</div></section>

        <section className="denim-feature"><div className="denim-copy"><p className="micro-heading">{c.iconicMicro}</p><h2>{c.denimA}<br /><i>{c.denimB}</i></h2><p>{c.denimP}</p><a className="outline-button light" href="#denim-menu">{c.shopDenim}</a></div><img src="https://images.pexels.com/photos/29444963/pexels-photo-29444963.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Vintage denim" /></section>
      </main>
      <footer className="rokit-footer" id="footer"><div className="footer-brand"><a className="rokit-logo" href="#top"><BoutiqueLogo /><span>secondhandboutique</span></a><p>{c.footerTag1}<br />{c.footerTag2}</p><div className="socials"><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={20} /></a><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={20} /></a></div></div><div><strong>{c.shopCol}</strong>{c.shopLinks.map((l) => <a href="#products" key={l}>{l}</a>)}</div><div><strong>{c.helpCol}</strong>{c.helpLinks.map((l) => <a href="#footer" key={l}>{l}</a>)}</div><div className="newsletter"><strong>{c.nlTitle}</strong><p>{c.nlText}</p><form onSubmit={(event) => event.preventDefault()}><input type="email" required placeholder={c.emailPh} /><button>→</button></form></div><small className="copyright">{c.copyright}</small></footer>
      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-title"><div><p className="micro-heading">{c.yourBag}</p><h2>{cartCount ? c.itemLabel(cartCount) : c.emptyBag}</h2></div><button onClick={() => setCartOpen(false)} aria-label="Close bag"><X size={22} /></button></div>{cartCount ? <><div className="drawer-item"><img src={products[0].image} alt="" /><div><strong>{lang === 'de' ? products[0].nameDe : products[0].nameEn}</strong><small>{products[0].brand} · {c.qty} {cartCount}</small><span>€{(products[0].price * cartCount).toFixed(2)}</span></div></div><div className="drawer-total"><span>{c.subtotal}</span><strong>€{(products[0].price * cartCount).toFixed(2)}</strong></div><button className="checkout">{c.checkout}</button></> : <div className="empty-bag"><ShoppingBag size={42} /><p>{c.emptyMsg}</p><a href="#products" onClick={() => setCartOpen(false)}>{c.continueShopping}</a></div>}</aside></div>}
    </div>
  );
}

export default App;
