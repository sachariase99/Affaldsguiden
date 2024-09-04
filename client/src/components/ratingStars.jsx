import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array(fullStars).fill().map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-400" />
      ))}
      {hasHalfStar && <FaStarHalfAlt key="half" className="text-yellow-400" />}
      {Array(emptyStars).fill().map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
      ))}
    </div>
  );
};

export default RatingStars;
