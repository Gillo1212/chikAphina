import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  DollarSign,
  ArrowLeft
} from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [productList, setProductList] = useState(products);

  // Mock data for dashboard
  const dashboardStats = {
    totalRevenue: 12450,
    totalOrders: 89,
    totalProducts: productList.length,
    totalCustomers: 234,
    revenueGrowth: 12.5,
    orderGrowth: 8.3
  };

  const recentOrders = [
    { id: 'ORD-001', customer: 'Marie Dubois', total: 145.99, status: 'shipped', date: '2024-01-15' },
    { id: 'ORD-002', customer: 'Sophie Martin', total: 89.99, status: 'processing', date: '2024-01-15' },
    { id: 'ORD-003', customer: 'Claire Rousseau', total: 199.99, status: 'delivered', date: '2024-01-14' },
    { id: 'ORD-004', customer: 'Emma Laurent', total: 125.00, status: 'pending', date: '2024-01-14' },
  ];

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'products', name: 'Produits', icon: Package },
    { id: 'orders', name: 'Commandes', icon: ShoppingCart },
    { id: 'customers', name: 'Clients', icon: Users },
    { id: 'settings', name: 'Paramètres', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-eco-green text-white';
      case 'shipped': return 'bg-eco-info text-white';
      case 'processing': return 'bg-eco-warning text-white';
      case 'pending': return 'bg-eco-error text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Livré';
      case 'shipped': return 'Expédié';
      case 'processing': return 'En traitement';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chiffre d'affaires</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalRevenue.toLocaleString()}€</p>
            </div>
            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-gold-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-eco-green mr-1" />
            <span className="text-eco-green font-medium">+{dashboardStats.revenueGrowth}%</span>
            <span className="text-gray-600 ml-1">ce mois</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-eco-info/20 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-eco-info" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-eco-green mr-1" />
            <span className="text-eco-green font-medium">+{dashboardStats.orderGrowth}%</span>
            <span className="text-gray-600 ml-1">ce mois</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produits</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600">Actifs et en stock</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clients</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600">Clients actifs</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Commandes récentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Commande</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Client</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Total</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Statut</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Date</th>
                <th className="text-right py-3 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 px-6 text-gray-700">{order.customer}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{order.total}€</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{order.date}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-gold-600 hover:text-gold-800 mr-3">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-playfair text-2xl font-bold text-gray-900">Gestion des produits</h2>
        <button className="flex items-center space-x-2 bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nouveau produit</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Produit</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Catégorie</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Prix</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Stock</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Statut</th>
                <th className="text-right py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{product.category}</td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{product.price}€</div>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">{product.originalPrice}€</div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock ? 'bg-eco-green/20 text-eco-green' : 'bg-eco-error/20 text-eco-error'
                    }`}>
                      {product.inStock ? 'En stock' : 'Rupture'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {product.isEcoFriendly && (
                        <span className="px-2 py-1 bg-eco-green/20 text-eco-green rounded text-xs">Éco</span>
                      )}
                      {product.isRecycled && (
                        <span className="px-2 py-1 bg-gold-100 text-gold-700 rounded text-xs">Recyclé</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gold-600 hover:text-gold-800 p-1">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h2 className="font-playfair text-2xl font-bold text-gray-900">Gestion des commandes</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Commande</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Client</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Total</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Statut</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Date</th>
                <th className="text-right py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 px-6 text-gray-700">{order.customer}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{order.total}€</td>
                  <td className="py-4 px-6">
                    <select 
                      className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                      defaultValue={order.status}
                    >
                      <option value="pending">En attente</option>
                      <option value="processing">En traitement</option>
                      <option value="shipped">Expédié</option>
                      <option value="delivered">Livré</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{order.date}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gold-600 hover:text-gold-800 p-1">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return renderProducts();
      case 'orders':
        return renderOrders();
      case 'customers':
        return <div className="text-center py-12 text-gray-500">Gestion des clients - À implémenter</div>;
      case 'settings':
        return <div className="text-center py-12 text-gray-500">Paramètres - À implémenter</div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gold-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-inter text-sm sm:text-base hidden sm:inline">Retour au site</span>
              </button>
              <div className="border-l border-gray-300 pl-2 sm:pl-4">
                <h1 className="font-playfair text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Administration Chic<span className="text-gold-500">Alphina</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">Administrateur</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gold-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
              <div className="space-y-1 sm:space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-gold-500 text-white'
                        : 'text-gray-700 hover:bg-gold-50 hover:text-gold-600'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;