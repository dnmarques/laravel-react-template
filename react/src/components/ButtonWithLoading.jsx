import React from 'react'
import Button from 'components/Button'
import Spinner from "./Spinner";
import {classNames} from "../app/util";

function ButtonWithLoading({ children, isLoading, loadingLabel = 'Loading...', color = 'primary', ...props }) {
  const spinnerColor = {
    primary: 'text-indigo-400',
    danger: 'text-red-400',
  }

  const loadingSpinner = (
    <div className="flex items-center gap-3 text-white">
      <Spinner className={ spinnerColor[color]}/>
      <span className="text-white">{ loadingLabel }</span>
    </div>
  )
  return (
    <Button {...props} color={color} disabled={isLoading}>
      { isLoading ? loadingSpinner : children }
    </Button>
  )
}

export default ButtonWithLoading
