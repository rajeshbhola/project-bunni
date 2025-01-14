import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600">About ShopHub</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-blue-600">Careers</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-blue-600">Press Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-600 hover:text-blue-600">Help Center</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-blue-600">Returns</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-blue-600">Shipping Info</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="tel:1-800-123-4567" className="text-gray-600 hover:text-blue-600">1-800-123-4567</a></li>
              <li><a href="mailto:support@shophub.com" className="text-gray-600 hover:text-blue-600">support@shophub.com</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}