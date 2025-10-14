import React from 'react'

export function MessageContainer({ contenido, sender }) {
  return (
    <div className={sender 
      ? 'ml-auto bg-blue-400 text-white rounded-xl p-2 mb-2 max-w-xs flex flex-col w-[70%]' 
      : 'bg-gray-100 text-black rounded-xl p-2 mb-2 max-w-xs flex flex-col w-[70%]'}>
      <span>{contenido}</span>
      {sender ?( 
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs">05:44</span>
          <i className="bx bx-check text-green-400 text-xs"></i>
        </div>
       ):<div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs">05:44</span>
        </div>}
    </div>
  )
}