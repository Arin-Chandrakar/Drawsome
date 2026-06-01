"use client"

import { easeInOut, motion } from "motion/react"
import { useSpring } from "motion/react"

export default function Home() {


  return(
      <div className=" flex flex-col bg-gradient-to-b from-blue-400 via-purple-200 to-transparent h-screen w-screen bg-[length:200%_200%] animate-gradient">
        <div className=" flex justify-center items-center w-full h-60 sm:h-100 text-2xl sm:text-8xl font-inter font-bold">
          <span>Welcome to&nbsp;</span>
          <motion.span
           className="font-metal text-3xl pt-1 sm:text-8xl sm:pt-3 decoration-wavy underline decoration-blue-600/80 underline-offset-9 will-change-transform"
           animate={{y:[0,-20,0]}}
           transition={{
            duration:3,
            repeat:Infinity,
            repeatType:"mirror",
            ease:"easeInOut",
           }}
           >Drawsome</motion.span>
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="relative overflow-hidden rounded-xl p-0.5">
            <motion.div className="absolute -inset-full bg-[conic-gradient(from_60deg,transparent,transparent,#FF1493,transparent,blue)] z-0"
               animate={{rotate:360}}
               transition={{
               duration: 3,
               ease: "linear",
               repeat: Infinity
               }}>
            </motion.div>
            <div className="relative rounded-xl bg-black w-80">
              <img src="/hanu.png" className="w-200 aspect-auto rounded-xl z-1" alt=""/>
            </div>
          </div> 
        </div>
      </div>
  );
}
