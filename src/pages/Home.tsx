import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { Filter } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative h-[400px] rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070"
          alt="Hero banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="text-white ml-12 space-y-4">
            <h1 className="text-5xl font-bold">Summer Collection</h1>
            <p className="text-xl">Discover our latest arrivals</p>
            <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <div className="flex gap-8">
        <aside className="w-64 shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Filter size={20} />
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {['Electronics', 'Clothing', 'Books', 'Home & Garden'].map((category) => (
                    <label key={category} className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="ml-2 text-sm">{rating}+ Stars</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <select className="border rounded-lg px-4 py-2">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}