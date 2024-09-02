import FooterBg from "../assets/FooterBg.png";
import GooglePlay from "../assets/GooglePlay.png";
import AppStore from "../assets/AppStore.png";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { AiOutlineFacebook } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="relative">
      <div
        style={{
          backgroundImage: `url(${FooterBg})`,
        }}
        className="bg-cover h-96 w-full absolute bottom-0 z-0"
      ></div>
      <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center px-24 py-8">
        <div>
          <h2 className="text-3xl font-bold">Affaldsguiden</h2>
          <p className="text-lg">Øster Uttrupvej 1A</p>
          <p className="text-lg">9000 Aalborg</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 my-4 lg:my-0 lg:gap-8 h-2/3">
          <img src={GooglePlay} alt="Google Play" className="cursor-pointer max-w-[150px]" />
          <img src={AppStore} alt="App Store" className="cursor-pointer max-w-[150px]" />
        </div>
        <div className="flex gap-4 h-1/2">
          <FaInstagram className="hover:text-[#D6BD98] text-6xl cursor-pointer"/>
          <CiLinkedin className="hover:text-[#D6BD98] text-6xl cursor-pointer"/>
          <AiOutlineFacebook className="hover:text-[#D6BD98] text-6xl cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
