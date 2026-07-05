'use client'

import { Topnav } from "../components/Topnav"
import React, { useState, useEffect } from "react";
import { WanderingEyes } from "../components/WanderingEyes";
import { useIsMobile } from "../hooks/useIsMobile";
import { Portfolio } from "../pages/Portfolio";
import Screen from "./Screen";


type ContentProps = {
    isDark: boolean;
    idle: boolean;
    setIdle: React.Dispatch<React.SetStateAction<boolean>>
    start: boolean;
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
    bio: boolean;
}

function Content({isDark, idle, setIdle, start, setStart, bio}: ContentProps) {

    
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
 

            <div className="flex-1 w-full overflow-hidden">

                {idle && !bio && <div className="h-full w-full flex flex-col items-center justify-center gap-3">

                        <WanderingEyes className="h-16 w-[180px]" />
                        <span className={`${isMobile? "text-sm" : "text-md"}`}>{idleText}</span>
                        <span className={`${isMobile? "text-sm" : "text-md"}`}>{`{ Open the terminal and type help }`}</span>
                    
                </div>}

                {start && !idle && !bio && 
                    
                    <Screen isDark={isDark} start={start} setStart={setStart}/>

                }

                {bio && !idle &&
                    <Portfolio isDark={isDark} bio={bio}/>
                }                

            </div>
            
        </div>
    )
}

export default Content