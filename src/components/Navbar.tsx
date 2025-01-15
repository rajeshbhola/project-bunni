import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import CartDropdown from './CartDropdown';

export default function Navbar() {
  const { items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            <img src="/bunni.png" alt="bunni logo"  width="230" height="230"/>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
          <Link to="/wishlist" className="relative">
            <Heart className="text-gray-600 hover:text-blue-600" size={24} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>
            
            <div className="relative" ref={cartRef}>
              <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative">
                <ShoppingCart className="text-gray-600 hover:text-blue-600" size={24} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
              <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>

            {user ? (
              <Link to="/account" className="flex items-center space-x-2">
                <User className="text-gray-600" size={24} />
                <span className="text-sm font-medium">{user.name}</span>
              </Link>
            ) : (
              <Link to="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2">
              <Search className="text-gray-600" size={24} />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? (
                <X className="text-gray-600" size={24} />
              ) : (
                <Menu className="text-gray-600" size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-4">
              <Link to="/wishlist" className="flex items-center space-x-2 py-2">
                <Heart className="text-gray-600" size={20} />
                <span>Wishlist</span>
              </Link>
              <Link to="/cart" className="flex items-center space-x-2 py-2">
                <ShoppingCart className="text-gray-600" size={20} />
                <span>Cart ({items.length})</span>
              </Link>
              {user ? (
                <Link to="/account" className="flex items-center space-x-2 py-2">
                  <User className="text-gray-600" size={20} />
                  <span>{user.name}</span>
                </Link>
              ) : (
                <Link to="/signin" className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}