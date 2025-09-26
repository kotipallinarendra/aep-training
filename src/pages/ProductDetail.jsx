import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ResponsiveImage from '../components/ResponsiveImage';
import { pushDataLayer } from '../utils/datalayer';
import { CartContext } from '../context/CartContext';

export default function ProductDetail() {
  const { productId } = useParams();
  const product = PRODUCTS.find(p => p.id === productId);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (product) {
      pushDataLayer({
        event: 'productView',
        page: { name: 'ProductDetail', path: `/product/${productId}` },
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          subCategory: product.subcategory
        }
      });
    }
  }, [productId]);

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

        <button
          onClick={() => addToCart(product)}
          /* onClick={() => {
            pushDataLayer({
              event: 'addToCart',
              product: {
                id: product.id,
                title: product.title,
                price: product.price,
                category: product.category,
                subCategory: product.subcategory
              }
            });
            alert(`${product.title} added to cart!`); 
          }}*/
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}