import useRecycles from "../hooks/useRecycle";
import Map from "../components/map";
import { Link } from "react-router-dom";

const Recycle = () => {
  const { recycles, loading, error } = useRecycles(true);

  if (loading)
    return (
      <div className="w-full h-screen relative">
        <p className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          Loading...
        </p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-16 p-16">
      {recycles.map((recycle) => (
        <Link key={recycle.id} to={`/recycle/${recycle.id}`}>
          <div>
            <div className="h-48 bg-gray-200 shadow">
              {/* Map Component with Latitude and Longitude */}
              <Map latitude={recycle.longitude} longitude={recycle.latitude} />
            </div>
            <div className="bg-white p-8 rounded-b-lg shadow">
              <div className="pb-8 border-b border-black">
                <h2 className="font-semibold text-2xl">{recycle.name}</h2>
                <p>
                  {recycle.address}, {recycle.zipcode} {recycle.city}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};
export default Recycle;
