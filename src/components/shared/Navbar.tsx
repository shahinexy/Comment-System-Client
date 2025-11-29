import { AuthContext } from "@/AuthProvider/AuthContext";
import { useContext } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user, logoutUser } = context;

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  return (
    <div className="max-w-3xl px-3 mx-auto flex justify-between items-center md:gap-5 gap-2 text-black">
      <Link to={"/"} className="md:text-2xl text-lg font-bold text-primary">
        CoTy
      </Link>

      {user ? (
        <div className="flex items-center gap-2">
          <p>{user?.fullName}</p>
          {user?.image ? (
            <img
              src={user.image}
              alt={user.fullName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-medium">
              {user?.fullName?.[0].toUpperCase()}
            </div>
          )}

          <button
            onClick={handleLogout}
            className="md:px-4 px-3 py-1.5 text-base md:text-m  rounded-lg bg-primary text-white hover:bg-secondary transition"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="md:px-4 px-3 py-1.5 text-base md:text-m  rounded-lg bg-primary text-white hover:bg-secondary transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="md:px-4 px-3 py-1.5 text-base md:text-m  rounded-lg bg-primary text-white hover:bg-secondary transition"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
