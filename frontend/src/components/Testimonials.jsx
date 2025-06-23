import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star, MapPin, Calendar } from 'lucide-react';
import { mockData } from './mock';

const Testimonials = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it - hear from Melbourne property owners who trusted us with their investments
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {mockData.testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className={`hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg group animate-in fade-in slide-in-from-bottom duration-700`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex items-center mb-6">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div className="border-t pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{testimonial.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(testimonial.date)}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300">
                      <span className="text-blue-600 font-bold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                5.0
              </div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="text-gray-600 font-medium">Client Satisfaction</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Trust Badges with Professional Logos */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-90">
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-4">
            {/* VBA Logo Design */}
            <div className="w-16 h-16 bg-white border-3 border-blue-600 rounded-xl flex flex-col items-center justify-center shadow-lg">
              <div className="text-blue-600 font-bold text-sm">VBA</div>
              <div className="text-blue-400 text-xs">REG</div>
            </div>
            <div>
              <span className="text-gray-800 font-bold block">VBA Registered</span>
              <span className="text-gray-600 text-sm">Building Practitioner</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-4">
            {/* HIA Logo Design */}
            <div className="w-16 h-16 bg-green-600 rounded-xl flex flex-col items-center justify-center shadow-lg relative">
              <div className="text-white font-bold text-sm">HIA</div>
              <div className="absolute -bottom-1 -right-1 w-6 h-4 bg-yellow-500 rounded-sm flex items-center justify-center">
                <div className="w-3 h-2 bg-green-600 rounded-sm"></div>
              </div>
            </div>
            <div>
              <span className="text-gray-800 font-bold block">HIA Member</span>
              <span className="text-gray-600 text-sm">Housing Industry</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-gray-800 font-bold block">5.0 Star Rating</span>
              <span className="text-gray-600 text-sm">Customer Rated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;