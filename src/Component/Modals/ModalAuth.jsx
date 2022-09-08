import React from 'react'

const ModalAuth = ({message}) => {
  return (
    <div className='absolute top-10 left-1/2 -translate-x-1/2 z-10 p-5 text-sm bg-green-500 text-white font-bold rounded-lg transition-all'>
       {message + '' } Success
    </div>
  )
}

export default ModalAuth