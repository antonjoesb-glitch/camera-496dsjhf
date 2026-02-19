
import React from 'react';

interface HeaderProps {
  onCartClick: () => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, cartCount }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center rounded-sm">
            <span className="text-white font-serif font-bold text-lg">G</span>
          </div>
          <h1 className="font-serif text-xl font-bold tracking-tight text-zinc-900">Grand Stay Boutique</h1>
        </div>
        
        <button 
          onClick={onCartClick}
          className="relative p-2 text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-zinc-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
