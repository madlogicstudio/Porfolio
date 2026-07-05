'use client'

import { useEffect, useState } from 'react'
import { Header } from './layouts/Header';
import Content from './layouts/Content';
import { Terminal } from './components/Terminal';

function page() {

  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [idle, setIdle] = useState(true);
  const [start, setStart] = useState(false);
  const [bio, setBio] = useState(false);
  const [lines, setLines] = useState<string[]>([
    "> Welcome to my Portfolio!",
    "> Type 'help' to see available commands.",
  ]);

  useEffect(() => {
    console.log(lines);
  }, [lines])

  return (
    <div className={`
      ${isDark ? 
        "text-[var(--light)] bg-linear-to-b from-[var(--dark)] to-[var(--accent)]" 
        : 
        "text-[var(--dark)] bg-linear-to-b from-[var(--secondary)] to-[var(--light)]"
      }
      h-screen w-full flex flex-col items-center justify-start cursor-crosshair overflow-hidden`}>

      <Header isDark={isDark} setIsDark={setIsDark}/>

      <Content isDark={isDark} idle={idle} setIdle={setIdle} bio={bio} start={start}/>

      <Terminal isDark={isDark} lines={lines} setLines={setLines} setIdle={setIdle} setBio={setBio} setStart={setStart}/>

    </div>
  )
}

export default page