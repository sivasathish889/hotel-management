import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-[#f5f5f5] bg-cover bg-no-repeat bg-center ">
            {children}
        </div>
    )
}

export default Layout