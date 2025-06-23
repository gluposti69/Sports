import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { mockData } from './mock';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      {/* Top Contact Bar */}
      <div className="bg-blue-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{mockData.business.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{mockData.business.email}</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Servicing {mockData.business.serviceArea}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* BlueCheck Inspections Official Logo */}
            <div className="w-16 h-16 bg-blue-900 rounded-lg flex items-center justify-center shadow-lg relative p-2">
              {/* Recreating the geometric house design */}
              <div className="relative w-12 h-10">
                {/* Outer geometric frame */}
                <svg className="w-full h-full" viewBox="0 0 48 40" fill="none">
                  {/* Main house outline */}
                  <path d="M2 38 L2 20 L12 8 L36 8 L46 20 L46 38 L38 38 L38 16 L10 16 L10 38 Z" 
                        stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
                  {/* Inner frame */}
                  <path d="M10 16 L10 38 L16 38 L16 20 L32 20 L32 38 L38 38 L38 16" 
                        stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
                  {/* Center building with horizontal lines */}
                  <rect x="18" y="22" width="12" height="12" 
                        stroke="#D4AF37" strokeWidth="1" fill="#1e3a8a"/>
                  {/* Horizontal lines inside */}
                  <line x1="19" y1="24" x2="29" y2="24" stroke="white" strokeWidth="0.8"/>
                  <line x1="19" y1="26" x2="29" y2="26" stroke="white" strokeWidth="0.8"/>
                  <line x1="19" y1="28" x2="29" y2="28" stroke="white" strokeWidth="0.8"/>
                  <line x1="19" y1="30" x2="29" y2="30" stroke="white" strokeWidth="0.8"/>
                  <line x1="19" y1="32" x2="29" y2="32" stroke="white" strokeWidth="0.8"/>
                </svg>
              </div>
            </div>
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                <span className="tracking-wider">BLUECHECK</span>
              </h1>
              <p className={`text-sm font-semibold transition-colors duration-300 tracking-widest ${
                isScrolled ? 'text-yellow-600' : 'text-yellow-400'
              }`}>
                INSPECTIONS P/L
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className={`hover:text-blue-600 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`hover:text-blue-600 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className={`hover:text-blue-600 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`hover:text-blue-600 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Contact
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Book Inspection
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 mt-4 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-4 px-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full justify-center"
              >
                Book Inspection
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;