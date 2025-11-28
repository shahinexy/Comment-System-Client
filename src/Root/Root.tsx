import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div className="bg-white py-3">
        <Navbar />
      </div>
      <div className="max-w-3xl px-3 mx-auto my-6 text-black">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
