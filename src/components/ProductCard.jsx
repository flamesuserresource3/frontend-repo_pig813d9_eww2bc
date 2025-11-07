import React from 'react';
import { Heart, ShoppingBag, Plus, Minus } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onToggleWishlist, inWishlist, cartQty, onInc, onDec, onView }) {
  return (
    <div className="group border rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">{product.badge}</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
          </div>
          <button onClick={() => onToggleWishlist(product)} className={`p-2 rounded-lg hover:bg-gray-100 ${inWishlist ? 'text-red-500' : 'text-gray-600'}`} aria-label="Toggle wishlist">
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`}/>
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
          {cartQty > 0 ? (
            <div className="inline-flex items-center gap-2 border rounded-lg px-2 py-1">
              <button onClick={() => onDec(product)} className="p-1 hover:bg-gray-100 rounded"><Minus className="w-4 h-4"/></button>
              <span className="min-w-[1.5rem] text-center">{cartQty}</span>
              <button onClick={() => onInc(product)} className="p-1 hover:bg-gray-100 rounded"><Plus className="w-4 h-4"/></button>
            </div>
          ) : (
            <button onClick={() => onAddToCart(product)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black text-white hover:bg-black/90">
              <ShoppingBag className="w-4 h-4"/> Add
            </button>
          )}
        </div>
        <button onClick={() => onView(product)} className="mt-3 w-full text-sm text-gray-600 hover:text-black text-left">View details</button>
      </div>
    </div>
  );
}
