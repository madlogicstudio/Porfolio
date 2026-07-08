'use client'

import { useIsMobile } from "../hooks/useIsMobile"
import Profile from "../../public/Profile.png"
import Light from "../../public/Portfolio_light.png"
import Dark from "../../public/Portfolio_dark.png"
import { useEffect, useState } from "react"
import { Bars } from "../components/Bars";
import { FolderCard } from "../components/FolderCard"
import { motion } from "motion/react"

type PortfolioProps = {
    isDark: boolean;
    bio: boolean;
}

export const Portfolio = ({isDark, bio}: PortfolioProps) => {

    const isMobile = useIsMobile();
    const [loading, setLoading] = useState(true);
    const textArr = [
        "Initializing . . .",
        "Loading portfolio . . .",
        "Portfolio ready."
    ];
    const [loadingText, setLoadingText] = useState(textArr[0]);
    const [openAbout, setOpenAbout] = useState(false);
    const [openStack, setOpenStack] = useState(false);
    const [openContact, setOpenContact] = useState(false);

    useEffect(() => {
            if (!bio) return;
    
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
        }, [bio]);

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

    return (
        <div className={`${isDark? "bg-[var(--accent)]" : "bg-[var(--light)]"}
            ${isMobile? "items-center justify-start text-sm gap-24" : "items-center justify-start mt-4 text-md gap-42"}
            h-full w-full flex flex-col p-3 pb-16 overflow-y-auto hide-scrollbar relative`}>
            
            <div className={`${isMobile? "flex-col items-center" : "flex-row items-center"}
                w-full flex gap-3 relative`}>
                <div className={`${isDark? "bg-[var(--dark)]" : "bg-[var(--secondary)]"}
                    ${isMobile? "w-full text-sm p-3" : "text-md h-auto w-full"}
                    flex flex-col items-center gap-3`}>
                    {isDark? 
                        <img src={Dark.src} className={`${isMobile? " w-[280px]" : " w-[400px]"} scale-125`} alt="" />
                        :
                        <img src={Light.src} className={`${isMobile? " w-[280px]" : " w-[400px]"} scale-125`} alt="" />
                    }
                </div>
                <div className={`${isMobile? "bottom-[-110]" : "bottom-[-160]"}
                    flex flex-col items-center absolute w-full h-full`}>
                    
                    <div className={`${isDark? "bg-[var(--accent)]" : "bg-[var(--secondary)]"}
                        ${isMobile? "w-[180px] text-sm p-3" : "text-md p-6 h-[240px] w-[240px]"}
                        flex flex-col items-center gap-3 absolute bottom-[-12] shadow-xl z-20 border border-zinc-400/10`}>
                        <div className="w-full px-6 flex flex-col items-center justify-center">
                            {!isMobile && <img src={Profile.src} className="h-32 w-32 rounded-full" alt="" />}
                            {isMobile && <img src={Profile.src} className="h-24 w-24 rounded-full" alt="" />}
                        </div>
                        <div className="flex flex-col items-center w-full gap-1">
                            {!isMobile && <span className="font-bold text-lg">Julius Capispisan</span>}
                            {isMobile && <span className="font-bold text-md">Julius Capispisan</span>}
                            <span className="">React Developer</span>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className={`${isMobile? "flex-row items-start mb-12 mt-24 gap-2" : "flex-row items-start mb-12 mt-16 gap-3"}
                w-full flex relative`}>

                <FolderCard isDark={isDark} arrow={<>
                        {!isMobile && <i className="bx bx-arrow-down-right text-2xl text-[color:var(--primary)] cursor-pointer" onClick={() => setOpenAbout((prev) => !prev)}/>}
                        {isMobile && <i className="bx bx-arrow-down-right text-xl text-[color:var(--primary)] cursor-pointer" onClick={() => setOpenAbout((prev) => !prev)}/>}
                    </>}
                    folderName="About"/>
                <FolderCard isDark={isDark} arrow={<>
                        {!isMobile && <i className="bx bx-arrow-down-right text-2xl text-[color:var(--primary)] cursor-pointer" onClick={() => setOpenStack((prev) => !prev)}/>}
                        {isMobile && <i className="bx bx-arrow-down-right text-xl text-[color:var(--primary)] cursor-pointer" onClick={() => setOpenStack((prev) => !prev)}/>}
                    </>}
                    folderName="Stacks"/>
                <FolderCard isDark={isDark} arrow={<>
                    {!isMobile && <i className="bx bx-arrow-down-right text-2xl text-[color:var(--primary)] cursor-pointer" onClick={() => setOpenContact((prev) => !prev)}/>}
                    {isMobile && <i className="bx bx-arrow-down-right text-xl text-[color:var(--primary)] cursor-pointer" onClick={() => setOpenContact((prev) => !prev)}/>}
                </>}
                folderName="Contact"/>
                
            </div>

            {openAbout && <div className={`bg-[rgba(0,0,0,0.3)] h-screen w-full absolute top-0 left-0 z-30 flex flex-col items-center justify-start p-3`}>

                <motion.div drag dragConstraints={{ left: 0, right: 200, top: 0, bottom: 200}}>
                    <div className={`${isMobile? "h-auto w-[340px]" : "h-auto w-[600px]"}
                        flex flex-col items-center justify-start bg-[var(--secondary)] shadow-xl`}>

                        <div className={`text-[var(--light)]/80 w-full bg-[var(--primary)] p-3 flex flex-row items-center justify-between`}>
                            <span className="">About</span>
                            <i title="Cancel" className={` bx bx-x text-xl cursor-pointer`} onClick={() => setOpenAbout((prev) => !prev)}/>
                        </div>

                        <div className="h-full w-full flex flex-col items-center justify-center p-6 gap-3 text-[var(--dark)]/60">
                            <div className="w-full flex flex-row items-end justify-start gap-2 mb-3">
                                <span className="text-2xl font-bold">WHO</span>
                                <span>am i?</span>
                            </div>
                            <span className="">
                                <span className="text-2xl">Hello! </span> I’m <span className="font-bold">Julius Capispisan</span>, a <span className="text-[var(--primary)]">React Developer</span>. I enjoy turning ideas into clean, responsive, and user-friendly web experiences.
                            </span>
                            <span>
                                My journey into development began with a curiosity about how websites work, which gradually grew into a passion for building them. 
                                Through personal projects and continuous learning, I've gained hands-on experience with React, Next.js, React Native, JavaScript, TypeScript, Tailwind CSS, and Firebase.
                            </span>
                            <span>
                                I enjoy creating interfaces that are both functional and visually appealing, with a focus on writing clean, maintainable code and delivering a smooth user experience. 
                                Every project is an opportunity to improve my skills, experiment with new technologies, and solve real-world problems.
                            </span>
                            <span>
                                I'm currently seeking opportunities where I can contribute, grow as a developer, and collaborate with people who are passionate about building meaningful digital products.
                            </span>
                        </div>
 
                    </div>
                </motion.div>
            </div>}

            {openStack && <div className={`bg-[rgba(0,0,0,0.3)] h-screen w-full absolute top-0 left-0 z-30 flex flex-col items-center justify-start p-3`}>

                <motion.div drag dragConstraints={{ left: 0, right: 200, top: 0, bottom: 200}}>
                    <div className={`${isMobile? "h-auto w-[340px]" : "h-auto w-[600px]"}
                        flex flex-col items-center justify-start bg-[var(--secondary)] shadow-xl`}>

                        <div className={`text-[var(--light)]/80 w-full bg-[var(--primary)] p-3 flex flex-row items-center justify-between`}>
                            <span className="">Stack</span>
                            <i title="Cancel" className={` bx bx-x text-xl cursor-pointer`} onClick={() => setOpenStack((prev) => !prev)}/>
                        </div>

                        <div className="h-full w-full flex flex-col items-start justify-center p-6 gap-3 text-[var(--accent)]/60">
                            <span className={`mb-3`}>Here is the current <span className="text-2xl font-bold">STACK</span> I'm using in 2026</span>
                                
                            <div className="flex flex-col items-start justify-start gap-3">  

                                <div className="flex flex-row items-center gap-3">
                                    <i title="Next.js" className="bxl bx-next-js text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                    <a href="https://nextjs.org/" className="cursor-pointer underline">Next.js</a>
                                    <span> - Full-stack framework</span>
                                </div>
                                <div className="flex flex-row items-center gap-3">
                                    <i title="Tailwind CSS" className="bxl bx-tailwind-css text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                    <a href="https://tailwindcss.com/" className="cursor-pointer underline">Tailwind CSS</a>
                                    <span> - Styling system</span>
                                </div>
                                <div className="flex flex-row items-center gap-3">
                                    <i title="Shadcn" className="bxl bx-shadcn-ui text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                    <a href="https://ui.shadcn.com/" className="cursor-pointer underline">Shadcn/ui</a>
                                    <span> - UI components</span>
                                </div>
                                <div className="flex flex-row items-center gap-3">
                                    <i title="Boxicons" className="bxl bx-boxicons text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                    <a href="https://boxicons.com/" className="cursor-pointer underline">Boxicons</a>
                                    <span> - Icon set</span>
                                </div>
                                <div className="flex flex-row items-center gap-3">
                                    <i title="Geist Font" className="bxf bx-quote-left text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                    <a href="https://vercel.com/font" className="cursor-pointer underline">Geist Sans</a>
                                    <span> - Typography</span>
                                </div>
                                <div className="flex flex-row items-center gap-3">
                                    <i title="Vercel" className="bxl bx-vercel text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                    <a href="https://vercel.com" className="cursor-pointer underline">Vercel</a>
                                    <span> - Hosting and deployment</span>
                                </div>
                                <div className="flex flex-row items-center gap-3">
                                    <i title="Firebase" className="bxl bx-firebase text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                    <a href="https://firebase.google.com/" className="cursor-pointer underline">Firebase</a>
                                    <span> - Backend-as-a-Service (BaaS)</span>
                                </div>
                                <div className="flex flex-row items-center gap-3">
                                    <i title="Firebase Auth" className="bxf bx-lock-keyhole text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                    <a href="https://firebase.google.com/" className="cursor-pointer underline">Firebase Auth</a>
                                    <span> - User authentication</span>
                                </div>
                                <div className="flex flex-row items-center gap-3">
                                    <i title="Cloud Firestore" className="bxf bx-database text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                    <a href="https://firebase.google.com/docs/firestore" className="cursor-pointer underline">Cloud Firestore</a>
                                    <span> - NoSQL database</span>
                                </div>
                                <div className="flex flex-row items-center gap-3">
                                    <i title="Git" className="bxl bx-git text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                    <a href="https://git-scm.com/" className="cursor-pointer underline">Git</a>
                                    <span> - Version control</span>
                                </div>
                                <div className="flex flex-row items-center gap-3">
                                    <i title="Github" className="bxl bx-github text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                    <a href="https://github.com/" className="cursor-pointer underline">Github</a>
                                    <span> - Code hosting and collaboration</span>
                                </div>

                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>}

            {openContact && <div className={`bg-[rgba(0,0,0,0.3)] h-screen w-full absolute top-0 left-0 z-30 flex flex-col items-center justify-start p-3`}>

                <motion.div drag dragConstraints={{ left: 0, right: 200, top: 0, bottom: 200}}>
                    <div className={`${isMobile? "h-auto w-[340px]" : "h-auto w-[600px]"}
                        flex flex-col items-center justify-start bg-[var(--secondary)] shadow-xl`}>

                        <div className={`text-[var(--light)]/80 w-full bg-[var(--primary)] p-3 flex flex-row items-center justify-between`}>
                            <span className="">Contact</span>
                            <i title="Cancel" className={` bx bx-x text-xl cursor-pointer`} onClick={() => setOpenContact((prev) => !prev)}/>
                        </div>

                        <div className="h-full w-full flex flex-col items-center justify-center p-6 gap-3 text-[var(--dark)]/60">
                            <span className="w-full mb-3">Get in <span className="w-full text-2xl font-bold">TOUCH</span></span>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jutscapispisan@gmail.com" 
                                className="w-full flex items-center justify-start gap-2">
                                <i title="Email" className="bx bx-envelope text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                <span className="cursor-pointer">@jutscapispisan@gmail.com</span>
                            </a>
                            <div className="w-full flex flex-row items-center gap-3">
                                <i className="bx bx-phone text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                <span className="cursor-pointer">+639936709952</span>
                            </div>
                            <a href="https://web.facebook.com/Juls.Caps" className="w-full flex flex-row items-center justify-start gap-2">
                                <i title="Facebook" className="bxl bx-facebook-circle text-[calc(0.5vw+1.4rem)] text-[var(--primary)] cursor-pointer" />
                                <span className={`text-sm cursor-pointer`}>https://web.facebook.com/Juls.Caps</span>
                            </a>
                            <div className="w-full flex flex-row items-center gap-3">
                                <i className="bx bx-location text-[calc(0.5vw+1.2rem)] text-[var(--primary)] cursor-pointer" />
                                <span className="cursor-pointer">#661 Acacia St. Napico Manggahan Pasig City</span>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>}

        </div>
    )
}
