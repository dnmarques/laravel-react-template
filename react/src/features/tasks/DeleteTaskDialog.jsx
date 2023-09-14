import { useState } from 'react'
import Typography from 'components/Typography'
import { useDispatch, useSelector } from 'react-redux'
import ButtonWithLoading from 'components/ButtonWithLoading'
import { dateSelector, fetchTasks, deleteTask } from 'features/tasks/tasksSlice'
import ActionableDialog from 'components/ActionableDialog'

export default function DeleteTaskDialog({ open, setOpen, task, date = null }) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const selectedDate = useSelector(dateSelector)

  const handleDeleteTask = async (task) => {
    setIsLoading(true)
    try {
      await dispatch(deleteTask({
        taskId: task.id
      })).unwrap()

      // TODO: Show snackbar
      // ...

      setOpen(false)
      dispatch(fetchTasks(selectedDate))
    } catch (error) {
      setIsLoading(false)
      // TODO: Handle error
      console.log('handle errors?')
    }
  }

  const submitButton = (
    <ButtonWithLoading
      type="button"
      color="danger"
      onClick={() => handleDeleteTask(task)}
      isLoading={isLoading}
      loadingLabel={'Deleting...'}
    >
      Yes, delete task
    </ButtonWithLoading>
  )
  return (
    <ActionableDialog open={open} setOpen={setOpen} submitButton={submitButton} cancelLabel={'No, keep task'}>
      <Typography type={'bodymedium'}>
        Are you sure you want to delete the task "<strong>{task.text}</strong>"?
      </Typography>
    </ActionableDialog>
  )
}
