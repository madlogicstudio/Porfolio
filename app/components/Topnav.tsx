'use client'

import { useIsMobile } from "../hooks/useIsMobile"

export const Topnav = () => {

    const isMobile = useIsMobile();

    return (
        <div className={`
            ${isMobile? "w-full p-3" : "w-[120%] absolute top-0 left-[-100] p-3"}
            border-b border-zinc-400/30 flex flex-row items-center justify-start gap-3`}>
            
            <div className={`${isMobile? "w-full text-sm" : "ml-[100] flex-1 text-md"}
                flex flex-row items-center justify-start gap-3`}>

                <a href="https://madlogicstudio.github.io/madlogicstudio/" className="flex items-center justify-center cursor-pointer hovered">Madlogicstudio</a>
                <a href="https://vask-madlogicstudio.vercel.app/" className="flex items-center justify-center cursor-pointer hovered">Vask</a>
                <a href="https://huenicorn-madlogicstudio.vercel.app/" className="flex items-center justify-center cursor-pointer hovered">Huenicorn</a>

            </div>

            {!isMobile && <div className="hidden md:flex flex-row items-center justify-start mr-[120] gap-3">

                <a href="https://github.com/madlogicstudio?tab=repositories" className="flex items-center justify-center">
                    <i title="Github" className="bxl bx-github text-3xl text-[var(--primary)] cursor-pointer"/>
                </a>
                <a href="https://web.facebook.com/Juls.Caps" className="flex items-center justify-center">
                    <i title="Facebook" className="bxl bx-facebook-circle text-3xl text-[var(--primary)] cursor-pointer" />
                </a>

            </div>}
            
        </div>
    )
}   
