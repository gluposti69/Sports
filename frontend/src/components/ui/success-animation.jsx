import React from 'react';
import { CheckCircle, Phone, Mail } from 'lucide-react';

const SuccessAnimation = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in zoom-in duration-500">
        {/* Success Animation */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600 animate-bounce" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-green-200 rounded-full mx-auto animate-ping"></div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for choosing BlueCheck Inspections. We'll contact you within 2 hours to confirm your appointment.
        </p>

        {/* Quick Contact Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 space-y-2">
          <div className="flex items-center justify-center space-x-2 text-blue-700">
            <Phone className="w-4 h-4" />
            <span className="font-semibold">0477 167 167</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-blue-700">
            <Mail className="w-4 h-4" />
            <span className="font-semibold">bluecheckinspections@gmail.com</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
        >
          Continue Browsing
        </button>
      </div>
    </div>
  );
};

export default SuccessAnimation;