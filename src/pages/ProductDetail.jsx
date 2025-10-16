import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import fashionData from "../data/fashion.json";
import electronicsData from "../data/electronics.json";
import booksData from "../data/books.json";
import ResponsiveImage from '../components/ResponsiveImage';
import { pushDataLayer } from '../utils/datalayer';
import Toast from '../components/Toast';
import { CartContext } from '../context/CartContext';

export default function ProductDetail() {
  const { productId } = useParams();
  const PRODUCTS = [...fashionData, ...electronicsData, ...booksData];
  const product = PRODUCTS.find(p => p.id === productId);
  const { cart, addToCart, removeFromCart, updateQuantity, toast } = useContext(CartContext);

  // Check if product is already in cart
  const cartItem = cart.find(item => item.id === product?.id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);


  useEffect(() => {
    // When product or cart changes, ensure quantity stays in sync
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
    
    if (product) {
      pushDataLayer({
        event: 'productView',
        page: { name: 'ProductDetail', path: `/product/${productId}` },
        product: {
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          subCategory: product.subcategory,
          image: product.image
        }
      });
    }
  }, [cartItem, productId]);

  if (!product) {
    return <div className="p-8 text-center">Product not found.</div>;
  }

  const category = CATEGORIES.find(cat => cat.id === product.category);

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product image */}
      <div>
        <ResponsiveImage srcBase={product.image} alt={product.title} />
      </div>

      {/* Product details */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>

        {/* Categories as pills */}
        {category && (
          <Link
            to={`/category/${category.id}`}
            className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-4 hover:bg-gray-300"
          >
            {category.title}
          </Link>
        )}

        <p className="text-2xl font-semibold mb-4">${product.price}</p>

        <div className="flex items-center mb-4">
          <label className="mr-2 font-medium">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1 text-center"
          />
        </div>

        {cartItem ? (
          <div className='inline-block'>
            <button
              onClick={() => updateQuantity(product, quantity)}
              className="bg-blue-500 text-white px-6 py-2 mr-2 rounded hover:bg-blue-600 transition"
            >
              Update
            </button>
            <button
              onClick={() => removeFromCart(product)}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
            >
              Remove from Cart
            </button>
            <Link to="/cart" className="inline-block bg-green-500 text-white px-6 py-2 ml-2 rounded hover:bg-green-600">View Cart</Link>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product, quantity)}
            className="bg-blue-500 text-white px-6 py-2 mr-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        )}
      </div>
      <Toast message={toast.message} show={toast.show} color={toast.color} />
    </div>
  );
}