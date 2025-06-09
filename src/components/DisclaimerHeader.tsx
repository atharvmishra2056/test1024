
import React from 'react';

const DisclaimerHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-school-red text-white py-1 md:py-2 px-4 text-center text-xs md:text-sm font-medium shadow-lg">
      <p className="leading-tight">
        This website was created by <span className="font-semibold">Atharv Mishra</span> from{' '}
        <span className="font-semibold">Class 12</span> at the AI Summer Camp by Times of India. 
        <span className="hidden md:inline"> This website is not the official website of the school.</span>
      </p>
    </div>
  );
};

export default DisclaimerHeader;
