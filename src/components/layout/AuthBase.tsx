type AuthBaseLayoutProps = {
  title: string
  children: React.ReactNode
}

const AuthBaseLayout = ({ title, children }: AuthBaseLayoutProps) => {
  return (
    <div className="w-full h-full flex bg-gray-100">
      <div className="flex-1 bg-primary">

      </div>

      <div className="flex-1 flex flex-col gap-8 items-center py-8 px-10 bg-white">
        <h1>{title}</h1>

        {children}
      </div>
    </div>
  )
}

export default AuthBaseLayout