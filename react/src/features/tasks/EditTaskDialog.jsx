import { useRef, useState, useEffect } from 'react'
import Input from 'components/Input'
import { useDispatch, useSelector } from 'react-redux'
import { editTask } from 'features/tasks/tasksSlice'
import ButtonWithLoading from 'components/ButtonWithLoading'
import { dateSelector, fetchTasks } from './tasksSlice'
import ActionableDialog from 'components/ActionableDialog'

export default function EditTaskDialog({ open, setOpen, task }) {
  const [taskText, setTaskText] = useState(task.text)
  const [taskDate, setTaskDate] = useState(task?.date ?? '')
  const [errors, setErrors] = useState([])

  const taskTextInput = useRef(null)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const selectedDate = useSelector(dateSelector)

  const handleEditTask = async () => {
    setIsLoading(true)
    setErrors([])
    try {
      await dispatch(editTask({
        taskId: task.id,
        text: taskText,
        date: taskDate,
      })).unwrap()

      // TODO: Show snackbar
      // ...

      setOpen(false)

      dispatch(fetchTasks(selectedDate))
    } catch (error) {
      setIsLoading(false)
      setErrors(error)
    }
  }

  const submitButton = (
    <ButtonWithLoading
      type="button"
      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
      onClick={handleEditTask}
      isLoading={isLoading}
      loadingLabel={'Editing...'}
    >
      Update task
    </ButtonWithLoading>
  )
  return (
    <ActionableDialog open={open} setOpen={setOpen} title={'Update task'} submitButton={submitButton}>
      <div>
        <Input
          label='Task'
          name='task'
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          required={true}
          placeholder={'Do some exercise...'}
          helper={'What do you need to do?'}
          errors={errors?.text}
          ref={taskTextInput}
        />
      </div>
      <div>
        <Input
          label='Date'
          name='date'
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          required={false}
          type='date'
          helper={'When do you need to do this task?'}
          errors={errors?.date}
        />
      </div>
    </ActionableDialog>
  )
}
