import { Navigate, Outlet, useLocation } from "react-router";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { UserInfo } from "../services/user-info-storage";

interface OutletProps{
    user:UserInfo|null;
}

function NavigateToLogin(){
    const location = useLocation();
    return <Navigate to ="/login" state={{locationFrom:location.pathname}}/>
}

export function PrivateOutlet(){
    const user = useCurrentUser()
    return user ? <Outlet/> : <NavigateToLogin/>;
}


function NavigateToHome(){
    const location=useLocation();
    return <Navigate to ="/" state={{locationFrom:location.pathname}}/>
}

export function PublicOutlet(){
    const user = useCurrentUser()
    return !user ? <Outlet/> : <NavigateToHome/>;
}