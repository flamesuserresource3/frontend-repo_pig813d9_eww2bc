import React from 'react';
import { Trash2 } from 'lucide-react';

export default function Cart({ items, onInc, onDec, onRemove, onCheckout }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const shipping = items.length ? 7.5 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-4 border rounded-xl p-3">
                <img src={it.image} alt={it.name} className="w-20 h-20 object-cover rounded-lg"/>
                <div className="flex-1">
                  <div className="font-semibold">{it.name}</div>
                  <div className="text-sm text-gray-500">${it.price.toFixed(2)}</div>
                  <div className="mt-2 inline-flex items-center gap-2">
                    <button onClick={() => onDec(it)} className="px-2 py-1 border rounded">-</button>
                    <span>{it.qty}</span>
                    <button onClick={() => onInc(it)} className="px-2 py-1 border rounded">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="font-semibold">${(it.price * it.qty).toFixed(2)}</div>
                  <button onClick={() => onRemove(it)} className="text-red-600 inline-flex items-center gap-1"><Trash2 className="w-4 h-4"/> Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="border rounded-xl p-4 h-fit">
            <h3 className="font-semibold mb-2">Summary</h3>
            <div className="flex justify-between text-sm mb-1">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button onClick={onCheckout} className="w-full px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
