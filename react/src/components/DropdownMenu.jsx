import React from 'react'
import { classNames } from "../app/util";
import { Menu, Transition} from "@headlessui/react";
import { Fragment } from 'react'

function DropdownMenu({ button, onClickOption, options, buttonDivClassName = '', contentPosition = 'left' }) {
  const renderOption = (option, active) => {
    if (option?.disabled) {
      return <button
        disabled={true}
        className={classNames(
          'flex items-center',
          'block px-4 py-2 text-sm text-gray-400 w-full text-left',
          contentPosition === 'left' ? 'justify-start' : '',
          contentPosition === 'right' ? 'justify-end' : '',
          option?.disabled ? 'bg-gray-50' : ''
        )}
      >
        { option.icon ? option.icon : null }
        { option.name }
      </button>
    }
    if (option.href) {
      return <a
        href={option.href}
        className={classNames(
          active ? 'bg-gray-100' : '',
          'block px-4 py-2 text-sm text-gray-700',
          contentPosition === 'left' ? 'text-left' : '',
          contentPosition === 'right' ? 'text-right' : '',
        )}
      >
        {option.name}
      </a>
    }
    return <button
      onClick={() => onClickOption(option)}
      className={classNames(
        'flex items-center',
        active ? 'bg-gray-100' : '',
        'block px-4 py-2 text-sm text-gray-700 w-full text-left',
        contentPosition === 'left' ? 'justify-start' : '',
        contentPosition === 'right' ? 'justify-end' : '',
      )}
    >
      { option.icon ? option.icon : null }
      { option.name }
    </button>
  }
  return (
    <Menu as="div" className="relative">
      <div className={buttonDivClassName}>
        <Menu.Button>
          { button }
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-max max-w-xs rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          {options.map((option) => (
            <Menu.Item key={option.name}>
              {({ active }) => (
                renderOption(option, active)
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropdownMenu
