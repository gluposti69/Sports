import React from 'react';
import { Phone, Mail, MapPin, Shield, Star, Clock } from 'lucide-react';
import { mockData } from './mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_safe-inspector-1/artifacts/0c17tc65_ChatGPT%20Image%20Oct%2014%2C%202025%2C%2005_07_45%20PM.png" 
                alt="Safe Building Inspections Logo" 
                className="h-20 w-auto object-contain"
              />
              <div>
                <h3 className="text-2xl font-bold">{mockData.business.name}</h3>
                <p className="text-gray-400">{mockData.business.tagline}</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Melbourne's trusted building inspection experts with over 20 years of experience. 
              Protecting your property investments with comprehensive, professional inspections.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">{mockData.business.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">{mockData.business.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">{mockData.business.serviceArea}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li className="text-gray-300">Pre-Purchase Inspections</li>
              <li className="text-gray-300">New Home Inspections</li>
              <li className="text-gray-300">Pre-Handover Inspections</li>
              <li className="text-gray-300">Dilapidation Reports</li>
              <li className="text-gray-300">Safe to Rent Reports</li>
            </ul>
          </div>
        </div>

        {/* Credentials Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
            <div className="flex flex-wrap items-center gap-6">
              {mockData.business.credentials.map((credential, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2 hover:bg-gray-700 transition-colors duration-300">
                  {credential.includes('VBA') ? (
                    <img 
                      src="https://customer-assets.emergentagent.com/job_safe-inspector-1/artifacts/5cff2s6p_vba%20logo.jpg" 
                      alt="VBA Registered" 
                      className="w-6 h-6 object-contain"
                    />
                  ) : credential.includes('HIA') ? (
                    <img 
                      src="https://customer-assets.emergentagent.com/job_safe-inspector-1/artifacts/bo0vhow8_HIA-1375984727.png" 
                      alt="HIA Member" 
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <Shield className="w-4 h-4 text-blue-400" />
                  )}
                  <span className="text-sm text-gray-300">{credential}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>5.0/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-400" />
                <span>24 Hour Reports</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} {mockData.business.name}. All rights reserved.
            </div>
            
            {/* Logo Section */}
            <div className="flex items-center gap-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_safe-inspector-1/artifacts/5cff2s6p_vba%20logo.jpg" 
                alt="VBA Registered Building Practitioner" 
                className="h-16 w-auto object-contain"
              />
              <img 
                src="https://customer-assets.emergentagent.com/job_safe-inspector-1/artifacts/bo0vhow8_HIA-1375984727.png" 
                alt="HIA Member" 
                className="h-16 w-auto object-contain"
              />
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Fully Insured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;