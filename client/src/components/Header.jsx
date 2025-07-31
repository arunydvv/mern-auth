import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
    return (
      <>
        <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center px-6 bg-white">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
              Welcome to Our App
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Experience a new way to manage your tasks, time, and team!
            </p>

            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-md transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </>
    );
};

export default Header;
