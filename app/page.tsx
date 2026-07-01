'use client'

import { useState } from 'react'
import { Header } from './layouts/Header';
import Content from './layouts/Content';

function page() {

  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`
      ${isDark ? 
        "text-[var(--light)] bg-linear-to-b from-[var(--dark)] to-[var(--accent)]" 
        : 
        "text-[var(--dark)] bg-linear-to-b from-[var(--secondary)] to-[var(--light)]"
      }
      h-screen w-full flex flex-col items-center justify-start`}>

      <Header isDark={isDark} setIsDark={setIsDark}/>

      <Content isDark={isDark}/>

    </div>
  )
}

export default page