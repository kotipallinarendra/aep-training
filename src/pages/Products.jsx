import React, { useEffect, useContext } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { pushDataLayer } from '../utils/datalayer';
import Toast from '../components/Toast';
import { CartContext } from '../context/CartContext';

export default function Products() {
  const { toast } = useContext(CartContext);
  useEffect(() => {
    pushDataLayer({
      event: 'pageView',
      page: { name: 'Products', path: '/products' }
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <section className="bg-green-50 py-12 text-center mb-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-700">Browse through our complete collection.</p>
      </section>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        <Toast message={toast.message} show={toast.show} color={toast.color} />
      </div>
    </div>
  );
}