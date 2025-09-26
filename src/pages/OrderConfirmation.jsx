import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {pushDataLayer} from '../utils/datalayer'

function OrderConfirmation() {
  const { orderId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  // If no state is passed (e.g., direct access), redirect
  useEffect(() => {
    if (!state?.order) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state?.order) return null;

  const { items, total, address } = state.order;

  useEffect(() => {

    // Push order details to dataLayer
    pushDataLayer({
      event: 'orderConfirmation',
      page: { name: 'Order Confirmation', path: '/order-confirmation' },
      order: {
        id: orderId,
        products: items.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: total,
        deliveryAddress: address
      }
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
      <p className="mb-2">Order ID: <strong>{orderId}</strong></p>
      <div className="mb-4 border p-4 rounded bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
        <p>Name: {address.name}</p>
        <p>Street Address: {address.street}</p>
        <p>City: {address.city}</p>
        <p>State: {address.state}</p>
        <p>Country: {address.country}</p>
        <p>Postal Code: {address.postal}</p>
      </div>

      <h3 className="text-xl font-semibold mb-2">Items:</h3>
      <ul className="mb-4">
        {items.map((item) => (
          <li key={item.id} className="flex border-b py-2">
            <img
              src={`${item.image}.jpg`}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
            />
            <span className='p-4'>{item.title} (x{item.quantity}) — ${item.price * item.quantity}</span>
          </li>
        ))}
      </ul>

      <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
    </div>
  );
}

export default OrderConfirmation;