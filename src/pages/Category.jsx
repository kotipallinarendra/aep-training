import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { pushDataLayer } from '../utils/datalayer';
import Toast from '../components/Toast';
import { CartContext } from '../context/CartContext';

export default function Category() {
  const { categoryId } = useParams();
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  const products = PRODUCTS.filter(p => p.category === categoryId);
  const { toast } = useContext(CartContext);
  
  useEffect(() => {
      pushDataLayer({
        event: 'pageView',
        page: { name: 'Category', path: `/category/${categoryId}` },
        category: category ? { id: category.id, title: category.title } : {}
      });
  }, [categoryId]);

  

  if (!category) {
    return <div className="p-8 text-center">Category not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <section className="bg-yellow-50 py-12 text-center mb-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
        <p className="text-gray-700">Explore the best products in {category.title}.</p>
      </section>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        <Toast message={toast.message} show={toast.show} color={toast.color} />
      </div>
    </div>
  );
}