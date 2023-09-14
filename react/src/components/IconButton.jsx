import React from 'react'

function IconButton({ children, onClick, type = 'solid' }) {
  return (
    <button className="text-gray-600 rounded-full p-1 hover:bg-indigo-600 hover:text-white" onClick={onClick}>
      { children }
    </button>
  )
}

export default IconButton
