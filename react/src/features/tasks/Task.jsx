import React from 'react'
import { classNames } from 'app/util'
import Typography from 'components/Typography'
import Spinner from 'components/Spinner'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import DropdownMenu from 'components/DropdownMenu'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import IconButton from 'components/IconButton'
import { setDeleteTaskDialog, setEditTaskDialog } from 'features/tasks/tasksSlice'
import { useDispatch } from "react-redux";

export default function Task({ task, onTaskComplete, completeLoading = false }) {
  const dispatch = useDispatch()
  const taskOptions = [
    {
      key: 'edit',
      name: 'Edit',
      icon: <PencilIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    },
    {
      key: 'delete',
      name: 'Delete',
      icon: <TrashIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    }
  ]

  const taskOptionsButton = <div className="text-gray-600 rounded-full p-1 hover:bg-indigo-600 hover:text-white">
    <EllipsisVerticalIcon
      className="h-5 w-5"
      aria-hidden="true"
    />
  </div>

  const openEditTask = () => dispatch(setEditTaskDialog({ task: task, open: true }))
  const openDeleteTask = () => dispatch(setDeleteTaskDialog({ task: task, open: true }))

  const handleOptionClick = (option) => {
    if (option.key === 'edit') {
      openEditTask()
    }
    if (option.key === 'delete') {
      openDeleteTask()
    }
  }

  return (
    <div
      key={task.id}
      className={classNames(
        task.completed_at ? 'line-through bg-green-200 text-green-800' : 'hover:bg-gray-100 text-gray-700',
        'flex justify-between items-center px-2 md:px-6 py-2 group rounded-md min-h-[44px]'
      )}>
      <div className="relative flex items-center">
        <div className="flex items-center h-5">
          { completeLoading
            ? <Spinner className={'w-4 h-4'} />
            : (
              <input
                id={`tasks[${task.id}]`}
                aria-describedby="task"
                name={`tasks[${task.id}]`}
                type="checkbox"
                checked={task.completed_at != null}
                onChange={onTaskComplete}
                className={classNames(
                  task.completed_at ? '' : 'group-hover:border-2 group-hover:border-gray-400',
                  'focus:ring-indigo-500 h-4 w-4 text-green-600 border-gray-300 rounded'
                )}
              />
            )}
        </div>
        <div className="flex flex-col ml-3">
          <Typography type={'bodymedium'} className={'line-clamp-3'}>{ task.text }</Typography>
        </div>
      </div>
      <div className="hidden md:block min-w-[68px]">
        <div className={classNames(task.completed_at ? '' : 'group-hover:block', 'hidden')}>
          <div className="flex gap-3">
            <IconButton onClick={openEditTask}>
              <PencilIcon className="h-5 w-5" />
            </IconButton>
            <IconButton onClick={openDeleteTask}>
              <TrashIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
      </div>
      <div className={classNames(task.completed_at ? 'hidden' : 'block md:hidden')}>
        <div>
          <DropdownMenu button={taskOptionsButton} options={taskOptions} onClickOption={handleOptionClick} />
        </div>
      </div>
    </div>
  )
}
