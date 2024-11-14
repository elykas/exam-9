import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { fetchUserByTokenDefense, logout } from "../store/features/authSlice/authSlice";



interface ProtectedRouteProps {
    children: React.ReactElement;
  }

const ProtectedRouteDefense: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { token ,user,status} = useSelector((state: RootState) => state.auth);

    useEffect(() => {
         if (token && status === 'idle' && !user ) {
      dispatch(fetchUserByTokenDefense());
    }
  }, [dispatch,token,user]);
      

    if (status === "pending") {
        return <p>Loading...</p>;
      }

      if (!token) {
        dispatch(logout())
        return <Navigate to="/" replace />;
      }
      return children 
}

export default ProtectedRouteDefense;