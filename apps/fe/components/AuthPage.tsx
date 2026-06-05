"use client"

import { Highlighter } from "@/components/ui/highlighter"
import axios from "axios";
import { useState } from "react"


export function AuthPage({isSignIn}:{
    isSignIn:boolean
}){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");

    async function handleAuth(){
        try{
        const endpoint = isSignIn ? "signin" : "signup";

        const response = await axios.post(
            `http://localhost:3003/${endpoint}`,
            {
                username,password,
            }
        );
        
        console.log(response.data);

        if(response.data.token){
            localStorage.setItem("token",response.data.token)
        }
    }catch(error){
        console.log(error);
    }
}

    return <div className="w-screen h-screen flex justify-center items-center p-2">
        {/* <div className="p-2 m-2 bg-white rounded">
            <input type="text" placeholder="Email" name="" id="" />
            <input type="text" placeholder="Password" name="" id="" />
            <button onClick={()=>{

            }}>{isSignIn ?"Sign in" :"Sign Up"}</button>
        </div> */}
        <div className="bg-linear-30 from-blue-400 to-pink-400 hover:shadow-2xl transition-shadow duration-300 p-5 w-md rounded-2xl">
            <div className="font-metal text-4xl font-bold text-center pb-8">
                <Highlighter action="underline" color="black">Drawsome</Highlighter>
            </div>
            <div className="flex flex-col gap-4">
                {!isSignIn && (
                    <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} className="border-black border p-2 rounded-2xl text-center font-inter font-bold "/>
                )}
                <input type="text" placeholder="email" value={username} onChange={(e)=>setUsername(e.target.value)} className="border-black border p-2 rounded-2xl text-center font-inter font-bold "/>
                <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="border-black border p-2 rounded-2xl text-center font-inter font-bold"/>
            </div>
            <div className="flex justify-center">
                <button onClick={handleAuth} className=" border border-black mt-4 p-2 px-4 font-inter font-extrabold rounded-2xl hover:shadow-2xl hover:shadow-red-700 transition-shadow duration-300">
                    {isSignIn ? "Sign in" : "Sign up"}
                </button>
            </div>
        </div>
    </div>
}