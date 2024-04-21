import { Navigate, useLocation } from "react-router-dom";


// eslint-disable-next-line react/prop-types
function ProtectedWrapper({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
console.log(token)
  return token ? (
    <div>
        {children}
    </div>  
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default ProtectedWrapper;