import React, { useContext, useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { pushDataLayer } from '../utils/datalayer';
import Toast from '../components/Toast';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cart, cartId, removeFromCart, updateQuantity, clearCart, toast } = useContext(CartContext);
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    pushDataLayer({
      event: 'cartView',
      cartId,
      cart: cart.map(item => ({
        SKU: item.id,
        name: item.title,
        productImageUrl: item.image,
        productCategories: [
          {
            'categoryID': item.category,
            'categoryName': item.category,
            'categoryPath': `/category/${item.category}`
          },
          {
            'categoryID': item.subcategory,
            'categoryName': item.subcategory,
            'categoryPath': `/category/${item.category}`
          }
        ],
        priceTotal: item.price,
        currencyCode: 'INR',
        quantity: item.quantity
      }))
    });

    const checkOverflow = () => {
      if (containerRef.current) {
        const {offsetHeight, offsetTop }= containerRef.current;
        const pageHeight = window.innerHeight; // Viewport height
        setIsOverflowing(offsetHeight > (pageHeight - offsetTop - 113));
      }
    };

    checkOverflow();

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);

  }, [cart]);


  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="cart-page flex flex-col h-[calc(100vh-4rem)] p-4">
      {cart.length === 0 ? (
        <p className="text-center mt-20">Your cart is empty.</p>
        ) : (
          <>
            {/* Checkout button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => clearCart()}
                className="px-5 py-2 mr-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate('/checkout')}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Checkout
              </button>
            </div>
            {/* Scrollable products container */}
            <div
                ref={containerRef}
                className={`${isOverflowing ? 'flex-1 overflow-y-auto pr-2' : ''}`}
              >
                {cart.map((item) => (
                  <div key={item.id} className="cart-item flex items-center gap-4 border-b py-2">
                    <img
                      src={`${import.meta.env.BASE_URL}${item.image}.jpg`}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`} className="inline-block">
                        <h4 className="font-semibold">{item.title}</h4>
                      </Link>
                      
                      <p>₹{item.price}</p>
                    </div>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item, parseInt(e.target.value))}
                      className="w-16 p-1 border rounded text-center"
                    />
                    <button
                      onClick={() => removeFromCart(item)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

            {/* Total amount fixed at bottom */}
            <div
            className={`mt-4 bg-white p-4 border-t flex justify-between items-center shadow-md ${
              isOverflowing ? 'sticky bottom-0' : ''
            }`}
            >
            <span className="font-semibold text-lg">Total:</span>
            <span className="font-bold text-lg">₹{totalAmount.toFixed(2)}</span>
          </div>
          </>
        )}
        <Toast message={toast.message} show={toast.show} color={toast.color} />
      </div>
    </div>
  );
}