import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import logo from '../assets/logo.png'


const Header = () => {
  return (
    <div className="flex items-center justify-between mx-24 py-4">
      <Link to="/"><img src={logo} alt="Logo" /></Link>
      <Link className="bg-[#D8EADB] hover:bg-[#D6BD98] rounded-xl px-8 py-2 flex items-center gap-2 text-xl" to="/login">Login <IoMdLogIn /></Link>
    </div>
  )
}

export default Header
