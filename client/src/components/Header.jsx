import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-[75vh] overflow-hidden flex items-center justify-center px-6 bg-white">
      <div className="text-center max-w-5xl">

        <h1 className="scroll-m-20 text-center text-7xl p-2 font-extrabold tracking-tight text-balance">
          Welcome to Our App
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Experience a new way to manage your tasks, time, and team efficiently.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-full shadow-lg transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Header;
