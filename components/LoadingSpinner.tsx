import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-brand-light border-t-brand-dark rounded-full animate-spin"></div>
            <p className="text-brand-dark font-medium animate-pulse">Carregando...</p>
        </div>
    </div>
);

export default LoadingSpinner;
