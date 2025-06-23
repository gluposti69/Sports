import React from 'react';
import { Button } from './ui/button';
import { Shield, Clock, MapPin, Star } from 'lucide-react';
import { mockData } from './mock';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url(data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)] opacity-30"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/10 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center text-white">
        <div className="animate-in fade-in slide-in-from-bottom duration-1000">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Professional
            <span className="block bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
              Building Inspections
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Protect your investment with comprehensive property inspections from Melbourne's most trusted experts
          </p>

          {/* Credentials Bar */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-colors duration-300">
              {/* VBA Logo Design */}
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs">VBA</span>
              </div>
              <span>VBA Registered</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-colors duration-300">
              {/* HIA Logo Design */}
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center relative">
                <div className="w-3 h-3 bg-white rounded-sm relative">
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-1 border-r-1 border-b-1 border-transparent border-b-yellow-400"></div>
                </div>
              </div>
              <span>HIA Member</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>15+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="w-5 h-5 text-green-400" />
              <span>2-3 Day Report Delivery</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin className="w-5 h-5 text-red-400" />
              <span>All Melbourne Areas</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-4 rounded-xl shadow-2xl hover:shadow-blue-300/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-semibold"
            >
              Book Your Inspection
            </Button>
            <Button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-semibold"
            >
              View Services
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-blue-200 text-sm">Inspections Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">5.0★</div>
              <div className="text-blue-200 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">2-3</div>
              <div className="text-blue-200 text-sm">Business Days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-blue-200 text-sm">Licensed & Insured</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
            <div className="w-1 h-3 bg-white/50 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;