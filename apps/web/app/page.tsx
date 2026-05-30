"use client"

import { useState } from "react";
import styles from "./page.module.css"
import { useRouter } from "next/navigation.js";

export default function Home(){

  const [roomId,setRoomId] = useState("");
  const router = useRouter();

  return(
    <div className="flex justify-center items-center w-100vh h-screen ">
      <div>
        <input type="text" className="bg-white rounded-2xl text-amber-900" placeholder="slug" value={roomId} onChange={(e)=>{
         setRoomId(e.target.value);
        }}/>
        <button onClick={()=>{
          router.push(`/room/${roomId}`);
        }}>Join room</button>
      </div>
      
    </div>
  );
}