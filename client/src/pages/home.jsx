import HomeHeaderCards from "../components/homeHeaderCards";
import HomeMiddleCard from "../components/homeMiddleCard";
import HomeBottomCard from "../components/homeBottomCard";

const Home = () => {
  return (
    <div className="">
      {/* This component displays a series of header cards */}
      <HomeHeaderCards />
      
      {/* This component displays the middle section card */}
      <HomeMiddleCard />
      
      {/* This component displays the bottom section card */}
      <HomeBottomCard />
    </div>
  );
};

export default Home;
