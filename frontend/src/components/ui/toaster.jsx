import React from 'react';
import { useToast } from '../../hooks/use-toast';

const Toast = ({ id, title, description, onOpenChange }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onOpenChange(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onOpenChange]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4 max-w-md animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          {description && <p className="text-gray-600 text-sm mt-1">{description}</p>}
        </div>
        <button
          onClick={() => onOpenChange(false)}
          className="text-gray-400 hover:text-gray-600 ml-4"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const Toaster = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50">
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
  );
};

export { Toaster };