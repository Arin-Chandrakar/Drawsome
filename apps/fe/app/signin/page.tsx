import { AuthPage } from "../../components/AuthPage";

export default function Signin(){
    return <>
    <div className="bg-linear-to-b  from-blue-400 via-purple-200  min-h-screen min-w-screen to-transparent bg-size-[200%_200%] animate-gradient">
        <AuthPage isSignIn={true}/>
    </div>
    
    </>
    
}