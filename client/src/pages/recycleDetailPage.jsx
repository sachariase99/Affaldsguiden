import { useParams } from "react-router-dom";
import ReviewForm from "../components/reviewForm";
import ReviewList from "../components/reviewList";
import Map from "../components/map";
import useRecycles from "../hooks/useRecycle";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RecycleDetailPage = () => {
  const { id } = useParams(); // Get the recycle ID from the URL
  const { isLoggedIn, userId } = useContext(AuthContext); // Access authentication context
  const [refreshKey, setRefreshKey] = useState(0); // State for handling review submission
  const { recycles, loading, error } = useRecycles(true); // Fetch recycling data

  // Show loading state while data is being fetched
  if (loading)
    return (
      <div className="w-full h-screen relative">
        <p className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          Loading...
        </p>
      </div>
    );

  // Display an error message if there's an issue fetching data
  if (error) return <p>Error: {error}</p>;

  // Find the specific recycling center based on the ID
  const recycle = recycles.find((recycle) => recycle.id === parseInt(id));

  // Display a message if the recycling center is not found
  if (!recycle) return <p>Recycling center not found.</p>;

  // Corrected latitude and longitude based on your data naming
  const correctedLatitude = recycle.longitude;
  const correctedLongitude = recycle.latitude;

  // Handle review submission and refresh the page
  const handleReviewSubmit = () => {
    setTimeout(() => {
      window.location.reload(); // Refresh the page to show the new review
    }, 1000);
  };

  return (
    <section className="bg-white">
      {/* Map Component */}
      <div className="h-96">
        <Map latitude={correctedLatitude} longitude={correctedLongitude} />
      </div>
      
      {/* Recycling Center Details */}
      <div className="p-8 rounded-b-lg">
        <h1 className="text-4xl font-semibold mb-4">{recycle.name}</h1>
        <p>{recycle.address}</p>
        <p>
          {recycle.zipcode} {recycle.city}
        </p>
        <p className="flex items-center gap-2">
          <CiMail />
          {recycle.email}
        </p>
        <p className="flex items-center gap-2">
          <FiPhone />
          {recycle.phone}
        </p>
      </div>
      
      {/* Review Form and List */}
      <div className="mx-8 py-8">
        <div>
          <h2 className="text-[#119B1E] text-3xl">Kommentarer</h2>
          <ReviewForm
            siteId={recycle.id}
            userId={userId}
            subject={recycle.name}
            onReviewSubmit={handleReviewSubmit}
          />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <ReviewList siteId={recycle.id} />
        </div>
      </div>
    </section>
  );
};

export default RecycleDetailPage;
