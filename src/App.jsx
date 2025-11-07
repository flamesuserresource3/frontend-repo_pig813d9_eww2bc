import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';

const sampleProducts = [
  { id: '1', name: 'Classic White Sneakers', description: 'Minimal, comfy and versatile everyday sneakers.', price: 79.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop', badge: 'New' },
  { id: '2', name: 'Leather Backpack', description: 'Premium leather backpack with padded laptop sleeve.', price: 129.0, image: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1600&auto=format&fit=crop', badge: 'Best Seller' },
  { id: '3', name: 'Polarized Sunglasses', description: 'UV400 protection with lightweight frame.', price: 49.5, image: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1600&auto=format&fit=crop' },
  { id: '4', name: 'Denim Jacket', description: 'Timeless denim jacket with modern fit.', price: 99.0, image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop' },
  { id: '5', name: 'Wireless Headphones', description: 'Noise cancelling with 35h battery life.', price: 159.99, image: 'https://images.unsplash.com/photo-1695552839801-fd20f9ff020f?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDbGFzc2ljJTIwV2hpdGUlMjBTbmVha2Vyc3xlbnwwfDB8fHwxNzYyNDkwMTI3fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: '6', name: 'Smart Watch', description: 'Fitness tracking with AMOLED display.', price: 199.99, image: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?q=80&w=1600&auto=format&fit=crop' },
];

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [query, setQuery] = useState('');
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Simulate dynamic products and search
  const products = useMemo(() => {
    if (!query) return sampleProducts;
    return sampleProducts.filter(p => [p.name, p.description].join(' ').toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const cartCount = cart.reduce((n, it) => n + it.qty, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const inc = (product) => setCart(prev => prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
  const dec = (product) => setCart(prev => prev.flatMap(p => p.id === product.id ? (p.qty > 1 ? [{ ...p, qty: p.qty - 1 }] : []) : [p]));
  const removeFromCart = (product) => setCart(prev => prev.filter(p => p.id !== product.id));

  const toggleWishlist = (product) => {
    setWishlist((prev) => prev.some(p => p.id === product.id) ? prev.filter(p => p.id !== product.id) : [...prev, product]);
  };

  const onAuth = (u) => {
    setUser(u);
    setAuthOpen(false);
  };

  const logout = () => setUser(null);

  const ProductsGrid = ({ list }) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map(p => (
        <ProductCard
          key={p.id}
          product={p}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          inWishlist={!!wishlist.find(w => w.id === p.id)}
          cartQty={cart.find(c => c.id === p.id)?.qty || 0}
          onInc={inc}
          onDec={dec}
          onView={setActiveProduct}
        />
      ))}
    </div>
  );

  const HomePage = () => (
    <div className="max-w-7xl mx-auto p-4">
      <section className="rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-700 text-white p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">Discover products you’ll love</h1>
          <p className="mt-3 text-white/80">Shop trending items with fast shipping and easy returns.</p>
          <div className="mt-6 flex gap-3">
            <a href="#/products" className="px-4 py-2 rounded-lg bg-white text-black font-medium">Shop now</a>
            <a href="#/wishlist" className="px-4 py-2 rounded-lg border border-white/30 text-white">Wishlist</a>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-3">
          {sampleProducts.slice(0,4).map(p => (
            <img key={p.id} src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-xl"/>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Trending</h2>
          <a href="#/products" className="text-sm text-gray-600 hover:text-black">View all</a>
        </div>
        <ProductsGrid list={sampleProducts.slice(0,6)} />
      </section>
    </div>
  );

  const ProductsPage = () => (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="text-sm text-gray-600">{products.length} results</div>
      </div>
      <ProductsGrid list={products} />
    </div>
  );

  const WishlistPage = () => (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">No items in wishlist.</p>
      ) : (
        <ProductsGrid list={wishlist} />
      )}
    </div>
  );

  const AccountPage = () => (
    <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 border rounded-2xl p-4">
        <h3 className="font-semibold mb-3">Orders</h3>
        <p className="text-sm text-gray-600">You have no orders yet.</p>
      </div>
      <div className="border rounded-2xl p-4 h-fit">
        <h3 className="font-semibold mb-3">Profile</h3>
        <div className="text-sm">
          <div><span className="text-gray-500">Name:</span> {user?.name}</div>
          <div><span className="text-gray-500">Email:</span> {user?.email}</div>
          <div><span className="text-gray-500">Role:</span> {user?.role}</div>
        </div>
      </div>
    </div>
  );

  const AdminPage = () => {
    const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });
    const create = (e) => {
      e.preventDefault();
      const newProd = { id: Date.now().toString(), name: form.name, price: Number(form.price || 0), image: form.image, description: form.description, badge: 'New' };
      sampleProducts.unshift(newProd);
      setForm({ name: '', price: '', image: '', description: '' });
      alert('Product added (mock). In a real app this would persist to the database.');
    };
    return (
      <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <ProductsGrid list={sampleProducts} />
        </div>
        <div className="border rounded-2xl p-4 h-fit">
          <h3 className="font-semibold mb-3">Add Product</h3>
          <form onSubmit={create} className="space-y-3">
            <input placeholder="Name" className="w-full border rounded-lg px-3 py-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required/>
            <input placeholder="Price" type="number" step="0.01" className="w-full border rounded-lg px-3 py-2" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required/>
            <input placeholder="Image URL" className="w-full border rounded-lg px-3 py-2" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} required/>
            <textarea placeholder="Description" className="w-full border rounded-lg px-3 py-2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required/>
            <button className="w-full px-4 py-2 rounded-lg bg-black text-white">Create</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        route={route}
        setRoute={setRoute}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        user={user}
        onLogout={logout}
        onSearch={setQuery}
        openAuth={() => setAuthOpen(true)}
      />

      {route === '#/' && <HomePage/>}
      {route === '#/products' && <ProductsPage/>}
      {route === '#/wishlist' && <WishlistPage/>}
      {route === '#/cart' && (
        <Cart
          items={cart}
          onInc={inc}
          onDec={dec}
          onRemove={removeFromCart}
          onCheckout={() => alert('Checkout flow (mock).')}
        />
      )}
      {route === '#/account' && (user ? <AccountPage/> : (
        <div className="max-w-3xl mx-auto p-4"><div className="border rounded-2xl p-6 text-center">Please login to view your account.</div></div>
      ))}
      {route === '#/admin' && (user?.role === 'admin' ? <AdminPage/> : (
        <div className="max-w-3xl mx-auto p-4"><div className="border rounded-2xl p-6 text-center">Admin access only.</div></div>
      ))}

      {/* Product quick view */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden">
            <div className="grid md:grid-cols-2">
              <img src={activeProduct.image} alt={activeProduct.name} className="w-full h-64 md:h-full object-cover"/>
              <div className="p-6">
                <h3 className="text-2xl font-bold">{activeProduct.name}</h3>
                <div className="text-lg font-semibold mt-2">${activeProduct.price.toFixed(2)}</div>
                <p className="text-sm text-gray-600 mt-3">{activeProduct.description}</p>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => { addToCart(activeProduct); setActiveProduct(null); }} className="px-4 py-2 rounded-lg bg-black text-white">Add to Cart</button>
                  <button onClick={() => setActiveProduct(null)} className="px-4 py-2 rounded-lg border">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuth={onAuth} />

      <footer className="mt-16 py-10 text-center text-sm text-gray-600">© {new Date().getFullYear()} Ecom. All rights reserved.</footer>
    </div>
  );
}
