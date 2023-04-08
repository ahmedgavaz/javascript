import { Navigate, Outlet, useLocation } from "react-router";
import { User } from "../services/auth";

interface PrivateOutletProps{
    user:User|null;
}

function NavigateToLogin(){
    const location=useLocation();
    return <Navigate to ="/login" state={{locationFrom:location.pathname}}/>
}

export function PrivateOutlet({user}:PrivateOutletProps){
    return user ? <Outlet/>:<NavigateToLogin/>;
}