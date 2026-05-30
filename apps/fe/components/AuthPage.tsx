"use client"

export function AuthPage({isSignIn}:{
    isSignIn:boolean
}){
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 m-2 bg-white rounded">
            <input type="text" placeholder="Email" name="" id="" />
            <input type="text" placeholder="Password" name="" id="" />
            <button onClick={()=>{

            }}>{isSignIn ?"Sign in" :"Sign Up"}</button>
        </div>
    </div>
}