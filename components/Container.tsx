const Container = ({children, className} : {children: ReactNode, className?: String}) => {
  return <>
    <div className={`w-full mx-auto max-w-4xl ${className}`}>
      {children}
    </div>
  </>
}

export default Container