import { Navigate, useLocation } from "react-router-dom";


// eslint-disable-next-line react/prop-types
function UnprotectedWrapper({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
console.log(token)
  return token ? (
     <Navigate to="/" replace state={{ path: location.pathname }} />
  ) : (
    <div>
        {children}
    </div> 
  );
}

export default UnprotectedWrapper;