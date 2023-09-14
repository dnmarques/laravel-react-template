import React from 'react'
import { PlusSmallIcon as PlusSmIconOutline } from '@heroicons/react/24/outline'

function FAB({ onClick }) {
  return (
    <button
      type="button"
      className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={onClick}
    >
      <PlusSmIconOutline className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}

export default FAB
