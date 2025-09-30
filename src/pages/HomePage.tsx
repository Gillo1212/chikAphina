import React, { useState } from 'react';
import { ArrowRight, Truck, RotateCcw, Award, Leaf, Recycle, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { featuredProducts, newArrivals, recycledCollection } from '../data/products';
import { Product } from '../types';

interface HomePageProps {
  onProductClick: (product: Product) => void;
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onProductClick, onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      image: 'https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg',
      title: 'Collection Printemps 2024',
      subtitle: 'Élégance Éco-Responsable',
      description: 'Découvrez notre nouvelle collection alliant style contemporain et engagement environnemental.',
      cta: 'Découvrir la collection',
      action: () => onNavigate('new')
    },
    {
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      title: 'Mode Recyclée Premium',
      subtitle: 'Luxe Durable',
      description: 'Des pièces uniques créées à partir de vêtements recyclés et upcyclés avec expertise.',
      cta: 'Voir la collection recyclée',
      action: () => onNavigate('recycled')
    },
    {
      image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
      title: 'Prêt-à-Porter Éthique',
      subtitle: 'Qualité Certifiée',
      description: 'Vêtements neufs confectionnés selon les plus hauts standards éthiques et environnementaux.',
      cta: 'Découvrir',
      action: () => onNavigate('women')
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen min-h-[500px] sm:min-h-[600px] lg:min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all z-10"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all z-10"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-script text-xl sm:text-2xl md:text-3xl text-gold-400 mb-3 sm:mb-4 animate-fade-in">
              {heroSlides[currentSlide].subtitle}
            </h2>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 animate-slide-up leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="font-inter text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in leading-relaxed">
              {heroSlides[currentSlide].description}
            </p>
            <button
              onClick={heroSlides[currentSlide].action}
              className="inline-flex items-center bg-gold-500 hover:bg-gold-600 text-white font-inter font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all transform hover:scale-105 animate-fade-in text-sm sm:text-base"
            >
              {heroSlides[currentSlide].cta}
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-gold-500 w-6 sm:w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 bg-premium-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Truck,
                title: 'Livraison Gratuite',
                description: 'Dès 75€ d\'achat partout en France'
              },
              {
                icon: RotateCcw,
                title: 'Retours 30 Jours',
                description: 'Échange et remboursement gratuits'
              },
              {
                icon: Award,
                title: 'Qualité Premium',
                description: 'Matériaux nobles et finitions d\'exception'
              },
              {
                icon: Leaf,
                title: 'Éco-Responsable',
                description: 'Mode durable et certifications éthiques'
              }
            ].map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-gold-500 group-hover:scale-110 transition-all duration-300">
                  <value.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gold-500 group-hover:text-white" />
                </div>
                <h3 className="font-playfair text-base sm:text-lg font-semibold text-premium-black mb-2">
                  {value.title}
                </h3>
                <p className="font-inter text-premium-gray text-xs sm:text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-premium-black mb-3 sm:mb-4">
              Nos Coups de Cœur
            </h2>
            <p className="font-inter text-premium-gray max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Découvrez notre sélection de pièces exceptionnelles, alliant élégance intemporelle et engagement éco-responsable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onProductClick={onProductClick}
              />
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={() => onNavigate('women')}
              className="inline-flex items-center border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white font-inter font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
            >
              Voir toute la collection
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Recycled Collection Highlight */}
      <section className="py-12 sm:py-16 bg-eco-green/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <Recycle className="w-6 h-6 sm:w-8 sm:h-8 text-eco-green mr-2 sm:mr-3" />
                <span className="font-inter font-semibold text-eco-green text-sm sm:text-base">Collection Recyclée</span>
              </div>
              <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-premium-black mb-4 sm:mb-6">
                Mode Circulaire & Créative
              </h2>
              <p className="font-inter text-premium-gray text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                Chaque pièce de notre collection recyclée raconte une histoire unique. Nos artisans transforment des vêtements oubliés en créations contemporaines d'exception.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <div className="text-2xl sm:text-3xl font-playfair font-bold text-eco-green">85%</div>
                  <div className="text-xs sm:text-sm font-inter text-premium-gray">Matériaux recyclés</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-playfair font-bold text-eco-green">-60%</div>
                  <div className="text-xs sm:text-sm font-inter text-premium-gray">Émissions CO₂</div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('recycled')}
                className="inline-flex items-center bg-eco-green hover:bg-eco-green/90 text-white font-inter font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
              >
                Découvrir la collection
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 lg:mt-0">
              {recycledCollection.slice(0, 4).map((product) => (
                <div key={product.id} className="group cursor-pointer" onClick={() => onProductClick(product)}>
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                      <h4 className="font-inter font-medium text-xs sm:text-sm line-clamp-1">{product.name}</h4>
                      <p className="font-playfair font-semibold text-sm sm:text-base">{product.price}€</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-16 bg-gold-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Restez Connectée
          </h2>
          <p className="font-inter text-white/90 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Inscrivez-vous à notre newsletter et recevez en avant-première nos nouveautés, conseils styling et offres exclusives.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 sm:px-6 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none font-inter text-premium-black focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
            />
            <button className="bg-premium-black hover:bg-premium-gray text-white px-6 sm:px-8 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-inter font-semibold transition-colors text-sm sm:text-base">
              S'inscrire
            </button>
          </div>
          <p className="font-inter text-white/70 text-xs sm:text-sm mt-3 sm:mt-4">
            Pas de spam, seulement du contenu de qualité. Désabonnement facile à tout moment.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-premium-black mb-3 sm:mb-4">
              Nos Clientes Témoignent
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Sophie M.',
                rating: 5,
                comment: 'Des vêtements d\'une qualité exceptionnelle ! J\'adore leur engagement pour l\'environnement.',
                verified: true
              },
              {
                name: 'Marie L.',
                rating: 5,
                comment: 'Service client impeccable et livraison ultra rapide. Je recommande vivement !',
                verified: true
              },
              {
                name: 'Clara D.',
                rating: 5,
                comment: 'Enfin une marque qui allie style et responsabilité. Mes achats coup de cœur !',
                verified: true
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-premium-gray-light p-4 sm:p-6 rounded-lg">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 fill-current" />
                  ))}
                </div>
                <p className="font-inter text-premium-gray mb-3 sm:mb-4 italic text-sm sm:text-base leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gold-500 rounded-full flex items-center justify-center text-white font-inter font-semibold text-sm sm:text-base">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-2 sm:ml-3">
                    <div className="font-inter font-medium text-premium-black text-sm sm:text-base">
                      {testimonial.name}
                    </div>
                    <div className="text-xs sm:text-sm text-eco-green">Achat vérifié ✓</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;