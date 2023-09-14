import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleCompleteTask,
  selectTasks,
  fetchTasks
} from 'features/tasks/tasksSlice'
import Typography from 'components/Typography'
import Task from 'features/tasks/Task'
import Spinner from "./Spinner";

function TaskList({ date }) {
  const tasks = useSelector(selectTasks)
  const status = useSelector((state) => state.tasks.status)
  const dispatch = useDispatch()

  const handleToggleTaskComplete = (task) => {
    try {
      dispatch(toggleCompleteTask(task)).unwrap()
    } catch (error) {
      // TODO: handle error
    }
  }

  const isTaskOverdue = (task) => {
    if (!task.date) {
      return false
    }
    const today = new Date().setHours(0,0,0,0)
    const selectedDate = new Date(date).getTime()
    const overdueDate = Math.min(today, selectedDate)

    return !task.completed_at && new Date(task.date).getTime() < overdueDate
  }

  const overdueTasks = [...tasks].filter(task => isTaskOverdue(task)).reduce(
    (carry, task) => {
      return {
        ...carry,
        [task.date]: [...carry[task.date] ?? [], task]
      }
    }, {})
  const noDateTasks = [...tasks].filter(task => !task.date)
  const loadingTasks = useSelector((state) => state.tasks.loadingTasks)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  if (status === 'loading') {
    return (<div className="flex justify-center">
      <Spinner className="w-6 h-6" />
    </div>)
  }

  const dateTasks = [...tasks].filter(task => task.date === date)
  const renderDateTasks = !dateTasks.length && status === 'succeeded'
     ? (
       <div className="flex flex-col max-w-xs">
         <Typography as={'span'} type={'bodyextrasmall'}>There are no tasks for { date }</Typography>
       </div>
    ) : (
      <div className="flex flex-col gap-0.5">
        { dateTasks.map(task => <Task
          key={task.id}
          task={task}
          onTaskComplete={() => handleToggleTaskComplete(task)}
          completeLoading={loadingTasks?.[task.id]} />
        )}
      </div>
    )

  return (
    <div>
      { renderDateTasks }
      <div className={'mt-4'}>
        { !!noDateTasks.length &&
          <div>
            <Typography as={'span'} type={'bodyextrasmall'}>Unscheduled tasks</Typography>
            <div className="flex flex-col gap-0.5">
            { noDateTasks.map((task) => <Task
                key={task.id}
                task={task}
                onTaskComplete={() => handleToggleTaskComplete(task)}
                completeLoading={loadingTasks?.[task.id]} />
            )}
            </div>
          </div>
        }
        { Object.keys(overdueTasks).sort().reverse().map((date) =>
          <div key={date}>
            <Typography as={'span'} type={'bodyextrasmall'}>Overdue tasks ({date})</Typography>
            <div className="flex flex-col gap-0.5">
              { overdueTasks[date].map(task => <Task
                key={task.id}
                task={task}
                onTaskComplete={() => handleToggleTaskComplete(task)}
                completeLoading={loadingTasks?.[task.id]} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskList
