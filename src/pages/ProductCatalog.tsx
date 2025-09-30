import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, ChevronDown, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { Product } from '../types';

interface ProductCatalogProps {
  onProductClick: (product: Product) => void;
  category?: string;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ onProductClick, category = 'women' }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isEcoOnly, setIsEcoOnly] = useState(false);
  const [isRecycledOnly, setIsRecycledOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filters
  const allSizes = [...new Set(products.flatMap(p => p.sizes))];
  const allColors = [...new Set(products.flatMap(p => p.colors))];

  // Apply filters
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'Tous') {
      if (selectedCategory === 'Collection Recyclée') {
        filtered = filtered.filter(p => p.isRecycled);
      } else if (selectedCategory === 'Nouveautés') {
        filtered = filtered.filter(p => ['1', '3', '5'].includes(p.id));
      } else {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => p.sizes.some(size => selectedSizes.includes(size)));
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => p.colors.some(color => selectedColors.includes(color)));
    }

    // Eco filter
    if (isEcoOnly) {
      filtered = filtered.filter(p => p.isEcoFriendly);
    }

    // Recycled filter
    if (isRecycledOnly) {
      filtered = filtered.filter(p => p.isRecycled);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // popularity - keep original order
        break;
    }

    return filtered;
  }, [selectedCategory, priceRange, selectedSizes, selectedColors, isEcoOnly, isRecycledOnly, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('Tous');
    setPriceRange([0, 300]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setIsEcoOnly(false);
    setIsRecycledOnly(false);
  };

  const getPageTitle = () => {
    switch (category) {
      case 'new':
        return 'Nouveautés';
      case 'recycled':
        return 'Collection Recyclée';
      case 'women':
        return 'Collection Femme';
      case 'accessories':
        return 'Accessoires';
      default:
        return 'Catalogue';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-premium-black mb-3 sm:mb-4">
            {getPageTitle()}
          </h1>
          <p className="font-inter text-premium-gray text-sm sm:text-base">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-200 rounded-lg p-3 font-inter font-medium text-sm sm:text-base"
              >
                <Filter className="w-5 h-5" />
                <span>Filtres</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className={`bg-white rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6 ${showFilters || 'hidden lg:block'}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-playfair text-base sm:text-lg font-semibold text-premium-black">Filtres</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs sm:text-sm font-inter text-gold-500 hover:text-gold-600"
                >
                  Effacer tout
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-inter font-semibold text-premium-black mb-2 sm:mb-3 text-sm sm:text-base">Catégories</h4>
                <div className="space-y-1 sm:space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-2 sm:px-3 py-2 rounded-md font-inter text-xs sm:text-sm transition-colors ${
                        selectedCategory === cat
                          ? 'bg-gold-500 text-white'
                          : 'text-premium-gray hover:bg-gold-50 hover:text-gold-500'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-inter font-semibold text-premium-black mb-2 sm:mb-3 text-sm sm:text-base">Prix</h4>
                <div className="space-y-2 sm:space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs sm:text-sm font-inter text-premium-gray">
                    <span>{priceRange[0]}€</span>
                    <span>{priceRange[1]}€</span>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="font-inter font-semibold text-premium-black mb-2 sm:mb-3 text-sm sm:text-base">Tailles</h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-2 sm:px-3 py-1 rounded border font-inter text-xs sm:text-sm transition-colors ${
                        selectedSizes.includes(size)
                          ? 'bg-gold-500 text-white border-gold-500'
                          : 'border-gray-300 text-premium-gray hover:border-gold-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h4 className="font-inter font-semibold text-premium-black mb-2 sm:mb-3 text-sm sm:text-base">Couleurs</h4>
                <div className="space-y-1 sm:space-y-2">
                  {allColors.map((color) => (
                    <label key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleColor(color)}
                        className="mr-2 rounded text-gold-500 focus:ring-gold-500"
                      />
                      <span className="font-inter text-xs sm:text-sm text-premium-gray">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sustainability */}
              <div>
                <h4 className="font-inter font-semibold text-premium-black mb-2 sm:mb-3 text-sm sm:text-base">Durabilité</h4>
                <div className="space-y-1 sm:space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isEcoOnly}
                      onChange={(e) => setIsEcoOnly(e.target.checked)}
                      className="mr-2 rounded text-eco-green focus:ring-eco-green"
                    />
                    <span className="font-inter text-xs sm:text-sm text-premium-gray">Éco-responsable uniquement</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isRecycledOnly}
                      onChange={(e) => setIsRecycledOnly(e.target.checked)}
                      className="mr-2 rounded text-eco-green focus:ring-eco-green"
                    />
                    <span className="font-inter text-xs sm:text-sm text-premium-gray">Recyclé uniquement</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-gold-500 text-white' : 'text-premium-gray hover:bg-gold-50'}`}
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-gold-500 text-white' : 'text-premium-gray hover:bg-gold-50'}`}
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-inter text-xs sm:text-sm border border-gray-300 rounded-lg px-2 sm:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500 w-full sm:w-auto"
              >
                <option value="popularity">Popularité</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name">Nom A-Z</option>
                <option value="rating">Meilleures notes</option>
              </select>
            </div>

            {/* Active filters */}
            {(selectedSizes.length > 0 || selectedColors.length > 0 || isEcoOnly || isRecycledOnly || selectedCategory !== 'Tous') && (
              <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  <span className="font-inter text-xs sm:text-sm text-premium-gray mb-1 sm:mb-0">Filtres actifs:</span>
                  
                  {selectedCategory !== 'Tous' && (
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                      {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory('Tous')}
                        className="ml-2 hover:text-gold-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedSizes.map((size) => (
                    <span key={size} className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-premium-gray">
                      Taille {size}
                      <button
                        onClick={() => toggleSize(size)}
                        className="ml-2 hover:text-premium-black"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  {selectedColors.map((color) => (
                    <span key={color} className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-premium-gray">
                      {color}
                      <button
                        onClick={() => toggleColor(color)}
                        className="ml-2 hover:text-premium-black"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  {isEcoOnly && (
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-eco-green/20 text-eco-green">
                      Éco-responsable
                      <button
                        onClick={() => setIsEcoOnly(false)}
                        className="ml-2 hover:text-eco-green/80"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {isRecycledOnly && (
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-eco-green/20 text-eco-green">
                      Recyclé
                      <button
                        onClick={() => setIsRecycledOnly(false)}
                        className="ml-2 hover:text-eco-green/80"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-8 sm:p-12 text-center">
                <h3 className="font-playfair text-lg sm:text-xl font-semibold text-premium-black mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="font-inter text-premium-gray mb-4 sm:mb-6 text-sm sm:text-base">
                  Essayez de modifier vos filtres pour voir plus de produits.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gold-500 hover:bg-gold-600 text-white font-inter font-medium px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Effacer tous les filtres
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'
                : 'space-y-4 sm:space-y-6'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onProductClick={onProductClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;