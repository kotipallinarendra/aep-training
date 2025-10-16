import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import ResponsiveImage from '../components/ResponsiveImage';
import HeroBanner from "../components/HeroBanner";
import { pushDataLayer } from '../utils/datalayer';

export default function Home() {
  useEffect(() => {
      pushDataLayer({ event: 'pageView', page: { name: 'Home', path: '/' } });
  }, []);

  return (
    <div>
      {/* Hero section */}
      <HeroBanner
        title="Welcome to AEP Tutorial"
        description="Explore the best deals in Fashion, Electronics, and Books. Your one-stop shop for everything you love!"
        ctaText="Explore Products"
        ctaLink="/products"
        background={`${import.meta.env.BASE_URL}/assets/books-nonfiction-09.jpg`}
      />

      {/* Category grid */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="block border rounded-lg overflow-hidden hover:shadow-lg">
              <div className="w-full h-60 overflow-hidden">
                {/* Placeholder image for category */}
                <ResponsiveImage srcBase={cat.image} alt={cat.title} />
              </div>
              <div className="p-4 text-center text-lg font-bold bg-black text-white">{cat.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}