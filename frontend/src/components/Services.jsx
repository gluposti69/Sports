import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, DollarSign, CheckCircle, Home, Search, Shield } from 'lucide-react';
import { mockData } from './mock';

const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getServiceIcon = (title) => {
    if (title.includes('Pre-Purchase')) return <Search className="w-8 h-8 text-blue-600" />;
    if (title.includes('New Home')) return <Home className="w-8 h-8 text-green-600" />;
    return <Shield className="w-8 h-8 text-purple-600" />;
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Inspection Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive building inspections tailored to protect your investment and ensure peace of mind
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mockData.services.map((service, index) => (
            <Card 
              key={service.id} 
              className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg animate-in fade-in slide-in-from-bottom duration-700`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="pb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
                    {getServiceIcon(service.title)}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-lg font-semibold text-green-600">{service.price}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Book This Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Steps */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Inspection Process
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {mockData.inspectionProcess.map((step, index) => (
              <div key={step.step} className="text-center group cursor-pointer">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors duration-300 hover:scale-110 transform">
                    <span className="text-2xl font-bold text-blue-600">{step.step}</span>
                  </div>
                  {index < mockData.inspectionProcess.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-x-8"></div>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;