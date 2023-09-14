import React from 'react'

import Typography from "./Typography";
import {classNames} from "../app/util";

function ProgressBar({ progress = 75 }) {
  const style = {
    width: Math.max(Math.min(progress, 100), 5) + '%'
  }
  const getProgressTextColor = (progress) => {
    if (progress === 100) {
      return 'text-green-200'
    }
    if (progress >= 50) {
      return 'text-indigo-200'
    }
    return 'text-gray-400'
  }
  const getProgressBarColor = (progress) => {
    if (progress === 100) {
      return 'bg-green-500'
    }
    return 'bg-indigo-500'
  }
  return <div className="relative h-6 w-96">
    <div className="absolute w-96 h-6 rounded-full bg-gray-100">
    </div>
    { (progress > 0) &&
      <div style={style} className={classNames(
        "absolute h-6 rounded-full",
        getProgressBarColor(progress)
      )}>
      </div>
    }
    <div className={classNames(
      "absolute",
      progress >= 50 ? 'left-0 ml-5' : 'right-0 mr-5'
    )}>
      <Typography as={'span'} type={'bodyextrasmall'} className="align-center" color={getProgressTextColor(progress)}>{progress}% completo</Typography>
    </div>
  </div>
}

export default ProgressBar
