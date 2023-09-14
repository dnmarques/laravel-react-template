import React, {Fragment} from 'react'
import {classNames} from "../app/util";
import {CheckIcon} from "@heroicons/react/solid";
import {Listbox, Transition} from "@headlessui/react";
import Typography from "./Typography";

export default function SelectMenu({
  label,
  options,
  selected,
  setSelected,
  required = false,
  placeholder,
  optionalMessage = '(opcional)',
  emptyStateMessage = '(vazio)'
}) {
  return <Listbox value={selected} onChange={setSelected}>
    {({ open }) => (
      <>
        <Listbox.Label className="flex flex-row gap-2 items-center">
          <span className={'text-sm font-medium text-gray-700'}>{ label }</span>
          { !required && <Typography type={'bodyextrasmall'} color={'text-gray-400'}>
            { optionalMessage }
          </Typography> }
        </Listbox.Label>
        <div className="relative mt-2">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
            {!!selected && <span className="block truncate">{selected?.text}</span> }
            {!selected && <span className="block text-gray-400 truncate">{ placeholder }</span> }
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400" aria-hidden="true">
                <path fillRule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 01-1.06-1.06l3.75-3.75zm-3.75 9.75a.75.75 0 011.06 0L12 17.69l3.22-3.22a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              { !options.length && <div className={'text-gray-400 cursor-default select-none py-2 pl-8 pr-4 italic'}>
                { emptyStateMessage }
              </div> }
              {options.length > 0 && options.map((option) => (
                // eslint-disable-next-line react/jsx-no-undef
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    classNames(
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-8 pr-4'
                    )
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {option.text}
                        </span>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                          )}
                        >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </>
    )}
  </Listbox>
}
