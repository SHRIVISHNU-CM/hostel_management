import React from 'react'

function Loading() {
  return (
    <div className='flex items-center flex-col '>
      <p className=' text-2xl font-semibold text-green-900'>Loading .... </p>
      <span className='loading loading-spinner text-success'></span>
    </div>
  )
}

export default Loading
