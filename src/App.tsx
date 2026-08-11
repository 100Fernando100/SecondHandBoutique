import { useMemo, useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';

type Product = { name: string; brand: string; price: number; oldPrice?: number; image: string; tag?: string };

const products: Product[] = [
  { name: 'Vintage 90s Levi\'s 501 Jeans', brand: "Levi's", price: 48, image: 'https://images.pexels.com/photos/10548744/pexels-photo-10548744.jpeg?auto=compress&cs=tinysrgb&w=900', tag: 'New in' },
  { name: 'Vintage Polo Ralph Lauren Denim Shorts', brand: 'Ralph Lauren', price: 21, oldPrice: 30, image: 'https://images.pexels.com/photos/15404804/pexels-photo-15404804.jpeg?auto=compress&cs=tinysrgb&w=900', tag: 'Sale' },
  { name: 'Vintage Adidas Track Jacket', brand: 'Adidas', price: 34, image: 'https://images.pexels.com/photos/10427342/pexels-photo-10427342.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { name: 'Vintage Wrangler Western Shirt', brand: 'Wrangler', price: 42, image: 'https://images.pexels.com/photos/29346779/pexels-photo-29346779.jpeg?auto=compress&cs=tinysrgb&w=900', tag: 'New in' },
];

const navItems = ['NEW IN', 'WOMEN', 'MEN', 'BRANDS', 'REWORKED', 'DENIM', 'MILITARY', 'SALE'];
const denimColumns = [
  ['New Arrivals', "Men's Denim", "Women's Denim", 'All Denim'],
  ['Top Brands', "Levi's", 'Lee', 'GWG', 'Wrangler'],
  ['Product', 'Jeans', 'Jackets', 'Dungarees', 'Shorts', 'Shirts', 'All Denim Type'],
  ['Jeans Style', 'High Waisted', 'Straight Leg', 'Bootcut', 'Flared', 'All Jeans Styles'],
  ['Denim Wash', 'Black', 'Dark Wash', 'Light Wash', 'Medium Wash', 'Stone Wash', 'All Jeans Wash'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('DENIM');
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredProducts = useMemo(() => activeFilter === 'ALL' ? products : products.filter((item) => item.tag?.toUpperCase() === activeFilter), [activeFilter]);
  const toggleLike = (index: number) => setLiked((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index]);
  const addToBag = () => { setCartCount((count) => count + 1); setCartOpen(true); };

  return (
    <div className="rokit-site">
      <div className="top-strip">CELEBRATING 40 YEARS OF VINTAGE <span>•</span> FREE UK SHIPPING OVER £75</div>
      <header className="rokit-header">
        <div className="utility"><a href="#footer">Account</a><a href="#footer">Gift Voucher</a></div>
        <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
        <a className="rokit-logo" href="#top" aria-label="secondhandboutique home">secondhandboutique</a>
        <div className="header-tools"><div className={searchOpen ? 'search-box active' : 'search-box'}><input placeholder="Find your new favourite..." /><button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search size={21} /></button></div><a href="#footer">Wishlist <Heart size={21} /></a><button onClick={() => setCartOpen(true)} className="bag-link" aria-label="Open bag">Bag <ShoppingBag size={24} /><span>{cartCount}</span></button></div>
      </header>
      <nav className={menuOpen ? 'main-nav mobile-open' : 'main-nav'}>{menuOpen && <div className="mobile-nav-head"><span>secondhandboutique</span><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={21} /></button></div>}{navItems.map((item) => <a href={item === 'DENIM' ? '#denim-menu' : '#products'} className={activeNav === item ? 'selected' : ''} onClick={() => { setActiveNav(item); setMenuOpen(false); }} key={item}>{item}</a>)}</nav>
      {activeNav === 'DENIM' && <div id="denim-menu" className="mega-menu">{denimColumns.map((column) => <div key={column[0]}><strong>{column[0]}</strong>{column.slice(1).map((link) => <a href="#products" key={link}>{link}</a>)}</div>)}</div>}
      {searchOpen && <div className="mobile-search"><Search size={18} /><input autoFocus placeholder="Search vintage clothing" /></div>}

      <main id="top">
        <section className="home-panels">
          <a className="home-panel panel-men" href="#products"><img src="https://images.pexels.com/photos/10427342/pexels-photo-10427342.jpeg?auto=compress&cs=tinysrgb&w=1100" alt="Men's vintage clothing" /><div className="panel-label"><span>MEN'S NEW IN</span></div></a>
          <a className="home-panel panel-women" href="#products"><img src="https://images.pexels.com/photos/15404804/pexels-photo-15404804.jpeg?auto=compress&cs=tinysrgb&w=1100" alt="Women's vintage clothing" /><div className="panel-label"><span>WOMEN'S NEW IN</span></div></a>
          <a className="home-panel panel-sale" href="#products"><img src="https://images.pexels.com/photos/7679742/pexels-photo-7679742.jpeg?auto=compress&cs=tinysrgb&w=1100" alt="Vintage clothing sale" /><div className="panel-sale-overlay"><b>SALE</b><strong>UP TO<br />75% <small>OFF</small></strong><span className="shop-now-btn">SHOP NOW</span></div></a>
        </section>

        <section className="welcome"><p className="micro-heading">SECONDHANDBOUTIQUE</p><h1>VINTAGE<br /><i>FOR EVERYONE</i></h1><p>Curated vintage clothing, reworked pieces and iconic brands. One-of-a-kind finds for your next chapter.</p><a className="outline-button" href="#products">SHOP NEW IN</a></section>

        <section className="products-section" id="products"><div className="section-top"><div><p className="micro-heading">FRESH FROM THE RAIL</p><h2>NEW ARRIVALS</h2></div><div className="filters">{['ALL', 'NEW IN', 'SALE'].map((filter) => <button className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}</div></div><div className="product-grid">{filteredProducts.map((product, index) => <article className="product-card" key={product.name}><div className="product-photo"><img src={product.image} alt={product.name} />{product.tag && <span className={product.tag === 'Sale' ? 'tag sale-tag' : 'tag'}>{product.tag}</span>}<button className={liked.includes(index) ? 'wishlist liked' : 'wishlist'} onClick={() => toggleLike(index)} aria-label="Add to wishlist"><Heart size={20} fill={liked.includes(index) ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={addToBag}>QUICK ADD</button></div><p className="product-brand">{product.brand}</p><h3>{product.name}</h3><div className="product-price"><span className={product.oldPrice ? 'sale-price' : ''}>£{product.price.toFixed(2)}</span>{product.oldPrice && <del>£{product.oldPrice.toFixed(2)}</del>}<small>ONE-OF-A-KIND</small></div></article>)}</div></section>

        <section className="denim-feature"><div className="denim-copy"><p className="micro-heading">THE ICONIC EDIT</p><h2>DENIM<br /><i>FOREVER.</i></h2><p>From classic 501s to rare vintage washes, discover the denim that never goes out of style.</p><a className="outline-button light" href="#denim-menu">SHOP DENIM</a></div><img src="https://images.pexels.com/photos/13524010/pexels-photo-13524010.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Vintage denim styling" /></section>
      </main>
      <footer className="rokit-footer" id="footer"><div className="footer-brand"><a className="rokit-logo" href="#top">secondhandboutique</a><p>40 years of vintage.<br />Still finding the good stuff.</p></div><div><strong>SHOP</strong><a href="#products">New in</a><a href="#products">Women</a><a href="#products">Men</a><a href="#products">Denim</a></div><div><strong>HELP</strong><a href="#footer">Delivery & returns</a><a href="#footer">Contact</a><a href="#footer">FAQs</a><a href="#footer">Stores</a></div><div className="newsletter"><strong>JOIN THE SECONDHANDBOUTIQUE LIST</strong><p>First dibs on the good stuff, straight to your inbox.</p><form onSubmit={(event) => event.preventDefault()}><input type="email" required placeholder="Email address" /><button>→</button></form></div><small className="copyright">© 2024 SECONDHANDBOUTIQUE · VINTAGE CLOTHING</small></footer>
      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-title"><div><p className="micro-heading">YOUR BAG</p><h2>{cartCount ? `${cartCount} ITEM${cartCount > 1 ? 'S' : ''}` : 'EMPTY BAG'}</h2></div><button onClick={() => setCartOpen(false)} aria-label="Close bag"><X size={22} /></button></div>{cartCount ? <><div className="drawer-item"><img src={products[0].image} alt="" /><div><strong>{products[0].name}</strong><small>{products[0].brand} · Qty {cartCount}</small><span>£{(products[0].price * cartCount).toFixed(2)}</span></div></div><div className="drawer-total"><span>Subtotal</span><strong>£{(products[0].price * cartCount).toFixed(2)}</strong></div><button className="checkout">CHECKOUT</button></> : <div className="empty-bag"><ShoppingBag size={42} /><p>Your bag is waiting for something rare.</p><a href="#products" onClick={() => setCartOpen(false)}>CONTINUE SHOPPING</a></div>}</aside></div>}
    </div>
  );
}

export default App;
