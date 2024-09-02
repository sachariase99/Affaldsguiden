import FooterBg from "../assets/FooterBg.png";
import GooglePlay from "../assets/GooglePlay.png";
import AppStore from "../assets/AppStore.png";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { AiOutlineFacebook } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="relative">
      <div
        style={{
          backgroundImage: `url(${FooterBg})`,
        }}
        className="bg-cover h-96 w-full text-white absolute bottom-0 -z-10"
      ></div>
      <div className="flex justify-between items-center px-24 py-8">
        <div>
          <h2 className="text-3xl font-bold">Affaldsguiden</h2>
          <p className="text-lg">Øster Uttrupvej 1A</p>
          <p className="text-lg">9000 Aalborg</p>
        </div>
        <div className="flex gap-8 h-2/3">
          <img src={GooglePlay} alt="Google Play" />
          <img src={AppStore} alt="App Store" />
        </div>
        <div className="flex gap-4 h-1/2 items-center">
          <FaInstagram className="hover:text-[#D6BD98] text-6xl"/>
          <CiLinkedin className="hover:text-[#D6BD98] text-6xl"/>
          <AiOutlineFacebook className="hover:text-[#D6BD98] text-6xl"/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
