import React, { useState } from 'react';
import { Home, ShoppingCart, Heart, User, LogOut, Search, Settings } from 'lucide-react';

export default function Navbar({ route, setRoute, cartCount, wishlistCount, user, onLogout, onSearch, openAuth }) {
  const [term, setTerm] = useState('');

  const go = (hash) => {
    setRoute(hash);
    window.location.hash = hash;
  };

  const submit = (e) => {
    e.preventDefault();
    onSearch(term);
    go('#/products');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => go('#/') }>
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-black text-white font-bold">E</span>
            <span className="font-semibold text-lg">Ecom</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 ml-6 text-sm text-gray-700">
            <button onClick={() => go('#/')} className={`inline-flex items-center gap-2 hover:text-black ${route === '#/' ? 'text-black' : ''}`}>
              <Home className="w-4 h-4"/> Home
            </button>
            <button onClick={() => go('#/products')} className={`hover:text-black ${route === '#/products' ? 'text-black' : ''}`}>Products</button>
            <button onClick={() => go('#/wishlist')} className={`hover:text-black ${route === '#/wishlist' ? 'text-black' : ''}`}>Wishlist</button>
            <button onClick={() => go('#/cart')} className={`hover:text-black ${route === '#/cart' ? 'text-black' : ''}`}>Cart</button>
            {user && user.role === 'admin' && (
              <button onClick={() => go('#/admin')} className={`inline-flex items-center gap-2 hover:text-black ${route === '#/admin' ? 'text-black' : ''}`}>
                <Settings className="w-4 h-4"/> Admin
              </button>
            )}
            {user && (
              <button onClick={() => go('#/account')} className={`hover:text-black ${route === '#/account' ? 'text-black' : ''}`}>My Account</button>
            )}
          </nav>

          <form onSubmit={submit} className="flex-1 max-w-xl mx-auto hidden md:flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
          </form>

          <div className="flex items-center gap-2 ml-auto">
            <button onClick={() => go('#/wishlist')} className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100">
              <Heart className="w-5 h-5"/>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{wishlistCount}</span>
              )}
            </button>
            <button onClick={() => go('#/cart')} className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100">
              <ShoppingCart className="w-5 h-5"/>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <button onClick={() => go('#/account')} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                  <User className="w-4 h-4"/>
                  <span className="hidden sm:inline">{user.name || 'Account'}</span>
                </button>
                <button onClick={onLogout} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                  <LogOut className="w-4 h-4"/>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button onClick={openAuth} className="px-3 py-2 rounded-lg bg-black text-white hover:bg-black/90">Login</button>
            )}
          </div>
        </div>

        <form onSubmit={submit} className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
