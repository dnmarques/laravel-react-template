import React from 'react'
import {classNames} from "../app/util";

export default function Typography({ children, as: Tag = 'p', type = 'headingxxl', className = '', color = 'default' }) {
  switch (type) {
    case 'headingxxl':
      return <Tag className={classNames(
        'text-5xl font-bold leading-tight',
        className,
        color === 'default' ? 'text-gray-900' : color
      )}>{ children }</Tag>
    case 'headingxl':
      return <Tag className={classNames(
        'text-3xl leading-9 font-bold',
        className
      )}>{ children }</Tag>
    case 'headingm':
      return <Tag className={classNames(
        'text-2xl leading-9 font-bold',
        className,
        color === 'default' ? 'text-gray-900' : color
      )}>{ children }</Tag>
    case 'headings':
      return <Tag className={classNames(
        'text-xl leading-9 font-bold',
        className,
        color === 'default' ? 'text-gray-900' : color
      )}>{ children }</Tag>
    case 'headingxs':
      return <Tag className={classNames(
        'text-base font-semibold leading-6',
        className,
        color === 'default' ? 'text-gray-900' : color
      )}>{ children }</Tag>
    case 'headingxxs':
      return <Tag className={classNames(
        'text-sm font-bold leading-5',
        className,
        color === 'default' ? 'text-gray-800' : color
      )}>{ children }</Tag>
    case 'bodymedium':
      return <Tag className={classNames(
        'text-base font-medium',
        className,
        color === 'default' ? 'text-gray-800' : color
      )}>{ children }</Tag>
    case 'bodysmall':
      return <Tag className={classNames(
        'text-sm',
        className,
        color === 'default' ? 'text-gray-800' : color
      )}>{ children }</Tag>
    case 'bodyextrasmall':
      return <Tag className={classNames(
        'text-xs',
        className,
        color === 'default' ? 'text-gray-500' : color
      )}>{ children }</Tag>
    default:
      return <Tag>{ children }</Tag>
  }
}
