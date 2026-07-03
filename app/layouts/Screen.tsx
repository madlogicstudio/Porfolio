'use client'

import { useIsMobile } from "../hooks/useIsMobile";
import { useEffect, useState, useRef } from "react"
import { ConveyorLoop } from "../components/Conveyor";
import useFetchIcons from "../services/FetchIcons";
import { addFolderIcon } from "../services/AddFolder";
import { addTextDocument } from "../services/AddText";
import { Bars } from "../components/Bars";

type ScreenProps = {
    start: boolean;
    isDark: boolean;
}

function Screen({start, isDark}: ScreenProps) {

    const isMobile = useIsMobile();
    const [loading, setLoading] = useState(true);
    const textArr = [
        "Initializing system . . .",
        "Loading interface . . .",
        "Initialization complete."
    ];
    const [loadingText, setLoadingText] = useState(textArr[0]);
    const screenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!start) return;

        let index = 0;

        const interval = setInterval(() => {
            index++;

            if (index < textArr.length) {
                setLoadingText(textArr[index]);
            } else {
                clearInterval(interval);
                setLoading(false);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [start]);

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const time = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const date = currentTime.toLocaleDateString();

    const [menu, setMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
    });

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!screenRef.current) return;

        setMenu(prev => ({
        ...prev,
        visible: false,
    }));

        const rect = screenRef.current.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        console.log(`Clicked at (${x}, ${y})`);
    };

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
            setMenu(prev => ({ ...prev, visible: false }));
        }, 1000);
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (!screenRef.current) return;

        const rect = screenRef.current.getBoundingClientRect();

        setMenu({
            visible: true,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const icons = useFetchIcons();

    const handleNewFolder = async () => {
        await addFolderIcon();

        setMenu(prev => ({
            ...prev,
            visible: false,
        }));
    };

    const handleNewText = async () => {
        await addTextDocument();

        setMenu(prev => ({
            ...prev,
            visible: false,
        }));
    };

    if(loading) return (
        <div className="flex flex-col items-center justify-center gap-3">
            
            <div className="h-auto w-[240px] flex flex-col items-center justify-between border border-zinc-400/30">
                <div className={`${isDark? "bg-[var(--primary)]" : "bg-[var(--secondary)]"}
                    h-auto w-full px-3 py-2 flex flex-row items-center justify-between`}>
                    <span className={`${isDark ? "text-[var(--light)] " : "text-[var(--dark)]"}`}>System</span>
                    <i title="Cancel" className={`${isDark ? "text-[var(--light)] " : "text-[var(--dark)]"} bx bx-x text-xl cursor-pointer`} onClick={() => location.reload()}/>
                </div>
                <div className="h-full w-full flex flex-col items-center justify-center gap-3 p-6">
                    <span>{loadingText}</span>
                    <Bars className="h-8 w-12 text-[var(--secondary)]/80" />
                    {/* <ConveyorLoop trackLength={14} /> */}
                </div>
            </div>

        </div>
    )

    if(!loading) return (
        <div className={`${isDark ? "text-[var(--light)]/40 " : "text-[var(--dark)]/40"}
            ${isMobile? "text-sm mb-12" : "text-sm mt-4 mb-14"}
            h-full w-full flex flex-col items-center justify-start relative`}>

            {refreshing && <div className={`${isDark ? "bg-[var(--accent)]" : "bg-[var(--light)]"}
                h-full w-full flex flex-col items-center justify-center`}>
                <Bars className={`${isDark ? "text-[var(--light)]/80" : "text-[var(--dark)]/80"}
                    h-8 w-12`} />
            </div>}

            <div ref={screenRef} onContextMenu={handleContextMenu} onClick={handleClick}
                className={`${isDark ? "bg-[var(--accent)] text-[var(--light)]/60" : "bg-[var(--light)] text-[var(--dark)]/60"}
                    flex-1 w-full cursor-default z-0 flex-wrap overflow-hidden
                    flex flex-col items-start justify-start`}>
                
                <div className={`${isMobile? "max-h-[70vh]" : "max-h-[76vh]"}
                     flex flex-col items-start justify-start gap-1 py-2 flex-wrap`}>
                    {icons.map((icon) => (
                        <div key={icon.id} className={`flex flex-col items-center justify-center max-w-20 min-w-20 gap-1 p-1 cursor-pointer`}>
                            <i className={`${icon.icon} ${isMobile? "text-2xl" : "text-3xl"}`} />
                            <span className="text-xs text-center">{icon.name}</span>
                        </div>
                    ))}
                </div>

                {menu.visible && (
                    <div
                        className="absolute bg-white border shadow-md text-black p-3 gap-3 flex flex-col items-start justify-start"
                        style={{
                            left: menu.x,
                            top: menu.y,
                        }}
                    >
                        <div className="w-full flex flex-row items-center justify-start gap-2" onClick={handleRefresh}><i className="bx bx-rotate-cw" />Refresh</div>
                        <div className="w-full flex flex-row items-center justify-start gap-2" onClick={handleNewFolder}><i className="bx bx-folder" />New Folder</div>
                        <div className="w-full flex flex-row items-center justify-start gap-2" onClick={handleNewText}><i className="bx bx-file"/>Text Document</div>
                    </div>
                )}
            </div>

            <div className={`text-[var(--dark)]/80 bg-[var(--primary)] h-auto w-full p-2 flex flex-row items-center justify-between cursor-default z-1`}>
                <i title="Start" className="bxl bx-microsoft text-3xl cursor-pointer"/>
                <div className="flex flex-col items-end justify-center pr-1">
                    <span className="font-semibold text-xs">{time}</span>
                    <span className="font-semibold text-xs">{date}</span>
                </div>
            </div>
            
        </div>
    )
}

export default Screen
