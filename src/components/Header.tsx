import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, Leaf, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state: cartState } = useCart();

  const navigation = [
    { name: 'Accueil', id: 'home' },
    { name: 'Nouveautés', id: 'new' },
    { name: 'Collection Recyclée', id: 'recycled', icon: Leaf },
    { name: 'Femme', id: 'women' },
    { name: 'Accessoires', id: 'accessories' },
    { name: 'À Propos', id: 'about' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="border-b border-gold-100 py-2 hidden md:block">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-premium-gray font-inter truncate">
              Livraison gratuite dès 75€ • Retours gratuits 30 jours
            </span>
            <div className="flex items-center space-x-4">
              <span className="text-premium-gray hidden lg:inline">📞 78 517 59 81</span>
              <button 
                onClick={() => onNavigate('admin')}
                className="text-gold-500 hover:text-gold-600 font-medium text-xs sm:text-sm"
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center cursor-pointer flex-shrink-0"
          >
            <img 
              src="/images/chika.jpg" 
              alt="ChicAphina Store" 
              className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain mr-2 sm:mr-3"
            />
            <div className="hidden xs:block">
              <h1 className="font-playfair text-lg sm:text-xl lg:text-2xl font-bold text-premium-black">
                Chic<span className="text-gold-500">Aphina</span>
              </h1>
              <p className="font-script text-gold-500 text-xs sm:text-sm hidden sm:block">Mode Éco-Responsable</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-inter font-medium transition-colors duration-200 flex items-center text-sm lg:text-base ${
                  currentPage === item.id
                    ? 'text-gold-500 border-b-2 border-gold-500 pb-1'
                    : 'text-premium-gray hover:text-gold-500'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                {item.name}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            <button className="hidden lg:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gold-200 hover:bg-gold-50 transition-colors">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-premium-gray" />
            </button>
            
            <button className="hidden md:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gold-200 hover:bg-gold-50 transition-colors">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-premium-gray" />
            </button>

            <button className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gold-200 hover:bg-gold-50 transition-colors">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-premium-gray" />
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold-500 hover:bg-gold-600 transition-colors relative"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              {cartState.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-eco-error text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold">
                  {cartState.itemCount}
                </span>
              )}
            </button>

            <button
              className="xl:hidden ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-premium-gray" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-premium-gray" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="xl:hidden border-t border-gold-100 py-4">
            <nav className="space-y-3">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left font-inter font-medium transition-colors duration-200 flex items-center py-2 px-2 rounded-lg ${
                    currentPage === item.id
                      ? 'text-gold-500 bg-gold-50'
                      : 'text-premium-gray hover:text-gold-500 hover:bg-gold-50'
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-gold-100 sm:hidden">
              <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-200 hover:bg-gold-50 transition-colors">
                <Search className="w-5 h-5 text-premium-gray" />
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-200 hover:bg-gold-50 transition-colors">
                <Heart className="w-5 h-5 text-premium-gray" />
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-200 hover:bg-gold-50 transition-colors">
                <User className="w-5 h-5 text-premium-gray" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;