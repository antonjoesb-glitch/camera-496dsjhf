
import React, { useState, useRef, useEffect } from 'react';
import { getAIRecommendations } from '../services/geminiService';
import { SearchRecommendation } from '../types';

interface ConciergeChatProps {
  onRecommendationsFound: (recommendations: SearchRecommendation[]) => void;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
}

const ConciergeChat: React.FC<ConciergeChatProps> = ({ 
  onRecommendationsFound, 
  isProcessing,
  setIsProcessing
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;

    setIsProcessing(true);
    setIsOpen(false);
    
    try {
      const results = await getAIRecommendations(query);
      onRecommendationsFound(results);
      setQuery('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {isOpen && (
        <form 
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-2xl shadow-2xl border border-zinc-200 w-[300px] mb-2 animate-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Digital Concierge</h4>
            <button type="button" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <p className="text-sm text-zinc-600 mb-3">What are you in the mood for? (e.g., "Something sweet" or "I need to sleep")</p>
          <div className="flex gap-2">
            <input 
              ref={inputRef}
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type here..."
              className="flex-1 px-3 py-2 bg-zinc-50 rounded-lg text-sm border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
            <button 
              type="submit"
              className="p-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </div>
        </form>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 text-white'}`}
      >
        {isProcessing ? (
           <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
        ) : (
          isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          )
        )}
      </button>
    </div>
  );
};

export default ConciergeChat;
