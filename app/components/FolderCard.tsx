'use client'

import { useIsMobile } from "../hooks/useIsMobile"

type FolderCardProps = {
    isDark: boolean;
    folderName: string;
    arrow: React.ReactNode;
}

export const FolderCard = ({isDark, arrow, folderName}: FolderCardProps) => {

    const isMobile = useIsMobile();

    return (
        <div className={`${isDark? "bg-[var(--dark)]" : "bg-[var(--secondary)]"}
            ${isMobile? "w-[180px] text-xs p-3" : "text-sm w-[240px]"}
            h-auto flex flex-col items-end justify-start gap-3 p-3 relative shadow-xl`}>
            
            <span className={`${isDark? "bg-[var(--dark)]" : "bg-[var(--secondary)]"}
                absolute top-[-24] left-0 py-1 px-3 rounded-tr-lg font-semibold`}>
                {folderName}
            </span>

            <div className={`${isMobile? "mt-6" : "mt-21"}
                h-full w-full flex flex-col items-end justify-end`}>
                {arrow}
            </div>
            
        </div>
    )
}
