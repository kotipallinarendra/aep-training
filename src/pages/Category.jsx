import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import fashionData from "../data/fashion.json";
import electronicsData from "../data/electronics.json";
import booksData from "../data/books.json";
import HeroBanner from "../components/HeroBanner";
import ProductCard from '../components/ProductCard';
import { pushDataLayer } from '../utils/datalayer';
import Toast from '../components/Toast';
import { CartContext } from '../context/CartContext';

export default function Category() {
  const { categoryId } = useParams();
  const PRODUCTS = [...fashionData, ...electronicsData, ...booksData];
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  const products = PRODUCTS.filter(p => p.category === categoryId);
  const { toast } = useContext(CartContext);
  
  useEffect(() => {
      pushDataLayer({
        event: 'pageView',
        page: { name: category.title, path: `/category/${categoryId}` },
        category: category ? { id: category.id, title: category.title } : {}
      });
  }, [categoryId]);

  

  if (!category) {
    return <div className="p-8 text-center">Category not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <HeroBanner
        title={category.title}
        description={`Explore the best deals in ${category.title}. Your one-stop shop for everything you love!`}
        ctaText="Explore Products"
        ctaLink="/products"
        background={`${import.meta.env.BASE_URL}${products[0].image}.jpg`}
      />

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        <Toast message={toast.message} show={toast.show} color={toast.color} />
      </div>
    </div>
  );
}