import React from 'react';

const TutorStatCard = ({ title, value, icon, color, isLoading }) => {
    return (
        <div className={`card shadow-xl border-t-4 ${color} transform transition duration-500 hover:scale-[1.02]`}>
      <div className="card-body p-5">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-lg font-medium ">{title}</h2>
          <div className="text-4xl text-opacity-75">{icon}</div>
        </div>
        {isLoading ? (
          <span className="loading loading-dots loading-lg text-primary"></span>
        ) : (
          <p className="text-4xl font-extrabold mt-1">
            {title === 'Total Earnings' ? `$${value.toFixed(2)}` : value}
          </p>
        )}
      </div>
    </div>
    );
};

export default TutorStatCard;

