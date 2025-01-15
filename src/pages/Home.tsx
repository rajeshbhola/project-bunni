import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070",
    title: "Summer Collection",
    description: "Discover our summer arrivals",
    buttonText: "Shop Now",
    link: "/category/summer"
  },
  {
    id: 2,
    image: "https://media.istockphoto.com/id/2152217447/photo/a-person-is-looking-through-a-rack-of-clothes-concept-of-election.webp?a=1&b=1&s=612x612&w=0&k=20&c=AHBSv2MC6Un-qroh3qgDmlzLg0R1llNTmTvZWZCCr7U=",
    title: "New Collection",
    description: "Discover our latest arrivals",
    buttonText: "Shop Now",
    link: "/category/new"
  },
  // ...existing slides...
];

const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', count: 120 },
  { id: 'fashion', name: 'Fashion', count: 86 },
  { id: 'home', name: 'Home & Living', count: 65 },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-12 px-4 md:px-8">
      {/* Hero Slider */}
      <section className="w-full relative  mx-auto">
        <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden">
          {SLIDES.map((slide, index) => (
            <Link
              to={slide.link}
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 transform ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="text-white ml-8 md:ml-16 space-y-4 max-w-xl">
                  <h1 className="text-3xl md:text-5xl font-bold">{slide.title}</h1>
                  <p className="text-lg md:text-xl">{slide.description}</p>
                  <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      {/* <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map(category => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative h-40 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-lg font-semibold">{category.name}</span>
                <span className="text-sm opacity-75">{category.count} Products</span>
              </div>
            </Link>
          ))}
        </div>
      </section> */}

      {/* Products Section */}
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          {/* <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Filter size={20} />
              </div>
              
            </div>
          </aside> */}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Featured Products</h2>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-4 py-2"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            <ProductGrid sortBy={sortBy} />
          </div>
        </div>
      </section>
    </div>
  );
}