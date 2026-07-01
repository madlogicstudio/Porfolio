'use client'

import { useIsMobile } from "../hooks/useIsMobile"

export const Topnav = () => {

    const isMobile = useIsMobile();

    return (
        <div className={`
            ${isMobile? "w-full p-3" : "w-[120%] absolute top-0 left-[-100] p-4"}
            border-b border-zinc-400/30 flex flex-row items-center justify-start gap-3`}>
            
            <div className={`${isMobile? "w-full" : "ml-[100] flex-1 "}
                flex flex-row items-center justify-start gap-3`}>
        
                <span className="text-md cursor-pointer hovered">Madlogicstudio</span>
                <span className="text-md cursor-pointer hovered">Vask</span>
                <span className="text-md cursor-pointer hovered">Huenicorn</span>

            </div>

            {!isMobile && <div className="hidden md:flex flex-row items-center justify-start mr-[120] gap-3">

                <i title="Github" className="bxl bx-github text-3xl text-[var(--primary)] cursor-pointer" />
                <i title="Facebook" className="bxl bx-facebook-circle text-3xl text-[var(--primary)] cursor-pointer" />

            </div>}
            
        </div>
    )
}   
