import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { pushDataLayer } from '../utils/datalayer';

export default function Header({ user, setUser }) {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  console.log('user Header ',user)
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);

    pushDataLayer({
      event: 'logout',
      page: { name: 'logout' }
    });
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold">AEP Learning</Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/products" className="hover:underline">Products</Link>
          <Link to="/api-request" className="hover:underline">Custom AEP Request</Link>
          <Link to="/cart" className="relative">
            Cart
            <span className="ml-2 inline-block bg-blue-500 text-white text-xs px-2 py-0.5 rounded">{totalItems}</span>
          </Link>
          <div>
          {user ? (
            <div className="flex gap-2 items-center">
              <span>Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="ml-2 px-2 py-1 bg-red-600 rounded text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:underline">Login</Link>
          )}
        </div>
        </nav>
      </div>
    </header>
  );
}