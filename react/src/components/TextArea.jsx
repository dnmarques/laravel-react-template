import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import Typography from "./Typography";

const TextArea = React.forwardRef(({
  label,
  name,
  value,
  onChange,
  errors = [],
  required = false,
  placeholder = null,
  helper = '',
  rows = 3,
  optionalMessage = '(opcional)'
}, ref) => {
  const inputClasses = errors.length
    ? `block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md`
    : `appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`
  return (
    <>
      <div className={'flex flex-row gap-2 items-center'}>
        <label htmlFor={ name } className="block text-sm font-medium text-gray-700">
          { label }
        </label>
        { !required && <Typography type={'bodyextrasmall'} color={'text-gray-400'}>
          { optionalMessage }
        </Typography> }
      </div>
      <div className="mt-1 relative">
        <textarea
          id={name}
          name={name}
          required={required}
          placeholder={placeholder}
          className={inputClasses}
          value={value}
          onChange={onChange}
          rows={rows}
          ref={ref}
        />
        { errors.length ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        ) : '' }
      </div>
      { helper && !errors.length ? (
        <div className="mt-2">
          <Typography as={'p'} type={'bodyextrasmall'}>
            { helper}
          </Typography>
        </div>
      ) : ''}
      { errors.length ? (
        errors.map((error) => <p key={error} className="mt-2 text-sm text-red-600">
          { error }
        </p>)
      ) : '' }
    </>
  )
})

export default TextArea
