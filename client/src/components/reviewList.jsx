import { useContext, useEffect, useState } from "react";
import { useSupabase } from "../supabase/supabaseClient";
import { FaStar, FaRegStar } from "react-icons/fa";
import pfp from "../assets/pfp.png";
import { AuthContext } from "../context/authContext";

const ReviewList = ({ siteId }) => {
  const { supabase } = useSupabase();
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null); // To hold the review being edited
  const [editComment, setEditComment] = useState("");
  const [editStars, setEditStars] = useState(0);
  const { isLoggedIn, userId } = useContext(AuthContext);

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

  // Function to delete a review
  const deleteReview = async (reviewId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this review?");
    if (isConfirmed) {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);

      if (error) {
        console.error("Error deleting review:", error);
      } else {
        setReviews(reviews.filter((review) => review.id !== reviewId));
      }
    }
  };

  // Function to handle edit modal open
  const openEditModal = (review) => {
    setEditingReview(review);
    setEditComment(review.comment);
    setEditStars(review.num_stars);
  };

  // Function to handle edit modal close
  const closeEditModal = () => {
    setEditingReview(null);
    setEditComment("");
    setEditStars(0);
  };

  // Function to update the review
  const updateReview = async () => {
    const { error } = await supabase
      .from("reviews")
      .update({ comment: editComment, num_stars: editStars })
      .eq("id", editingReview.id);

    if (error) {
      console.error("Error updating review:", error);
    } else {
      setReviews(reviews.map((review) =>
        review.id === editingReview.id
          ? { ...review, comment: editComment, num_stars: editStars }
          : review
      ));
      closeEditModal();
    }
  };

  // Function to render stars
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

  // Function to render stars for editing
  const renderEditableStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => setEditStars(i)}
        >
          {i <= editStars ? (
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
          <div
            key={review.id}
            className="p-4 rounded flex flex-col md:flex-row gap-4"
          >
            <img className="w-36" src={pfp} alt="Profile" />
            <div className="w-screen">
              <h3 className="text-2xl font-semibold">
                {review.firstname} {review.lastname}
              </h3>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col md:flex-row gap-1 mb-2">
                  <p>{formatDate(review.created_at)}</p>
                  <p className="flex">{renderStars(review.num_stars)}</p>
                </div>
                {isLoggedIn && review.user_id === userId && (
                  <div className="flex gap-2 mb-3 md:mb-0">
                    <p
                      className="cursor-pointer text-blue-500"
                      onClick={() => openEditModal(review)}
                    >
                      Edit
                    </p>
                    <p
                      className="cursor-pointer text-red-500"
                      onClick={() => deleteReview(review.id)}
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
              <p>{review.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Review</h2>
            <div className="mb-4">
              <div className="flex justify-between items-center">
              <label className="block text-gray-700">Comment</label>
              <div className="flex mt-2">{renderEditableStars()}</div>
              </div>
              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2 resize-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={updateReview}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
