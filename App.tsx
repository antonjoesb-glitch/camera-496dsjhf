
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import ConciergeChat from './components/ConciergeChat';
import { Category, Product, CartItem, SearchRecommendation } from './types';
import { PRODUCTS, CATEGORIES } from './constants';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [recommendations, setRecommendations] = useState<SearchRecommendation[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const filteredProducts = useMemo(() => {
    return activeCategory === 'All' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Combine products with AI metadata
  const productsWithRecommendations = useMemo(() => {
    const recIds = recommendations.map(r => r.id);
    const recs = PRODUCTS.filter(p => recIds.includes(p.id));
    const nonRecs = filteredProducts.filter(p => !recIds.includes(p.id));
    
    // Put recommendations at the top
    return [...recs, ...nonRecs];
  }, [filteredProducts, recommendations]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setNotification(`Added ${product.name} to cart`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = (roomNumber: string) => {
    alert(`Thank you! Your order is being prepared for Room ${roomNumber}. It will arrive in approximately 15 minutes.`);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
      />

      {/* Notifications */}
      <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${notification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="bg-zinc-900 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium">
          {notification}
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl mb-8">
            <img 
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200" 
              alt="Luxury Hotel" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 md:p-12">
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-2">Curated for your stay.</h2>
              <p className="text-zinc-200 text-sm md:text-lg max-w-md">Browse our collection of premium snacks, drinks, and local essentials delivered directly to your door.</p>
            </div>
          </div>

          {/* AI Search Info */}
          {recommendations.length > 0 && (
            <div className="mb-8 flex items-center justify-between bg-zinc-900 text-white p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Concierge Selections</span>
                <p className="text-sm">We've found a few items tailored to your request.</p>
              </div>
              <button 
                onClick={() => setRecommendations([])}
                className="text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as Category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
                  activeCategory === cat 
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg' 
                    : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-24">
          {productsWithRecommendations.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
              recommendationReason={recommendations.find(r => r.id === product.id)?.reason}
            />
          ))}
        </section>
      </main>

      {/* Cart Drawer */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Floating Concierge Chat */}
      <ConciergeChat 
        isProcessing={isProcessingAI}
        setIsProcessing={setIsProcessingAI}
        onRecommendationsFound={setRecommendations} 
      />

      <footer className="bg-white border-t border-zinc-200 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-xl font-bold mb-2">Grand Stay Hotel & Spa</h2>
            <p className="text-zinc-500 text-sm">Room Service Boutique • Open 24/7</p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-900">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-900">Terms of Service</a>
            <a href="#" className="hover:text-zinc-900">Contact Desk</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
