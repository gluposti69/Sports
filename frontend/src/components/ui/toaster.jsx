import React from 'react';
import { useToast } from '../../hooks/use-toast';

const Toast = ({ id, title, description, onOpenChange }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onOpenChange(false), 300); // Allow animation to complete
    }, 5000);
    return () => clearTimeout(timer);
  }, [onOpenChange]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onOpenChange(false), 300); // Allow animation to complete
  };

  if (!isVisible) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-2xl p-4 mb-4 max-w-md animate-out slide-out-to-right duration-300 border-l-4 border-l-green-500 opacity-0 scale-95">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h4 className="font-semibold text-gray-900">{title}</h4>
            </div>
            {description && <p className="text-gray-600 text-sm">{description}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-2xl p-4 mb-4 max-w-md animate-in slide-in-from-right duration-300 border-l-4 border-l-green-500">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h4 className="font-semibold text-gray-900">{title}</h4>
          </div>
          {description && <p className="text-gray-600 text-sm">{description}</p>}
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 ml-4 flex-shrink-0 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const Toaster = () => {
  const { toasts } = useToast();

  if (!toasts || toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            title={toast.title}
            description={toast.description}
            onOpenChange={toast.onOpenChange}
          />
        ))}
      </div>
    </div>
  );
};

export { Toaster };