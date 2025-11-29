import { Focus } from "lucide-react";


const Loader = () => {
    return (
    <div className="md:py-10 py-5 flex justify-center items-center">
      <div className="animate-spin text-primary">
        <Focus size={38}/>
      </div>
    </div>
    );
};

export default Loader;