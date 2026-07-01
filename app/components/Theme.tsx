'use client'

import { useState } from "react";

type ThemeProps = {
    lightIcon: string;
    darkIcon: string;
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Theme = ({darkIcon, lightIcon, isDark, setIsDark}: ThemeProps) => {

    const [isActive, setIsActive] = useState("light");
    
    return (
        <div className={`${isDark ? "text-[var(--light)]" : "bg-[var(--secondary)]"}
            flex flex-row items-center justify-center py-2 gap-3`}>

            <i title="Light Theme" className={`${lightIcon} text-xl rounded-full cursor-pointer text-[var(--primary)]`}
                onClick={() => setIsDark(false)}/>
            <i title="Dark Theme" className={`${darkIcon} text-xl rounded-full cursor-pointer text-[var(--primary)]`}
                onClick={() => setIsDark(true)}/>

        </div>
    )
}
