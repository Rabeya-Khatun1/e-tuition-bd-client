import React from 'react';
import Logo from '../Logo/Logo';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <title>eTuitionBd - Loading</title>
      
      <div className="relative w-32 h-32">
        {/* Outer spinning ring - gradient colors */}
        <div className="absolute inset-0 border-4 rounded-full animate-spin border-t-transparent"
             style={{
               background: 'conic-gradient(transparent, #005B3B, #80CFB3, ##005B3B, transparent)',
               borderImage: 'conic-gradient(from 0deg, #005B3B, #80CFB3, ##005B3B) 1',
               animation: 'spin 1.2s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite'
             }}>
        </div>
        
        {/* Middle ring - subtle pulse effect */}
        <div className="absolute inset-3 border-3 border-blue-400/30 rounded-full animate-pulse"></div>
        
        {/* Inner logo container */}
        <div className="absolute inset-6 flex items-center justify-center  rounded-full shadow-xl">
          {/* Custom "eT" logo */}
          <div className="relative">
            <div className="text-2xl font-bold text-white tracking-tight">
              <span className="text-primary-200">e</span>
              <span className="text-primary-500">T</span>
            </div>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-400"></div>
            
          </div>
        </div>
        
        {/* Floating dots */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-secondary-300 rounded-full animate-bounce"
             style={{ animationDelay: '0.1s' }}>

             </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary-300 rounded-full animate-bounce"
             style={{ animationDelay: '0.3s' }}>

             </div>
             
      </div>
          <div className="">

      <Logo></Logo>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default Loading;