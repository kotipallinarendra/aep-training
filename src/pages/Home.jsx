import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import ResponsiveImage from '../components/ResponsiveImage';
import { pushDataLayer } from '../utils/datalayer';

export default function Home() {
  useEffect(() => {
      pushDataLayer({ event: 'pageView', page: { name: 'Home', path: '/' } });
  }, []);

  return (
    <div>
      {/* Hero section */}
      <section className="bg-blue-50 py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to MyShop</h1>
        <p className="text-gray-700">Explore categories and find your perfect product.</p>
      </section>

      {/* Category grid */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="block border rounded-lg overflow-hidden hover:shadow-lg">
              <div className="w-full h-40">
                {/* Placeholder image for category */}
                <ResponsiveImage srcBase={`/assets/${cat.id}-1`} alt={cat.title} />
              </div>
              <div className="p-4 text-center text-lg font-bold bg-black">{cat.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}