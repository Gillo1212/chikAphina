import React from 'react';
import { Heart, ShoppingBag, Leaf, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        size: product.sizes[0],
        color: product.colors[0],
        quantity: 1
      }
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle favorite toggle
  };

  return (
    <div 
      className="group cursor-pointer animate-fade-in"
      onClick={() => onProductClick(product)}
    >
      <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] sm:group-hover:scale-105">
        {/* Image */}
        <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 space-y-1 sm:space-y-2">
            {product.isEcoFriendly && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-eco-green text-white">
                <Leaf className="w-3 h-3 mr-1" />
                Éco-responsable
              </span>
            )}
            {product.isRecycled && (
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gold-500 text-white">
                Recyclé
              </span>
            )}
            {product.originalPrice && (
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-eco-error text-white">
                Promo
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleToggleFavorite}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gold-50 transition-colors mb-1 sm:mb-2"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-premium-gray hover:text-gold-500" />
            </button>
            <button
              onClick={handleAddToCart}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gold-500 hover:bg-gold-600 rounded-full flex items-center justify-center transition-colors"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 sm:pb-6 hidden sm:flex">
            <button className="bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full font-inter font-medium text-premium-black hover:bg-white transition-colors text-sm">
              Vue rapide
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-gold-500 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-xs sm:text-sm text-premium-gray font-inter">
              ({product.reviews})
            </span>
          </div>

          <h3 className="font-playfair text-base sm:text-lg font-semibold text-premium-black mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          <p className="text-premium-gray font-inter text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Sustainability info */}
          <div className="flex items-center space-x-2 sm:space-x-4 mb-3 sm:mb-4 text-xs text-eco-green">
            <span>CO₂: {product.sustainability.carbonFootprint}kg</span>
            {product.sustainability.recycledContent > 0 && (
              <span>{product.sustainability.recycledContent}% recyclé</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="font-playfair text-lg sm:text-xl font-bold text-premium-black">
                {product.price}€
              </span>
              {product.originalPrice && (
                <span className="font-inter text-xs sm:text-sm text-premium-gray line-through">
                  {product.originalPrice}€
                </span>
              )}
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              product.inStock 
                ? 'bg-eco-green/10 text-eco-green' 
                : 'bg-eco-error/10 text-eco-error'
            }`}>
              {product.inStock ? 'En stock' : 'Rupture'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;