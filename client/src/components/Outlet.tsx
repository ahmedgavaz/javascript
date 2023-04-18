import { Navigate, Outlet, useLocation } from "react-router";
import { UserInfo } from "../services/auth";

interface OutletProps{
    user:UserInfo|null;
}

function NavigateToLogin(){
    const location=useLocation();
    return <Navigate to ="/login" state={{locationFrom:location.pathname}}/>
}

export function PrivateOutlet({user}:OutletProps){
    return user ? <Outlet/> : <NavigateToLogin/>;
}


function NavigateToHome(){
    const location=useLocation();
    return <Navigate to ="/" state={{locationFrom:location.pathname}}/>
}

export function PublicOutlet({user}:OutletProps){
    return !user ? <Outlet/> : <NavigateToHome/>;
}