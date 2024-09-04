import { useState, useContext } from "react";
import { useSupabase } from "../supabase/supabaseClient";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const ReviewForm = ({ siteId, subject, onReviewSubmit }) => {
  const { supabase } = useSupabase();
  const { isLoggedIn, userId } = useContext(AuthContext); // Access authentication state

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [numStars, setNumStars] = useState(1);
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLoggedIn) {
      alert("You must be logged in to submit a review.");
      return;
    }

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

    if (error) {
      console.error("Error submitting review:", error);
    } else {
      console.log("Review submitted successfully:", data);
      onReviewSubmit(); // Notify parent component of new review
    }
  };

  const handleStarClick = (rating) => {
    setNumStars(rating);
  };

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
    <div className="relative">
      {!isLoggedIn && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-10">
          <p className="text-center text-lg font-semibold">Du skal være logget ind for at skrive en anmeldelse</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className={`space-y-4 ${!isLoggedIn ? "opacity-50" : ""}`}>
        <div className="flex justify-between items-end mt-8">
          <p className="text-xl">Skriv en kommentar</p>
          <div className="flex gap-1">{renderStars()}</div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
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
