import React, { useEffect, useRef } from "react"
import SideBar from "../SideBar"
import Header from "../ui/Header"
import useBoardMode from "../../store/boardModeStore"

type MainBaseProps = {
  children: React.ReactNode
}

const MainBase = ({ children }: MainBaseProps) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const { mode } = useBoardMode()

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0 })
    }
  }, [mode])

  return (
    <div className="flex h-full">
      <aside>
        <SideBar />
      </aside>

      <div className="flex flex-col flex-1 h-full">
        <Header showMenuButton />

        <main ref={mainRef} className="w-full h-full flex-col gap-8 flex px-4 py-8 md:px-8 shadow-inner overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainBase