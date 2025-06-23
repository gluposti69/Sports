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
            <div className="w-14 h-14 bg-blue-900 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
              {/* Geometric house design from the logo */}
              <div className="relative w-10 h-8">
                {/* Outer house frame */}
                <div className="absolute inset-0">
                  {/* Left wall */}
                  <div className="absolute left-0 top-2 w-3 h-6 border-l-2 border-b-2 border-yellow-400"></div>
                  {/* Right wall */}
                  <div className="absolute right-0 top-2 w-3 h-6 border-r-2 border-b-2 border-yellow-400"></div>
                  {/* Top roof lines */}
                  <div className="absolute left-1 top-0 w-8 h-4 border-l-2 border-t-2 border-r-2 border-yellow-400 transform skew-y-12"></div>
                </div>
                {/* Center building with lines */}
                <div className="absolute left-1/2 top-3 transform -translate-x-1/2 w-4 h-4 border-2 border-yellow-400 bg-blue-900">
                  {/* Horizontal lines */}
                  <div className="absolute inset-1 space-y-0.5">
                    <div className="h-0.5 bg-white"></div>
                    <div className="h-0.5 bg-white"></div>
                    <div className="h-0.5 bg-white"></div>
                    <div className="h-0.5 bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                <span className="tracking-wider">BLUECHECK</span>
              </h1>
              <p className={`text-sm font-medium transition-colors duration-300 tracking-widest ${
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