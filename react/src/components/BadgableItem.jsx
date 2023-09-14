import React from 'react'
import {classNames} from "../app/util";
import Typography from "./Typography";

function BadgableItem({ selected = true, children, size = 7, color = 'gray', bordered = false }) {
  const style = {
    gray: {
      background: 'bg-gray-600',
      text: 'text-white',
      border: 'border-gray-900'
    },
    green: {
      background: 'bg-green-100',
      text: 'text-green-400',
      border: 'border-green-900'
    },
    red: {
      background: 'bg-red-100',
      text: 'text-red-400',
      border: 'border-red-900'
    },

  }
  return <div
    className={classNames(
    "rounded-full flex items-center justify-center",
      selected ? style[color]['background'] : "",
      size === 7 ? "w-7 h-7" : "",
      size === 5 ? "w-5 h-5" : "",
      size === 4 ? "w-4 h-4" : "",
      bordered ? 'border border-solid' : "",
      bordered ? style[color]['border'] : ""
    )}>
    <Typography
      type={'bodysmall'}
      color={selected ? style[color]['text'] : "default"}
    >
      {children}
    </Typography>
  </div>
}

export default BadgableItem
