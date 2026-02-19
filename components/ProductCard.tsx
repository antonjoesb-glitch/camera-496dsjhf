
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  recommendationReason?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, recommendationReason }) => {
  return (
    <div className={`group relative bg-white border border-zinc-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${recommendationReason ? 'ring-2 ring-zinc-900/10' : ''}`}>
      {recommendationReason && (
        <div className="absolute top-3 left-3 z-10 bg-zinc-900 text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold shadow-sm">
          Recommended
        </div>
      )}
      
      <div className="aspect-[4/5] overflow-hidden bg-zinc-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">{product.name}</h3>
          <span className="font-medium text-zinc-600">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-zinc-500 line-clamp-2 mb-4 h-10">
          {product.description}
        </p>
        
        {recommendationReason && (
          <p className="text-xs italic text-zinc-600 mb-4 bg-zinc-50 p-2 rounded border border-zinc-100">
            "{recommendationReason}"
          </p>
        )}

        <button 
          onClick={() => onAddToCart(product)}
          className="w-full py-2.5 bg-zinc-900 text-white rounded-lg font-medium text-sm transition-all active:scale-95 hover:bg-zinc-800 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
