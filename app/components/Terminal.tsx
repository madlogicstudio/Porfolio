'use client'

import { useIsMobile } from "../hooks/useIsMobile"
import { useState, useRef, useEffect } from "react"
import { Blink } from "./Blink"
import { useRouter } from 'next/navigation';

type TerminalProps = {
    isDark: boolean;
    lines: string[];
    setLines: React.Dispatch<React.SetStateAction<string[]>>;
    setIdle: React.Dispatch<React.SetStateAction<boolean>>;
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
    setBio: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Terminal = ({isDark, lines, setLines, setIdle, setStart, setBio}: TerminalProps) => {

    const isMobile = useIsMobile();
    const router = useRouter();
    const [command, setCommand] = useState("");
    const [minimize, setMinimize] = useState(true);
    const terminalRef = useRef<HTMLDivElement>(null);
    const [blink, setBlink] = useState(true);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && command.trim()) {
            submitCommand();
        }
    };

    const submitCommand = () => {
        if (!command.trim()) return;

        let output: string[] = [];

        switch (command.toLowerCase()) {
            case "help":
                output = [
                    "Available commands:",
                    "--start",
                    "--portfolio",
                    "--quit",
                ];
                break;

            case "--start":
                setStart(true);
                setIdle(false);
                setBio(false);
                output = [
                    "Device started . . .",
                ];
                break;
            
            case "--portfolio": 
                setIdle(false);
                setBio(true);
                setStart(false);
                output = [
                    "Showing current portfolio . . .",
                ];
                break;

            case "--quit":
                router.back();
                break;

            default:
                setIdle(true);
                setBio(false);
                setStart(false);
                output = [`Unknown command, type 'help' to see available commands.`];
        }

        setLines(prev => [
            ...prev,
            `> ${command}`,
            ...output,
        ]);

        setCommand("");
    };

    useEffect(() => {
        terminalRef.current?.scrollTo({
            top: terminalRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [lines]);

    return (
        <div className={`
            ${isMobile? "" : " min-w-[68%]"}
            h-auto w-full flex flex-col items-center justify-end absolute bottom-0 z-20 border-t border-zinc-400/30
            transition-colors background-transparent`}>

            <div className={`${minimize? "" : ""}
                max-w-[1080px] w-full h-full relative border-x border-zinc-400/30
                flex flex-col items-start justify-end z-10`}>
                {!isMobile && <i className="bx bx-plus text-2xl absolute top-[-12] right-[-11] text-zinc-400/60" />}

                <div className={`${isMobile? "text-sm" : "text-md"}
                    ${isDark ? "text-[var(--light)]/40 bg-[var(--dark)]" : "text-[var(--dark)]/40 bg-[var(--secondary)]"}
                    w-full flex flex-row items-center justify-between border-b border-zinc-400/30 p-3`}>
                    <span className="flex items-center justify-center cursor-pointer hovered">Terminal</span>
                    <div className="flex flex-row items-center gap-3">   
                        {!isMobile && <i title="Minimize/Maximize" className="bx bx-minus text-2xl text-[var(--primary)] cursor-pointer"
                            onClick={() => setMinimize((prev) => !prev)} />}
                        {isMobile && <i title="Minimize/Maximize" className="bx bx-minus text-xl text-[var(--primary)] cursor-pointer"
                            onClick={() => setMinimize((prev) => !prev)} />}
                        {!isMobile && <i title="New Terminal" className="bx bx-terminal text-3xl text-[var(--primary)] cursor-pointer"/>}
                        {isMobile && <i title="New Terminal" className="bx bx-terminal text-2xl text-[var(--primary)] cursor-pointer"/>}
                    </div>   
                </div>

                {!minimize && <div className={`${isMobile? "text-sm" : "text-md"}
                    ${isDark ? "text-[var(--light)]/40 bg-[var(--accent)]" : "text-[var(--dark)]/40 bg-[var(--light)]"}
                    flex flex-col items-start justify-end flex-1 w-full`}>

                    <div ref={terminalRef} className="w-full flex flex-col items-start justify-start overflow-y-auto 
                        py-2 max-h-[160px] min-h-[160px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {lines.map((line, index) => (
                            <p key={index} className="px-3">{line}</p>
                        ))}
                    </div>

                    {!isMobile && <div className="w-full flex flex-row items-center justify-between relative border-t border-zinc-400/30">
                        <input value={command} onKeyDown={handleKeyDown} onChange={(e) => setCommand(e.target.value)} onFocus={() => setBlink(false)} onBlur={() => setBlink(true)}
                            type="text" placeholder="" className="w-full pl-7 outline-none p-3" />
                        {blink && <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Blink prompt=">" />
                        </div>}
                        {!blink && <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <span>{`>`}</span>
                        </div>}

                        <i className="bx bx-chevron-right-square text-3xl text-[var(--primary)] cursor-pointer p-3" 
                            onClick={submitCommand}/>
                    </div>}

                    {isMobile && <div className="w-full flex flex-row items-center justify-between relative border-t border-zinc-400/30">
                        <input value={command} onKeyDown={handleKeyDown} onChange={(e) => setCommand(e.target.value)} onFocus={() => setBlink(false)} onBlur={() => setBlink(true)}
                            type="text" placeholder="" className="w-full pl-7 outline-none p-3" />
                        {blink && <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Blink prompt=">" />
                        </div>}
                        {!blink && <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <span>{`>`}</span>
                        </div>}
                        
                        <i title="Enter" className="bx bx-chevron-right-square text-2xl text-[var(--primary)] cursor-pointer p-3" 
                            onClick={submitCommand}/>
                    </div>}
                </div>}

            </div>

        </div>
    )
}
