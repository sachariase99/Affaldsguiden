import { useEffect, useState } from "react";
import { useSupabase } from "../supabase/supabaseClient";
import { FaStar, FaRegStar } from "react-icons/fa";
import pfp from "../assets/pfp.png";

const ReviewList = ({ siteId }) => {
  const { supabase } = useSupabase();
  const [reviews, setReviews] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("site_id", siteId);

      if (error) {
        console.error("Error fetching reviews:", error);
      } else {
        setReviews(data);
      }
    };

    fetchReviews();
  }, [siteId, supabase]);

  // Function to render stars based on rating
  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ fontSize: "20px" }}>
          {i <= numStars ? (
            <FaStar color="#FFD700" />
          ) : (
            <FaRegStar color="#FFD700" />
          )}
        </span>
      );
    }
    return stars;
  };



  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="p-4 rounded flex flex-col md:flex-row gap-4">
            <img className="w-36" src={pfp} alt="Profile" />
            <div className="w-screen">
              <h3 className="text-2xl font-semibold">{review.firstname} {review.lastname}</h3>
              <div className="flex justify-between gap-1 mb-2">
                <p>{formatDate(review.created_at)}</p>
                <p className="flex">{renderStars(review.num_stars)}</p>
              </div>
              <p>{review.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;
