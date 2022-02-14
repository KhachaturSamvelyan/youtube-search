import { Outlet,  Navigate } from "react-router-dom";
import  {isLogin}  from "../Login/Login";



const PrivateRoute = () => {
    return isLogin ? <Outlet/> :  <Navigate to="/login" />;
};

export default PrivateRoute;