import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, Leaf } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, onCheckout }) => {
  const { state, dispatch } = useCart();

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    }
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="font-playfair text-lg sm:text-xl font-semibold text-premium-black">
              Panier ({state.itemCount})
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-premium-gray" />
            </button>
          </div>

          {/* Content */}
          {state.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
              <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mb-3 sm:mb-4" />
              <h3 className="font-playfair text-base sm:text-lg font-medium text-premium-gray mb-2 text-center">
                Votre panier est vide
              </h3>
              <p className="text-center text-premium-gray font-inter text-xs sm:text-sm leading-relaxed">
                Découvrez nos collections éco-responsables et ajoutez vos coups de cœur.
              </p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
                {state.items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-inter font-medium text-premium-black text-xs sm:text-sm line-clamp-2">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-premium-gray">
                        <span className="text-xs text-premium-gray">
                          Taille: {item.size}
                        </span>
                        <span className="text-xs text-premium-gray">
                          Couleur: {item.color}
                        </span>
                      </div>
                      {item.product.isEcoFriendly && (
                        <div className="flex items-center mt-1">
                          <Leaf className="w-3 h-3 text-eco-green mr-1" />
                          <span className="text-xs text-eco-green">Éco-responsable</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2 sm:mt-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100 flex-shrink-0"
                          >
                            <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                          </button>
                          <span className="font-inter font-medium text-xs sm:text-sm min-w-[1.5rem] sm:min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100 flex-shrink-0"
                          >
                            <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-playfair font-semibold text-premium-black text-sm sm:text-base">
                            {(item.product.price * item.quantity).toFixed(2)}€
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded hover:bg-eco-error/10 text-eco-error flex-shrink-0"
                          >
                            <Trash2 className="w-2 h-2 sm:w-3 sm:h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 sm:p-6 space-y-3 sm:space-y-4">
                {/* Sustainability info */}
                <div className="bg-eco-green/10 p-2 sm:p-3 rounded-lg">
                  <div className="flex items-center text-eco-green text-xs sm:text-sm">
                    <Leaf className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span>Impact carbone estimé: {(state.items.reduce((acc, item) => 
                      acc + (item.product.sustainability.carbonFootprint * item.quantity), 0)).toFixed(1)}kg CO₂</span>
                  </div>
                </div>

                {/* Shipping */}
                <div className="text-center text-xs sm:text-sm text-premium-gray">
                  {state.total >= 75 ? (
                    <span className="text-eco-green">🎉 Livraison gratuite incluse!</span>
                  ) : (
                    <span>
                      Ajoutez {(75 - state.total).toFixed(2)}€ pour la livraison gratuite
                    </span>
                  )}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between text-base sm:text-lg">
                  <span className="font-playfair font-semibold text-premium-black">
                    Total
                  </span>
                  <span className="font-playfair font-bold text-lg sm:text-xl text-premium-black">
                    {state.total.toFixed(2)}€
                  </span>
                </div>

                {/* Checkout button */}
                <button
                  onClick={onCheckout}
                  className="w-full bg-gold-500 hover:bg-gold-600 text-white font-inter font-semibold py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Commander
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full border border-gold-500 text-gold-500 hover:bg-gold-50 font-inter font-medium py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Continuer mes achats
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { CartSidebar as default };