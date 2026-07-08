'use client'

import React, { useState } from "react";
import { Theme } from "../components/Theme";
import Icon from "../../public/Logo.png"
import { useIsMobile } from "../hooks/useIsMobile";

type HeaderProps = {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({isDark, setIsDark}: HeaderProps) => {
    
    const isMobile = useIsMobile();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${isDark ? "text-[var(--light)]/40" : "text-[var(--dark)]/40"}
            h-auto w-full flex flex-row items-center justify-center p-2 sticky top-0 z-40 border-b border-zinc-400/30
            transition-colors background-transparent`}>

            {!isMobile && <div className="max-w-[1080px] w-full flex flex-row items-center justify-between gap-3 px-3">

                <div className="flex-1 flex flex-row items-center justify-start gap-4">
                    <img title="Logo" src={Icon.src} className="h-8 w-8 m-[0.3em] cursor-pointer" alt="Icon" onClick={() => location.reload()} />
                    <span title="2026 Portfolio" className={`text-md cursor-pointer`}>2026 Portfolio</span>
                    <div className="flex flex-row items-center justify-center gap-3">
                        <a href="https://drive.google.com/file/d/1HsT8f7ss_VAka1DO1gDhHCrng4XIO4vd/view?usp=sharing"
                        className="flex items-center justify-center">
                            <i title="Downlaod Resume" className="bx bx-folder text-2xl text-[var(--primary)] cursor-pointer" />
                        </a>       
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jutscapispisan@gmail.com" 
                        className="flex items-center justify-center">
                            <i title="Email" className="bx bx-envelope text-2xl text-[var(--primary)] cursor-pointer" />
                        </a>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center gap-4">
                    <Theme 
                        lightIcon="bx bx-sun" 
                        darkIcon="bx bx-moon"
                        isDark={isDark} 
                        setIsDark={setIsDark}
                    />
                    <i title="Socials" className="bx bx-arrow-out-up-right-stroke-square text-2xl text-[var(--primary)] cursor-pointer" />
                    <i title="Print Screen" className="bx bx-copy text-2xl text-[var(--primary)] cursor-pointer" />
                    <i title="Redirect" className="bx bx-minus text-2xl text-[var(--primary)] cursor-pointer" />
                    <i title="Close Portfolio" className="bx bx-x text-2xl text-[var(--primary)] cursor-pointer" />
                </div>

            </div>}

            {isMobile && <div className="max-w-[1080px] w-full flex flex-row items-center justify-between gap-3 py-1 px-1">

                <div className="flex-1 flex flex-row items-center justify-start gap-3">
                    <i title="Menu" className="bx bx-menu text-xl text-[var(--primary)] cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}/>
                    <img title="Logo" src={Icon.src} className="h-7 w-7 cursor-pointer" alt="Icon" onClick={() => location.reload()}/>
                    <span title="2026 Portfolio" className={`text-sm cursor-pointer`}>2026 Portfolio</span>
                    
                </div>

                <div className="flex flex-row items-center justify-center gap-3">
                    <i title="Print Screen" className="bx bx-copy text-xl text-[var(--primary)] cursor-pointer" />
                    <i title="Redirect" className="bx bx-minus text-xl text-[var(--primary)] cursor-pointer" />
                    <i title="Close Portfolio" className="bx bx-x text-xl text-[var(--primary)] cursor-pointer" />
                </div>

            </div>}

            {isOpen && <div className={`
                ${isDark ? 
                    "text-[var(--light)]/40 bg-linear-to-b from-[var(--dark)] to-[var(--accent)]" 
                    : 
                    "text-[var(--dark)]/40 bg-linear-to-b from-[var(--secondary)] to-[var(--light)]"
                }
                fixed top-0 left-0 z-50 h-screen w-full 
                border-r border-zinc-400/30 transition-transform duration-1000 ease-in-out
                flex flex-col items-start justify-start 
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                
                <div className="flex flex-row items-center justify-end w-full px-3 py-4 border-b border-zinc-400/30">           
                    <i title="Close Menu" className="bx bx-x text-xl text-[var(--primary)] cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}/>
                </div>

                <div className="flex flex-row items-center justify-start w-full border-b border-zinc-400/30 px-3 py-2 gap-3">
                    <Theme 
                        lightIcon="bx bx-sun" 
                        darkIcon="bx bx-moon"
                        isDark={isDark} 
                        setIsDark={setIsDark}
                    />
                </div>
                
                <div className="flex flex-row items-center justify-start w-full border-b border-zinc-400/30 px-3 py-4 gap-3">
                    <span className={`text-sm cursor-pointer`}>2026 Portfolio</span>
                </div>

                <div className="flex flex-row items-center justify-start w-full border-b border-zinc-400/30 px-3 py-4 gap-3">
                    <div className="flex flex-row items-center gap-3">
                        <a href="https://drive.google.com/file/d/1HsT8f7ss_VAka1DO1gDhHCrng4XIO4vd/view?usp=sharing"
                        className="flex items-center justify-center">
                            <i title="Downlaod Resume" className="bx bx-folder text-xl text-[var(--primary)] cursor-pointer" />
                        </a>       
                        <span className={`text-sm cursor-pointer`}>Downlaod Resume </span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between w-full border-b border-zinc-400/30 px-3 py-4">
                    <div className="flex flex-row items-center gap-3">
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jutscapispisan@gmail.com" 
                        className="flex items-center justify-center">
                            <i title="Email" className="bx bx-envelope text-xl text-[var(--primary)] cursor-pointer" />
                        </a>
                        <span className={`text-sm cursor-pointer`}>Email </span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between w-full border-b border-zinc-400/30 px-3 py-4">
                    <div className="flex flex-row items-center gap-3">
                        <i title="Socials" className="bx bx-arrow-out-up-right-stroke-square text-xl text-[var(--primary)] cursor-pointer" />
                        <span className={`text-sm cursor-pointer`}>Redirect </span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between w-full border-b border-zinc-400/30 px-3 py-4">
                    <a href="https://web.facebook.com/Juls.Caps" className="flex flex-row items-center gap-3">
                        <i title="Facebook" className="bxl bx-facebook-circle text-2xl text-[var(--primary)] cursor-pointer" />
                        <span className={`text-sm cursor-pointer`}>Facebook </span>
                    </a>
                </div>

                <div className="flex flex-row items-center justify-between w-full border-b border-zinc-400/30 px-3 py-4">
                    <a href="https://github.com/madlogicstudio?tab=repositories" className="flex flex-row items-center gap-3">
                        <i title="Github" className="bxl bx-github text-2xl text-[var(--primary)] cursor-pointer" />
                        <span className={`text-sm cursor-pointer`}>Github </span>
                    </a>
                </div>

            </div>}

            
        </div>
    )
}
