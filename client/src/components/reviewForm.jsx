import { useState, useContext } from "react";
import { useSupabase } from "../supabase/supabaseClient";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

// ReviewForm component for submitting reviews
const ReviewForm = ({ siteId, subject, onReviewSubmit }) => {
  // Get the Supabase client instance from the custom hook
  const { supabase } = useSupabase();
  // Access authentication context to get user information
  const { isLoggedIn, userId } = useContext(AuthContext);

  // Local state to manage form input values
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [numStars, setNumStars] = useState(1); // Default rating is 1 star
  const [comment, setComment] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the user is logged in before submitting
    if (!isLoggedIn) {
      alert("You must be logged in to submit a review.");
      return;
    }

    // Insert the review into the "reviews" table in Supabase
    const { data, error } = await supabase.from("reviews").insert([
      {
        site_id: siteId,
        user_id: userId,
        firstname,
        lastname,
        num_stars: numStars,
        comment,
        subject,
      },
    ]);

    // Handle potential errors or success
    if (error) {
      console.error("Error submitting review:", error);
    } else {
      onReviewSubmit(); // Notify parent component of successful submission
    }
  };

  // Handle star rating click
  const handleStarClick = (rating) => {
    setNumStars(rating); // Update the number of stars based on user selection
  };

  // Render star icons based on the current rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleStarClick(i)}
          style={{ cursor: "pointer", fontSize: "24px" }}
        >
          {i <= numStars ? (
            <FaStar color="#FFD700" /> // Full star
          ) : (
            <FaRegStar color="#FFD700" /> // Empty star
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="relative">
      {/* Show a warning message if the user is not logged in */}
      {!isLoggedIn && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-10">
          <p className="text-center text-lg font-semibold">Du skal være logget ind for at skrive en anmeldelse</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className={`space-y-4 ${!isLoggedIn ? "opacity-50" : ""}`}>
        {/* Form heading and star rating */}
        <div className="flex justify-between items-end mt-8">
          <p className="text-xl">Skriv en kommentar</p>
          <div className="flex gap-1">{renderStars()}</div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-16">
          {/* Input fields for firstname and lastname */}
          <div>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="border p-2 w-full rounded-lg"
              placeholder="Skriv dit fornavn"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="border p-2 w-full rounded-lg"
              placeholder="Skriv dit efternavn"
              required
            />
          </div>
        </div>

        {/* Textarea for comment */}
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 w-full resize-none rounded-lg"
            placeholder="Skriv din besked"
            required
            rows={4}
          />
        </div>
        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-[#119B1E] hover:bg-[#1A3636] text-white py-2 px-6"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
