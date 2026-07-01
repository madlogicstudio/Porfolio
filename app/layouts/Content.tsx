'use client'

import { Topnav } from "../components/Topnav"
import { useState, useEffect } from "react";
import { WanderingEyes } from "../components/WanderingEyes";
import { useIsMobile } from "../hooks/useIsMobile";

type ContentProps = {
    isDark: boolean;
}

function Content({isDark}: ContentProps) {

    const [idle, setIdle] = useState(true);
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
        <div className={`${isDark ? "text-[var(--light)]/40" : "text-[var(--dark)]/40"}
            h-screen max-w-[1080px] w-full flex flex-col items-center justify-start border-x border-zinc-400/30
            transition-colors absolute background-transparent top-0`}>
            
            <div className="w-full p-5">
                <span>&nbsp;</span>
            </div>
            
            <div className={`${isMobile? "" : "p-5"}
                w-full flex flex-row items-center justify-between relative`}>
                <div className="w-full flex flex-row items-center justify-start">
                    <Topnav />
                </div>
                
                {!isMobile && <i className="bx bx-plus text-2xl absolute bottom-[-35] left-[-12] text-zinc-400/30" />}
            </div>
            
            <div className="w-full p-5">
                <span>&nbsp;</span>
            </div>

            <div className="h-[600px] w-[96%] flex flex-col items-center justify-center border border-zinc-400/30 gap-3">

                {idle && <WanderingEyes className="h-16 w-[180px]" />}
                {idle && <span className="text-md">{idleText}</span>}

            </div>
            
        </div>
    )
}

export default Content