import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Star, Leaf, Recycle, Shield, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        size: selectedSize,
        color: selectedColor,
        quantity
      }
    });
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-premium-gray hover:text-gold-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-inter">Retour au catalogue</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.isEcoFriendly && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-eco-green text-white">
                    <Leaf className="w-3 h-3 mr-1" />
                    Éco-responsable
                  </span>
                )}
                {product.isRecycled && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gold-500 text-white">
                    <Recycle className="w-3 h-3 mr-1" />
                    Recyclé
                  </span>
                )}
              </div>
            </div>
            
            {/* Thumbnail navigation */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === selectedImageIndex ? 'border-gold-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-inter text-premium-gray">{product.category}</span>
                <div className="flex items-center space-x-2">
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gold-50 transition-colors">
                    <Heart className="w-5 h-5 text-premium-gray" />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gold-50 transition-colors">
                    <Share2 className="w-5 h-5 text-premium-gray" />
                  </button>
                </div>
              </div>
              
              <h1 className="font-playfair text-3xl font-bold text-premium-black mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-gold-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 font-inter text-premium-gray">
                  {product.rating} • {product.reviews} avis
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="font-playfair text-3xl font-bold text-premium-black">
                  {product.price}€
                </span>
                {product.originalPrice && (
                  <span className="font-inter text-xl text-premium-gray line-through">
                    {product.originalPrice}€
                  </span>
                )}
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="font-inter text-premium-gray leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Sustainability Info */}
            <div className="bg-eco-green/5 p-4 rounded-lg">
              <h3 className="font-inter font-semibold text-premium-black mb-3 flex items-center">
                <Leaf className="w-5 h-5 text-eco-green mr-2" />
                Impact Environnemental
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Empreinte carbone:</span>
                  <span className="ml-2 text-eco-green">{product.sustainability.carbonFootprint}kg CO₂</span>
                </div>
                {product.sustainability.recycledContent > 0 && (
                  <div>
                    <span className="font-medium">Contenu recyclé:</span>
                    <span className="ml-2 text-eco-green">{product.sustainability.recycledContent}%</span>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <span className="font-medium">Certifications:</span>
                <span className="ml-2 text-eco-green">{product.sustainability.certifications.join(', ')}</span>
              </div>
            </div>

            {/* Materials */}
            <div>
              <h3 className="font-inter font-semibold text-premium-black mb-2">Matières</h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm font-inter text-premium-gray"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-inter font-semibold text-premium-black mb-3">Taille</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-inter transition-colors ${
                      selectedSize === size
                        ? 'border-gold-500 bg-gold-500 text-white'
                        : 'border-gray-300 hover:border-gold-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-inter font-semibold text-premium-black mb-3">Couleur: {selectedColor}</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-inter text-sm transition-colors ${
                      selectedColor === color
                        ? 'border-gold-500 bg-gold-50 text-gold-700'
                        : 'border-gray-300 hover:border-gold-500'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-inter font-semibold text-premium-black mb-3">Quantité</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-inter">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className={`text-sm ${product.inStock ? 'text-eco-green' : 'text-eco-error'}`}>
                  {product.inStock ? 'En stock' : 'Rupture de stock'}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-gold-500 hover:bg-gold-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-inter font-semibold py-4 rounded-lg transition-colors"
            >
              Ajouter au panier • {(product.price * quantity).toFixed(2)}€
            </button>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-premium-gray" />
                <span className="font-inter text-sm text-premium-gray">Livraison 48h</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-premium-gray" />
                <span className="font-inter text-sm text-premium-gray">Retour 30 jours</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-eco-green" />
                <span className="font-inter text-sm text-premium-gray">Emballage éco</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="font-playfair text-2xl font-bold text-premium-black mb-8">
            Avis Clients ({product.reviews})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sample reviews */}
            {[
              {
                name: 'Marie L.',
                rating: 5,
                date: '2024-01-15',
                comment: 'Produit de qualité exceptionnelle ! La matière est douce et le style parfait.',
                verified: true
              },
              {
                name: 'Sophie D.',
                rating: 4,
                date: '2024-01-10',
                comment: 'Très satisfaite de cet achat. Taille parfaitement et l\'emballage était éco-responsable.',
                verified: true
              }
            ].map((review, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-white font-inter font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-inter font-medium text-premium-black">{review.name}</div>
                      <div className="text-sm text-premium-gray">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-gold-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="font-inter text-premium-gray text-sm italic mb-2">
                  "{review.comment}"
                </p>
                {review.verified && (
                  <span className="inline-flex items-center text-xs font-medium text-eco-green">
                    ✓ Achat vérifié
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;