import React from 'react'
import { classNames } from 'app/util'

function Button({ children, type = null, disabled= false, onClick = null, color = 'primary', size = 'w-full', className = '' }) {
  const colorClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm py-2 px-4 border border-transparent rounded-md text-white',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-sm py-2 px-4 border border-transparent rounded-md text-white',
    tertiary: 'text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 py-2 px-4 border border-transparent rounded-md',
    primaryText: 'text-indigo-600 hover:text-indigo-900 focus:ring-indigo-500',
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        disabled ? 'bg-gray-200' : 'focus:outline-none focus:ring-2 focus:ring-offset-2',
        disabled ? 'shadow-sm py-2 px-4 border border-transparent rounded-md' : colorClasses[color],
        'flex justify-center text-center text-base sm:text-sm font-medium',
        size,
        className
      )}
    >
      { children }
    </button>
  )
}

export default Button
