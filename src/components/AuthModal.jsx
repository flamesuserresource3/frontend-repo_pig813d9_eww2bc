import React, { useState } from 'react';

export default function AuthModal({ open, onClose, onAuth }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const role = /admin/i.test(email) ? 'admin' : 'user';
    const user = mode === 'login' ? { name: email.split('@')[0], email, role } : { name, email, role };
    onAuth(user);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{mode === 'login' ? 'Login' : 'Create account'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20" required/>
            </div>
          )}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20" required/>
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20" required/>
          </div>
          <button type="submit" className="w-full px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90">{mode === 'login' ? 'Login' : 'Create account'}</button>
        </form>
        <div className="mt-4 text-sm text-center">
          {mode === 'login' ? (
            <button onClick={() => setMode('register')} className="text-black underline">New here? Create an account</button>
          ) : (
            <button onClick={() => setMode('login')} className="text-black underline">Already have an account? Login</button>
          )}
        </div>
      </div>
    </div>
  );
}
