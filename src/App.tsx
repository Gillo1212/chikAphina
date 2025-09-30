import React, { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import HomePage from './pages/HomePage';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import { Product } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    alert('Redirection vers le processus de commande...\n\nFonctionnalités à implémenter :\n- Formulaire d\'adresse\n- Choix de livraison\n- Paiement sécurisé\n- Confirmation de commande');
  };

  const renderCurrentPage = () => {
    if (currentPage === 'admin') {
      return <AdminDashboard onBack={() => handleNavigate('home')} />;
    }

    if (selectedProduct && currentPage === 'product-detail') {
      return (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => handleNavigate(currentPage === 'product-detail' ? 'home' : currentPage)}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onProductClick={handleProductClick} onNavigate={handleNavigate} />;
      case 'new':
        return <ProductCatalog category="new" onProductClick={handleProductClick} />;
      case 'recycled':
        return <ProductCatalog category="recycled" onProductClick={handleProductClick} />;
      case 'women':
        return <ProductCatalog category="women" onProductClick={handleProductClick} />;
      case 'accessories':
        return <ProductCatalog category="accessories" onProductClick={handleProductClick} />;
      case 'about':
        return (
          <div className="min-h-screen bg-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="font-playfair text-4xl font-bold text-premium-black mb-8">
                  Notre Engagement Éco-Responsable
                </h1>
                <div className="prose prose-lg mx-auto">
                  <p className="font-inter text-premium-gray leading-relaxed mb-6">
                    Chic Alphina Store est née d'une vision : prouver que mode et responsabilité environnementale 
                    peuvent parfaitement coexister. Nous croyons qu'il est possible de créer des vêtements beaux, 
                    durables et éthiques.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-eco-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🌱</span>
                      </div>
                      <h3 className="font-playfair text-xl font-semibold mb-2">Matériaux Durables</h3>
                      <p className="text-sm text-premium-gray">
                        Coton bio, soie éthique, matériaux recyclés certifiés
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">♻️</span>
                      </div>
                      <h3 className="font-playfair text-xl font-semibold mb-2">Économie Circulaire</h3>
                      <p className="text-sm text-premium-gray">
                        Upcycling créatif et programme de reprise
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-eco-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🤝</span>
                      </div>
                      <h3 className="font-playfair text-xl font-semibold mb-2">Commerce Équitable</h3>
                      <p className="text-sm text-premium-gray">
                        Partenariats éthiques et conditions de travail justes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <HomePage onProductClick={handleProductClick} onNavigate={handleNavigate} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        {currentPage !== 'admin' && (
          <Header
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}
        
        <main>
          {renderCurrentPage()}
        </main>
        
        {currentPage !== 'admin' && <Footer />}
        
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />
      </div>
    </CartProvider>
  );
}

export default App;