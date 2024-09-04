import useRecycles from "../hooks/useRecycle";
import Map from "../components/map";
import { Link } from "react-router-dom";
import RatingStars from "../components/RatingStars";

const Recycle = () => {
  // Fetch recycling data from the custom hook
  const { recycles, loading, error } = useRecycles(true);

  // Show loading state while fetching data
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

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-16 p-16">
      {recycles.map((recycle) => {
        // Correcting latitude and longitude names
        const correctedLatitude = recycle.longitude; // Consider renaming to 'latitude' if needed
        const correctedLongitude = recycle.latitude; // Consider renaming to 'longitude' if needed

        return (
          <Link key={recycle.id} to={`/recycle/${recycle.id}`}>
            <div>
              {/* Map component displaying the location */}
              <div className="h-48 bg-gray-200 shadow">
                <Map latitude={correctedLatitude} longitude={correctedLongitude} />
              </div>
              {/* Card displaying recycling center information */}
              <div className="bg-white p-8 rounded-b-lg shadow">
                <div className="pb-8 border-b border-black">
                  <h2 className="font-semibold text-2xl">{recycle.name}</h2>
                  <p>
                    {recycle.address}, {recycle.zipcode} {recycle.city}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  {/* Rating stars component */}
                  <RatingStars rating={recycle.average_rating || 0} />
                  <p>{recycle.reviews_count || 0} Anmeldelser</p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default Recycle;
