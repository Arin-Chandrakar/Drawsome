"use client"

import { easeInOut, motion, scale, transform } from "motion/react"
import { useSpring } from "motion/react"
import { MorphingText } from "@/components/ui/morphing-text"
import { Highlighter } from "@/components/ui/highlighter"

export default function Home() {


  return(
      <div className="flex flex-col bg-gradient-to-b pb-20 from-blue-400 via-purple-200  min-h-screen min-w-screen to-transparent bg-[length:200%_200%] animate-gradient">
          <div className=" flex flex-col gap-4 justify-center items-center w-full h-60 mt-25 pt-20 sm:pt-10 sm:h-100 text-4xl sm:text-8xl font-inter font-bold">
            <span>Welcome to&nbsp;</span>
            <motion.span
            className="font-metal text-6xl sm:text-8xl sm:pt-3 decoration-wavy underline decoration-blue-600/80 underline-offset-9 will-change-transform"
            animate={{y:[0,-20,0]}}
            transition={{
              duration:3,
              repeat:Infinity,
              repeatType:"mirror",
              ease:"easeInOut",
            }}
            >Drawsome
            </motion.span>
            <span className="text-4xl mt-10 text-[#1f0322] sm:pr-65 pr-35">
              <MorphingText texts={["Think.", "Draw.","Share."]} />
            </span>
            <span className="sm:text-xl text-lg max-w-3xl text-center mt-5 text-[#1f0322] px-4">
              <p>
                A fast, lightweight whiteboard for teams, creators, and thinkers. Build diagrams, visualize systems, and communicate ideas with &nbsp; 
                <Highlighter action="underline" color="#FF9800">
                  simple tools 
                </Highlighter>
                &nbsp;
                that stay out of your way and &nbsp;
                <Highlighter action="highlight" color="#87CEFA">
                  let your creativity lead.
                </Highlighter>
                 
              </p>
            </span>
          </div> 
        <div className="flex w-full justify-center items-center pt-40">
          <div className="relative">
              <div className="relative overflow-hidden rounded-xl p-0.5">
                <motion.div className="absolute -inset-full bg-[conic-gradient(from_60deg,transparent,transparent,#FF1493,transparent,blue)] z-0"
                  animate={{rotate:360}}
                  transition={{
                  duration: 3,
                  ease: "linear",
                  repeat: Infinity
                  }}
                  >
                </motion.div>
                <div className=" flex relative rounded-xl bg-black w-75 sm:w-200">
                  <img src="/hanu.png" className="w-200 aspect-auto rounded-xl z-1" alt=""/>
                </div>
              </div> 
              <div className="absolute -left-16 -top-7 sm:-left-64 sm:-top-15 sm:translate-x-30 rotate-80 mix-blend-difference z=9" >
                <video src="/arrow4.mp4" autoPlay loop muted className="h-15 sm:h-30" ></video>
              </div>
          </div>
          
        </div>
      </div>
  );
}
