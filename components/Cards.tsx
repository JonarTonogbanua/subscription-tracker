import { ReactNode } from "react"

const Cards = ({children, className} : {children: ReactNode, className?: String}) => {
  return <>
    <div className={`w-full py-3 px-6 bg-accent rounded-lg ${className}`}>
      {children}
    </div>
  </>
}

export default Cards