// import { createContext, useState } from "react";
// import { PropTypes } from "prop-types";
// import useAxiosPublic from "../Hooks/useAxiosPublic";

// export const authContext = createContext();


// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isRefetch, setRefetch] = useState(true);
//   const axiosPublic = useAxiosPublic();



//   // refetch
//   const refetch = () => {
//     setRefetch(!isRefetch);
//   };




//   const authInfo = {
//     user,
//     setUser,
//     loader,
//     refetch,
//   };
//   return (
//     <div>
//       <authContext.Provider value={authInfo}>{children}</authContext.Provider>
//     </div>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };

// export default AuthProvider;