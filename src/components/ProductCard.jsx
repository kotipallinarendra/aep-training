import React,{useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product, onAddToCart }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block">
        <ResponsiveImage srcBase={product.image} alt={product.title} />
        <div className="p-4">
          <h3 className="font-medium text-lg mb-1">{product.title}</h3>
          <p className="text-gray-600 mb-2">${product.price}</p>
        </div>
      </Link>
      <div className="mt-auto flex items-center justify-between">
        <button 
        onClick={handleAddToCart} className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600">Add</button>
      </div>
    </div>
  );
}