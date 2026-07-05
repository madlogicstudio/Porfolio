'use client'

import { useIsMobile } from "../hooks/useIsMobile";
import { useEffect, useState, useRef } from "react"
import { addFolderIcon } from "../services/AddFolder";
import { addTextDocument } from "../services/AddText";
import { Bars } from "../components/Bars";
import { motion } from "motion/react";
import useFetchIcons, { DesktopIcon } from "../services/FetchIcons";
import useFetchDeletedIcons from "../services/FetchDeletedIcons";
import { saveTextDocument } from "../services/SaveText";
import { saveTextTitle } from "../services/SaveTextTitle";
import { MoveToRecycleBin } from "../services/MoveToRecycleBin";

type ScreenProps = {
    start: boolean;
    isDark: boolean;
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
}

function Screen({start, isDark, setStart}: ScreenProps) {

    const isMobile = useIsMobile();
    const [loading, setLoading] = useState(true);
    const textArr = [
        "Initializing system . . .",
        "Loading interface . . .",
        "Initialization complete."
    ];
    const [loadingText, setLoadingText] = useState(textArr[0]);
    const screenRef = useRef<HTMLDivElement>(null);
    const deletedIcons = useFetchDeletedIcons();

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

    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [openedIcon, setOpenedIcon] = useState<DesktopIcon | null>(null);

    const lastTap = useRef({
        id: "",
        time: 0,
    });

    const handleMobileDoubleTap = (icon: DesktopIcon) => {
        const now = Date.now();

        if (
            lastTap.current.id === icon.id &&
            now - lastTap.current.time < 300
        ) {
            setOpenedIcon(icon);
            setText(icon.content ?? "");
            setTextTitle(icon.name);
        } else {
            setSelectedIcon(icon.id);

            lastTap.current = {
                id: icon.id,
                time: now,
            };
        }
    };

    const [activeText, setActiveText] = useState(false);
    const [text, setText] = useState("");
    const [textTitle, setTextTitle] = useState("");
    const [editTextTitle, setEditTextTitle] = useState(false);
    const spanRef = useRef<HTMLSpanElement>(null);

    const saveText = async (icon: DesktopIcon) => {
        await saveTextDocument(icon.id, text)
    }

    const saveTitle = async (icon: DesktopIcon) => {
        await saveTextTitle(icon.id, textTitle)
    }

    if(loading) return (
        <div className="h-full flex flex-col items-center justify-center gap-3">
            
            <div className="h-auto w-[240px] flex flex-col items-center justify-between border border-zinc-400/30">
                <div className={`${isDark? "bg-[var(--primary)] text-[var(--light)]/60" : "bg-[var(--secondary)] text-[var(--dark)]/40"}
                    h-auto w-full px-3 py-2 flex flex-row items-center justify-between`}>
                    <span className={``}>System</span>
                    <i title="Cancel" className={` bx bx-x text-xl cursor-pointer`} onClick={() => location.reload()}/>
                </div>
                <div className="h-full w-full flex flex-col items-center justify-center gap-3 p-6">
                    <span>{loadingText}</span>
                    <Bars className="h-8 w-12" />
                </div>
            </div>

        </div>
    )

    if(!loading) return (
        <div className={`${isDark ? "text-[var(--light)]/40 " : "text-[var(--dark)]/40"}
            ${isMobile? "text-sm" : "text-sm mt-4"}
            h-full w-full flex flex-col items-center justify-start relative`}>

            {refreshing && <div className={`${isDark ? "bg-[var(--accent)]" : "bg-[var(--light)]"}
                h-full w-full flex flex-col items-center justify-center`}>
                <Bars className={`${isDark ? "text-[var(--light)]/80" : "text-[var(--dark)]/80"}
                    h-8 w-12`} />
            </div>}

            {!refreshing && <div ref={screenRef} onContextMenu={handleContextMenu} 
                onClick={(e) => {
                    handleClick(e);
                    setSelectedIcon(null);
                    setOpenedIcon(null);
                }}
                className={`${isDark ? "bg-[var(--accent)] text-[var(--light)]/60" : "bg-[var(--light)] text-[var(--dark)]/60"}
                    ${isMobile? "mb-12" : "mb-18"}
                    h-full w-full cursor-default z-0 flex-wrap overflow-hidden 
                    flex flex-col items-start justify-start relative`}>
                
                    <div className={`${isMobile? "max-h-[70vh]" : "max-h-[76vh]"}
                        flex flex-col items-start justify-start gap-1 py-2 flex-wrap`}>
                        
                        {icons.map((icon) => (
                            <div key={icon.id}
                                className={` ${selectedIcon === icon.id ? "border border-zinc-400/30" : ""}
                                flex flex-col items-center justify-center max-w-20 min-w-20 gap-1 p-1 cursor-pointer`}
                                onClick={(e) => {
                                    e.stopPropagation();

                                    if (!isMobile) {
                                        setSelectedIcon(icon.id);
                                    }
                                }}
                                onDoubleClick={() => {
                                    if(!isMobile && icon.icon === "bxf bx-file"){
                                        setOpenedIcon(icon);
                                        setText(icon.content ?? "");
                                        setTextTitle(icon.name);
                                    }
                                    else if(!isMobile && icon.icon === "bxf bx-trash-alt"){
                                        setOpenedIcon(icon);
                                    }
                                    else{
                                        setOpenedIcon(icon);
                                    }
                                }}
                                onTouchEnd={(e) => {
                                    e.stopPropagation();
                                    handleMobileDoubleTap(icon);
                                }}>
                            
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
                        <div className="w-full flex flex-row items-center justify-start gap-2" onClick={handleNewText}><i className="bx bx-file"/>Text Document</div>
                    </div>
                )}
                <div className={`text-[var(--dark)]/60 bg-[var(--primary)] h-auto w-full p-2 flex flex-row items-center justify-between cursor-default absolute bottom-0`}>
                    <div className="flex flex-row items-end justify-center gap-2">
                        <i title="Power off" className="bx bx-power text-2xl cursor-pointer" onClick={() => location.reload()}/>
                        <span>{`Leave me a message in a text file.`}</span>
                    </div>
                    <div className="flex flex-col items-end justify-center pr-1">
                        <span className="font-semibold text-xs">{time}</span>
                        <span className="font-semibold text-xs">{date}</span>
                    </div>
                </div>
            </div>}

            {openedIcon && openedIcon.icon === "bxf bx-file" && <div className={`bg-[rgba(0,0,0,0.3)] h-screen w-full absolute top-0 left-0 z-30 flex flex-col items-center justify-start p-3`}>

                <motion.div drag dragConstraints={{ left: 0, right: 200, top: 0, bottom: 200}}>
                    <div className={`${isMobile? "h-[340px] w-[340px]" : "h-[600px] w-[600px]"}
                        flex flex-col items-center justify-start bg-[var(--secondary)] shadow-xl cursor-grab`}>

                        <div className={`text-[var(--light)]/80 w-full bg-[var(--primary)] p-3 flex flex-row items-center justify-between`}>
                            <div className="flex items-center gap-2">
                                <i className={`${openedIcon.icon} text-xl`} />
                                <div className="flex flex-row items-center gap-2">
                                    {!editTextTitle && <span>{openedIcon.name}</span>}
                                    {editTextTitle && 
                                        <div className="relative">
                                            <span
                                                ref={spanRef}
                                                className="absolute invisible whitespace-pre">
                                                {textTitle || " "}
                                            </span>

                                            <input type="text" value={textTitle} onChange={(e) => setTextTitle(e.target.value)}
                                                style={{
                                                    width: spanRef.current
                                                        ? `${spanRef.current.offsetWidth + 5}px`
                                                        : "120px",
                                                }}
                                                className="outline-none" 
                                            />
                                        </div>
                                    }
                                    {activeText? <i className={`bxf bx-radio-circle text-sm`} />  : ""}
                                </div>                         
                            </div>
                            <div className="flex items-center gap-2">
                                {editTextTitle? 
                                    <i title="Save Title" className={` bx bx-check text-xl cursor-pointer`} 
                                        onClick={async () => {
                                            if (!openedIcon) return;

                                            await saveTitle(openedIcon);

                                            setOpenedIcon({
                                                ...openedIcon,
                                                name: textTitle,
                                            });

                                            setEditTextTitle(false);
                                            setActiveText(false);
                                        }}/>
                                    :
                                    <i title="Edit Title" className={` bx bx-edit text-xl cursor-pointer`} 
                                        onClick={() => {
                                            setEditTextTitle(true);
                                            setActiveText(true);
                                    }}/>
                                }
                                
                                <i title="Save" className={` bx bx-save text-xl cursor-pointer`} 
                                    onClick={async () => {
                                        if (openedIcon) {
                                            saveText(openedIcon);
                                            setActiveText(false);
                                        }
                                    }}
                                />
                                <i title="Delete" className={` bx bx-trash-alt text-xl cursor-pointer`} 
                                    onClick={async () => {
                                        if (!openedIcon) return;

                                        await MoveToRecycleBin(openedIcon.id);
                                        setOpenedIcon(null);
                                    }}/>
                                <i title="Close" className={` bx bx-x text-xl cursor-pointer`} 
                                    onClick={() => {
                                        setOpenedIcon(null);
                                        setActiveText(false);
                                        setEditTextTitle(false);
                                }}/>
                            </div>
                        </div>

                        <div className="h-full w-full text-[var(--dark)]/40 p-3">
                            <textarea value={text} onChange={(e) => {
                                const value = e.target.value;
                                setText(value);
                                setActiveText(true);
                                if(value.trim().length <= 0){
                                    setActiveText(false);
                                } 
                            }} 
                            className="h-full w-full resize-none outline-none bg-transparent overflow-y-auto hide-scrollbar" />
                        </div>

                    </div>
                </motion.div>

            </div>}

            {openedIcon && openedIcon.icon === "bxf bx-trash-alt" && <div className={`bg-[rgba(0,0,0,0.3)] h-screen w-full absolute top-0 left-0 z-30 flex flex-col items-center justify-start p-3`}>

                <motion.div drag dragConstraints={{ left: 0, right: 200, top: 0, bottom: 200}}>
                    <div className={`${isMobile? "h-[340px] w-[340px]" : "h-[600px] w-[600px]"}
                        flex flex-col items-center justify-start bg-[var(--secondary)] shadow-xl cursor-grab`}>
                            
                        <div className={`text-[var(--light)]/80 w-full bg-[var(--primary)] p-3 flex flex-row items-center justify-between`}>
                            <div className="flex items-center gap-2">
                                <i className={`${openedIcon.icon} text-xl`} />
                                <div className="flex flex-row items-center gap-2">
                                    {!editTextTitle && <span>{openedIcon.name}</span>}
                                    {editTextTitle && 
                                        <div className="relative">
                                            <span
                                                ref={spanRef}
                                                className="absolute invisible whitespace-pre">
                                                {textTitle || " "}
                                            </span>

                                            <input type="text" value={textTitle} onChange={(e) => setTextTitle(e.target.value)}
                                                style={{
                                                    width: spanRef.current
                                                        ? `${spanRef.current.offsetWidth + 5}px`
                                                        : "120px",
                                                }}
                                                className="outline-none" 
                                            />
                                        </div>
                                    }
                                    {activeText? <i className={`bxf bx-radio-circle text-sm`} />  : ""}
                                </div>                         
                            </div>
                            <div className="flex items-center gap-2">
                                <i title="Empty Bin" className={` bx bx-trash-x text-xl cursor-pointer`} 
                                    onClick={() => {
                                        setOpenedIcon(null);
                                        setActiveText(false);
                                        setEditTextTitle(false);
                                }}/>
                                <i title="Restore All" className={` bx bx-rotate-cw text-xl cursor-pointer`} 
                                    onClick={() => {
                                        setOpenedIcon(null);
                                        setActiveText(false);
                                        setEditTextTitle(false);
                                }}/>
                                <i title="Close" className={` bx bx-x text-xl cursor-pointer`} 
                                    onClick={() => {
                                        setOpenedIcon(null);
                                        setActiveText(false);
                                        setEditTextTitle(false);
                                }}/>
                            </div>
                        </div>

                        <div className="h-full w-full text-[var(--dark)]/40 p-3 cursor-default">
                            {deletedIcons.map((icon) => (
                                <div key={icon.id} className="w-full flex flex-row items-center justify-between p-3 border-b border-zinc-400/40">
                                    <div className="flex flex-row items-center gap-2">
                                        <i className={`${icon.icon} text-xl cursor-pointer`} />
                                        <span>{icon.name}</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <i title="Restore" className={`bx bx-rotate-square-cw text-xl cursor-pointer`} />
                                        <i title="Delete" className={`bx bx-trash text-xl cursor-pointer`} />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </motion.div>

            </div>}
        </div>
    )
}

export default Screen
