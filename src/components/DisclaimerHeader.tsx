
import React from 'react';

const DisclaimerHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-school-red text-white py-2 px-4 text-center text-sm font-medium shadow-lg">
      <p>
        This website was created by <span className="font-semibold">Atharv Mishra</span> from{' '}
        <span className="font-semibold">Class 12</span> at the AI Summer Camp by Times of India. 
        This website is not the official website of the school.
      </p>
    </div>
  );
};

export default DisclaimerHeader;
