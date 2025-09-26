import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { pushDataLayer } from '../utils/datalayer';
import { CartContext } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });


  const { clearCart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: '',
    street: '',
    city: '',
    postal: '',
    state: '',
    country: '',
    card: '',
  });

  useEffect(() => {
      pushDataLayer({
        event: 'pageView',
        page: { name: 'Checkout', path: '/checkout' },
        cart: cart.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
        }))
      });
  }, [cart]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Create order object
    const orderDetails = {
      id: orderId,
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      address: form,
    };

    // Clear cart
    clearCart();

    localStorage.setItem('delivery', JSON.stringify(form));
    navigate(`/order-confirmation/${orderId}`, { state: { order: orderDetails }});
  };

  if (cart.length === 0) {
    return <div className="p-8 text-center">Your cart is empty. Please add products before checkout.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-2">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <div className="flex">
                  <img
                    src={`${item.image}.jpg`}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <span className='block px-4 pb-2'>{item.title} (x{item.quantity})</span>
                    <span className='block px-4'>{item.description} (x{item.quantity})</span>
                  </div>
                  
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold text-end">Total: ${total.toFixed(2)}</p>
        </div>

        {/* Delivery & Payment form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery & Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={form.street}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="postal"
              placeholder="Postal Code"
              value={form.postal}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="state"
              placeholder="State/UT"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="card"
              placeholder="Card Number (dummy)"
              value={form.card}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}