import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center  justify-between px-16 py-12 shadow-md bg-white">
      <img
        src={assets.logo}
        alt="Logo"
        className="w-48 sm:w-36 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-3 border border-gray-400 rounded-full px-8 py-3 text-gray-800 hover:bg-gray-100 transition duration-200"
      >
        <span className="text-xl font-semibold">Login</span>
        <img src={assets.arrow_icon} alt="arrow" className="w-5" />
      </button>
    </header>
  );
};

export default Navbar;
