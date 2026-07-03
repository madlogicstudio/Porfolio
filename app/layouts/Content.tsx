'use client'

import { Topnav } from "../components/Topnav"
import React, { useState, useEffect } from "react";
import { WanderingEyes } from "../components/WanderingEyes";
import { useIsMobile } from "../hooks/useIsMobile";
import Profile from "../../public/Profile.png"
import Screen from "./Screen";

type ContentProps = {
    isDark: boolean;
    idle: boolean;
    setIdle: React.Dispatch<React.SetStateAction<boolean>>
    start: boolean;
    bio: boolean;
    stack: boolean;
}

function Content({isDark, idle, setIdle, start, bio, stack}: ContentProps) {

    
    const isMobile = useIsMobile();

    const textArr = [
        "[ Thanks for stopping by ]",
        "[ I hope you find something you like ]",
        "[ Enjoy exploring ]",
        "[ Take your time ]",
        "[ Every detail has a purpose ]",
        "[ Thanks for being here ]",
        "[ Made with intention ]",
        "[ Built one piece at a time ]",
        "[ Always learning ]",
        "[ Take your time ]",
        "[ There's no rush ]",
        "[ Stay for a while ]"
    ];
    const [idleText, setIdleText] = useState(textArr[0]);

    useEffect(() => {
        if (!idle) return;

        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % textArr.length;
            setIdleText(textArr[index]);
        }, 6000);

        return () => clearInterval(interval);
    }, [idle]);

    return (
        <div className={`${isDark ? "text-[var(--light)]/40 " : "text-[var(--dark)]/40"}
            ${isMobile? "text-sm" : "text-md"}
            h-screen max-w-[1080px] w-full flex flex-col items-center justify-start border-x border-zinc-400/30
            transition-colors absolute top-0 background-transparent`}>
            
            <div className="w-full p-5">
                <span>&nbsp;</span>
            </div>
            
            <div className={`${isMobile? "" : "p-5"}
                w-full flex flex-row items-center justify-between relative`}>
                <div className="w-full flex flex-row items-center justify-start">
                    <Topnav />
                </div>
                
                {!isMobile && <i className="bx bx-plus text-2xl absolute bottom-[-26] left-[-12] text-zinc-400/60" />}
            </div>
 

            <div className="h-full w-full flex flex-col items-center justify-center">

                {idle && !bio && <div className="h-[460px] w-full flex flex-col items-center justify-center gap-3">
                    <WanderingEyes className="h-16 w-[180px]" />
                    <span className={`${isMobile? "text-sm" : "text-md"}`}>{idleText}</span>
                    <span className={`${isMobile? "text-sm" : "text-md"}`}>{`{ Open the terminal to start }`}</span>
                </div>}

                {start && !idle && !bio && !stack && 

                    <Screen isDark={isDark} start={start}/>

                }

                {bio && !idle && !stack &&
                    <div className={`${isMobile? "items-start justify-center" : "h-[460px] items-center justify-center"}
                        w-full flex flex-col gap-3 p-3 flex-wrap`}>
                        
                        <img src={Profile.src} className={`${isMobile? "h-24 w-24" : "h-32 w-32"} rounded-full`} alt="" />

                        <span className={`${isMobile? "" : "text-center"} font-bold`}>Hello, I'm Julius Mallorca Capispisan, <br /> Self-taught Designer and Entry-level React Developer.</span>
                        <span className={`${isMobile? "" : "text-center"}`}>
                            I have hands on experience building responsive web and mobile applications using <br /> React, React Native, JavaScript, and TypeScript.  
                            <br /><br />Passionate about creating intuitive user experiences, solving technical challenges, <br /> and continuously expanding technical skills 
                            through personal projects and learning opportunities.
                        </span>
                        
                        <span className="">Excited to collaborate with you on intriguing projects — reach out at</span>
                        <span className="underline"> jutscapispisan@gmail.com</span>

                    </div>
                }

                {stack && !bio && !idle &&
                    <div className={`${isMobile? "items-start justify-start" : "h-auto items-center justify-center"}
                        w-full flex flex-col gap-3 p-3 flex-wrap overflow-y-auto hide-scrollbar`}>
                        
                        <span className={`${isMobile? "text-md" : "text-lg"}
                            font-bold py-3`}>Here is the current stack I am using in 2026</span>

                        <div className="flex flex-col items-start justify-start gap-3">  

                            <div className="flex flex-row items-center gap-3">
                                <i title="Next.js" className="bxl bx-next-js text-[calc(0.5vw+1.5rem)] text-[var(--primary)] cursor-pointer" />
                                <a href="https://nextjs.org/" className="cursor-pointer underline">Next.js</a>
                                <span> - Full-stack framework</span>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <i title="Tailwind CSS" className="bxl bx-tailwind-css text-[calc(0.5vw+1.5rem)] text-[var(--primary)] cursor-pointer" />
                                <a href="https://tailwindcss.com/" className="cursor-pointer underline">Tailwind CSS</a>
                                <span> - Styling system</span>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <i title="Shadcn" className="bxl bx-shadcn-ui text-[calc(0.5vw+1.5rem)] text-[var(--primary)] cursor-pointer" />
                                <a href="https://ui.shadcn.com/" className="cursor-pointer underline">Shadcn/ui</a>
                                <span> - UI components</span>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <i title="Boxicons" className="bxl bx-boxicons text-[calc(0.5vw+1.5rem)] text-[var(--primary)] cursor-pointer" />
                                <a href="https://boxicons.com/" className="cursor-pointer underline">Boxicons</a>
                                <span> - Icon set</span>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <i title="Geist Font" className="bxf bx-quote-left text-[calc(0.5vw+1.5rem)] text-[var(--primary)] cursor-pointer" />
                                <a href="https://vercel.com/font" className="cursor-pointer underline">Geist Sans</a>
                                <span> - Typography</span>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <i title="Vercel" className="bxl bx-vercel text-[calc(0.5vw+1.5rem)] text-[var(--primary)] cursor-pointer" />
                                <a href="https://vercel.com" className="cursor-pointer underline">Vercel</a>
                                <span> - Hosting and deployment</span>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <i title="Firebase" className="bxl bx-firebase text-[calc(0.5vw+1.5rem)] text-[var(--primary)] cursor-pointer" />
                                <a href="https://firebase.google.com/" className="cursor-pointer underline">Firebase</a>
                                <span> - Backend-as-a-Service (BaaS)</span>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <i title="Firebase Auth" className="bxf bx-lock-keyhole text-[calc(0.5vw+1.5rem)] text-[var(--primary)] cursor-pointer" />
                                <a href="https://firebase.google.com/" className="cursor-pointer underline">Firebase Auth</a>
                                <span> - User authentication</span>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <i title="Cloud Firestore" className="bxf bx-database text-[calc(0.5vw+1.5rem)] text-[var(--primary)] cursor-pointer" />
                                <a href="https://firebase.google.com/docs/firestore" className="cursor-pointer underline">Cloud Firestore</a>
                                <span> - NoSQL database</span>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <i title="Git" className="bxl bx-git text-[calc(0.5vw+1.5rem)] text-[var(--primary)] cursor-pointer" />
                                <a href="https://git-scm.com/" className="cursor-pointer underline">Git</a>
                                <span> - Version control</span>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <i title="Github" className="bxl bx-github text-[calc(0.5vw+1.5rem)] text-[var(--primary)] cursor-pointer" />
                                <a href="https://github.com/" className="cursor-pointer underline">Github</a>
                                <span> - Code hosting and collaboration</span>
                            </div>

                        </div>

                    </div>
                }


            </div>
            
        </div>
    )
}

export default Content