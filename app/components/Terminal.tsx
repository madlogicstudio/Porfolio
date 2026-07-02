'use client'

import { useIsMobile } from "../hooks/useIsMobile"
import { useState, useRef, useEffect } from "react"

type TerminalProps = {
    isDark: boolean;
    lines: string[];
    setLines: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Terminal = ({isDark, lines, setLines}: TerminalProps) => {

    const isMobile = useIsMobile();
    const [command, setCommand] = useState("");
    const [minimize, setMinimize] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && command.trim()) {
            setLines(prev => [...prev, `> ${command}`]);
            setCommand("");
        }
    };

    const submitCommand = () => {
        if (!command.trim()) return;

        setLines(prev => [...prev, `> ${command}`]);
        setCommand("");
    };

    useEffect(() => {
        terminalRef.current?.scrollTo({
            top: terminalRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [lines]);

    return (
        <div className={`${isDark ? "text-[var(--light)]/40" : "text-[var(--dark)]/40"}
            ${isMobile? "" : " max-w-[68%]"}
            h-auto w-full flex flex-col items-center justify-end absolute bottom-0 z-20 border-t border-zinc-400/30
            transition-colors background-transparent`}>

            <div className={`${minimize? "" : ""}
                max-w-[1080px] w-full h-full relative
                flex flex-col items-start justify-start z-10`}>
                {!isMobile && <i className="bx bx-plus text-2xl absolute top-[-12] right-[-11] text-zinc-400/60" />}

                <div className={`${isMobile? "text-sm" : "text-md"}
                    w-full flex flex-row items-center justify-between border-b border-zinc-400/30 p-3`}>
                    <span className="flex items-center justify-center cursor-pointer hovered">Terminal</span>
                    <div className="flex flex-row items-center gap-3">   
                        <i title="Minimize" className="bx bx-minus text-2xl text-[var(--primary)] cursor-pointer"
                            onClick={() => setMinimize((prev) => !prev)} />
                        <i title="New Terminal" className="bx bx-terminal text-3xl text-[var(--primary)] cursor-pointer"/>
                    </div>   
                </div>

                {!minimize && <div className={`${isMobile? "text-sm" : "text-md"}
                    flex flex-col items-start justify-end flex-1 w-full`}>

                    <div ref={terminalRef} className="w-full flex flex-col items-start justify-start overflow-y-auto 
                        py-3 max-h-[180px] min-h-[180px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {lines.map((line, index) => (
                            <p key={index} className="px-3 py-2">{line}</p>
                        ))}
                    </div>

                    {!isMobile && <div className="w-full flex flex-row items-center justify-between relative border-t border-zinc-400/30">
                        <input value={command} onKeyDown={handleKeyDown} onChange={(e) => setCommand(e.target.value)} 
                            type="text" placeholder=". . ." className="w-full outline-none p-3" />
                        <i className="bx bx-chevron-right-square text-3xl text-[var(--primary)] cursor-pointer p-3" 
                            onClick={submitCommand}/>
                    </div>}
                    {isMobile && <div className="w-full flex flex-row items-center justify-between relative border-t border-zinc-400/30">
                        <input value={command} onKeyDown={handleKeyDown} onChange={(e) => setCommand(e.target.value)} 
                            type="text" placeholder=". . ." className="w-full outline-none p-3" />
                        <i title="Enter" className="bx bx-chevron-right-square text-3xl text-[var(--primary)] cursor-pointer p-3" 
                            onClick={submitCommand}/>
                    </div>}
                </div>}

            </div>

        </div>
    )
}
