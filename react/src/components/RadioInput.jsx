import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import Typography from "./Typography";
import {classNames} from "../app/util";

const Input = React.forwardRef(({
  label,
  name,
  value,
  onChange,
  errors = [],
  required = false,
  helper = '',
  options = [],
  selected = ''
}, ref) => {
  const renderOption = option => (
    <div key={option.id} className="flex items-center">
      <input
        id={option.id}
        name={name}
        type="radio"
        className={classNames(
          'h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600',
          option?.disabled ? 'bg-gray-200' : ''
        )}
        onChange={() => onChange(option.id)}
        checked={selected === option.id}
        disabled={option?.disabled}
      />
      <div className={'flex flex-col'}>
        <label
          htmlFor={option.id}
          className={classNames(
            'ml-3 block text-sm leading-6',
            option?.disabled ? 'text-gray-400' : 'text-gray-900'
          )}
        >
          { option.text }
        </label>
        { !!option?.helper && <Typography type={'bodyextrasmall'} color={'text-gray-400'} className={'ml-3'}>{ option.helper }</Typography>}
      </div>
    </div>
  )
  return (
    <fieldset>
      <div className={'flex flex-row gap-2 items-center'}>
        <label htmlFor={ name } className="block text-sm font-medium text-gray-700">
          { label }
        </label>
        { !required && <Typography type={'bodyextrasmall'} color={'text-gray-400'}>
          (opcional)
        </Typography> }
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
      <div className="mt-1 relative">
        <div className="mt-4 space-y-4">
          { options.map(option => renderOption(option)) }
        </div>
        { errors.length ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        ) : '' }
      </div>
    </fieldset>
  )
})

export default Input
