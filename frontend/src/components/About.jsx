import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, Eye, Clock, Users, Award, MapPin } from 'lucide-react';
import { mockData } from './mock';

const About = () => {
  const iconMap = {
    Shield: Shield,
    Eye: Eye,
    Clock: Clock,
    Users: Users
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Blue Check Inspections?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Melbourne's trusted building inspection experts with over 15 years of experience protecting property investments
          </p>
        </div>

        {/* Credentials Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12 mb-16 animate-in fade-in slide-in-from-left duration-700">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Licensed & Certified Professionals
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our team brings decades of construction and inspection expertise to every property evaluation. 
                We're not just inspectors - we're your advocates in making informed property decisions.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {mockData.business.credentials.map((credential, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-800 font-medium">{credential}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">VBA Registered</h4>
                  <p className="text-blue-600 font-medium">Master Builder Member</p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{mockData.business.serviceArea}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mockData.whyChooseUs.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            return (
              <Card 
                key={index} 
                className={`text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg group animate-in fade-in slide-in-from-bottom duration-700`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300 group-hover:scale-110 transform">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Sample Report Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 animate-in fade-in slide-in-from-right duration-700">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="bg-blue-600 text-white p-4 rounded-lg mb-4">
                  <h5 className="font-bold text-lg">INSPECTION REPORT</h5>
                  <p className="text-blue-100 text-sm">Property Assessment Summary</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Report Pages:</span>
                    <span className="font-medium">32 pages</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Photos Included:</span>
                    <span className="font-medium">67 images</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-medium text-green-600">18 hours</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {mockData.sampleReport.title}
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {mockData.sampleReport.description}
              </p>
              
              <div className="space-y-4 mb-8">
                {mockData.sampleReport.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-4 py-2">
                  {mockData.sampleReport.pages}
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  {mockData.sampleReport.delivery}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;