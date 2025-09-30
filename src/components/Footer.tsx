import React from 'react';
import { Leaf, Recycle, Award, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-premium-black text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4 sm:mb-6">
              <img 
                src="/images/chika.jpg" 
                alt="ChicAphina Store" 
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain mr-2 sm:mr-3"
              />
              <div>
                <h3 className="font-playfair text-lg sm:text-xl font-bold">
                  Chic<span className="text-gold-500">Aphina</span>
                </h3>
                <p className="font-script text-gold-500 text-xs sm:text-sm">Mode Éco-Responsable</p>
              </div>
            </div>
            <p className="text-gray-300 font-inter text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
              Votre satisfaction notre combat. Mode durable et élégante pour une garde-robe consciente et raffinée.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gold-500 hover:bg-gold-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gold-500 hover:bg-gold-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gold-500 hover:bg-gold-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-base sm:text-lg font-semibold mb-4 sm:mb-6">Services</h4>
            <ul className="space-y-2 sm:space-y-3 font-inter text-xs sm:text-sm">
              <li><a href="#" className="text-gray-300 hover:text-gold-500 transition-colors">Livraison gratuite</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-500 transition-colors">Retours 30 jours</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-500 transition-colors">Programme de fidélité</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-500 transition-colors">Personal shopping</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-500 transition-colors">Éco-packaging</a></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-playfair text-base sm:text-lg font-semibold mb-4 sm:mb-6">Informations</h4>
            <ul className="space-y-2 sm:space-y-3 font-inter text-xs sm:text-sm">
              <li><a href="#" className="text-gray-300 hover:text-gold-500 transition-colors">À propos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-500 transition-colors">Notre engagement</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-500 transition-colors">Guide des tailles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-500 transition-colors">Conditions générales</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contact</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="font-inter text-xs sm:text-sm text-gray-300">78 517 59 81</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="font-inter text-xs sm:text-sm text-gray-300 break-all">contact@ChicAphina.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                <span className="font-inter text-xs sm:text-sm text-gray-300 leading-relaxed">
                  123 Avenue de la Mode<br />
                  75001 Ouakam, Dakar
                </span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-4 sm:mt-6">
              <h5 className="font-inter font-medium mb-2 sm:mb-3 text-sm sm:text-base">Newsletter</h5>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
                <button className="px-4 py-2 bg-gold-500 hover:bg-gold-600 rounded-lg sm:rounded-l-none sm:rounded-r-lg transition-colors">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability badges */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-eco-green mr-2" />
              <span className="font-inter text-xs sm:text-sm text-gray-300">Certifié GOTS</span>
            </div>
            <div className="flex items-center">
              <Recycle className="w-4 h-4 sm:w-5 sm:h-5 text-eco-green mr-2" />
              <span className="font-inter text-xs sm:text-sm text-gray-300">85% Recyclé</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 mr-2" />
              <span className="font-inter text-xs sm:text-sm text-gray-300">B-Corp Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-inter text-xs sm:text-sm text-gray-400 text-center md:text-left mb-3 md:mb-0">
              © 2024 Chic Aphina Store. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="font-inter text-xs sm:text-sm text-gray-400 hover:text-gold-500 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="font-inter text-xs sm:text-sm text-gray-400 hover:text-gold-500 transition-colors">
                Mentions légales
              </a>
              <a href="#" className="font-inter text-xs sm:text-sm text-gray-400 hover:text-gold-500 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;