import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating = 0 }) => {
  // Calculate the number of full stars
  const fullStars = Math.floor(rating);

  // Determine if there's a half star
  const hasHalfStar = rating % 1 >= 0.5;

  // Calculate the number of empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Render full stars */}
      {Array(fullStars).fill().map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-400" />
      ))}

      {/* Render half star if needed */}
      {hasHalfStar && <FaStarHalfAlt key="half" className="text-yellow-400" />}

      {/* Render empty stars */}
      {Array(emptyStars).fill().map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
      ))}
    </div>
  );
};

export default RatingStars;
