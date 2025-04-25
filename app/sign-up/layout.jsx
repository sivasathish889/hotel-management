import React from 'react'

const layout = ({children}) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800 w-full'>
        {children}
    </div>
  )
}

export default layout