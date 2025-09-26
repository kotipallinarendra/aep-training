import React from 'react';

export default function Toast({ message, show, color }) {
    const bgColor = color == 'green' ? 'bg-green-500' : 'bg-red-500';
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Blurred transparent overlay */}
            <div
                className={`absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm transition-opacity duration-300 ${
                show ? 'opacity-100' : 'opacity-0'
                }`}
            ></div>

            {/* Toast message with casual animation */}
            <div
                className={`
                relative ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg z-10
                transform transition-all duration-500 ease-out
                ${show ? 'opacity-100 animate-toastIn' : 'opacity-0'}
                `}
            >
                {message}
            </div>

            {/* Tailwind custom keyframes */}
            <style jsx>{`
                @keyframes toastIn {
                0% {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.8);
                }
                60% {
                    opacity: 1;
                    transform: translateY(10px) scale(1.05);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                }

                .animate-toastIn {
                animation: toastIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}