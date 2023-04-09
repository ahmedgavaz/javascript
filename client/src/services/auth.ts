export interface User{
    username:string;
}

type AuthHandler = (user: User | null) =>void;

class AuthService{
    private handler:AuthHandler | null=null;

    setHandler(andler:AuthHandler | null){
        this.handler=this.handler;
    }

    login(user:User){
        this.handler?.(user);
        window.localStorage.setItem("username",user.username);
    }

    logout(){
        this.handler?.(null);
        window.localStorage.removeItem("username");
    }
    
    getSavedUser(){
        const savedUsername = window.localStorage.getItem("username");
        return savedUsername ? {username:savedUsername} :null;
    }

    isAuthenticated(): boolean {
        const user = localStorage.getItem("user");
        return !!user;
      }
}

export const authService = new AuthService();