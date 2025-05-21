'use client';

import Header from '../../components/Header';
import { FiArrowUp } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function FixtureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white py-4 sm:py-6 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="text-xl font-bold text-gray-900 flex items-center mb-3 sm:mb-0">
              <span className="text-primary">Yalla</span>Score
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-gray-600">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Help</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 mt-4">
            © {new Date().getFullYear()} YallaScore. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 bg-primary text-white rounded-full p-3 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 hover:bg-primary/90 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
} 