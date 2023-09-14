import Nav from 'components/Nav'
import TaskList from 'components/TaskList'
import Input from 'components/Input'
import Typography from 'components/Typography'
import {
  dateSelector,
  selectTasks, setCreateTaskDialog,
  setDate, setDeleteTaskDialog,
  setEditTaskDialog
} from 'features/tasks/tasksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Button from 'components/Button'
import FAB from 'components/FAB'
import Dialog from 'components/Dialog'
import EditTaskDialog from 'features/tasks/EditTaskDialog'
import CreateTaskDialog from 'features/tasks/CreateTaskDialog'
import DeleteTaskDialog from 'features/tasks/DeleteTaskDialog'

export default function Dashboard() {
  const dispatch = useDispatch()
  const date = useSelector(dateSelector)
  const tasks = useSelector(selectTasks)
  const selectedTask = useSelector((state) => state.tasks.selectedTask)
  const editTaskDialogOpen = useSelector((state) => state.tasks.editTaskDialogOpen)
  const createTaskDialogOpen = useSelector((state) => state.tasks.createTaskDialogOpen)
  const deleteTaskDialogOpen = useSelector((state) => state.tasks.deleteTaskDialogOpen)

  return (
    <>
      <Helmet>
        <title>Dashboard | Incrível</title>
      </Helmet>
      <div className="relative flex w-full h-screen">
        <div className='md:hidden absolute bottom-0 right-0 mr-6 mb-6 z-10'>
          <FAB onClick={() => dispatch(setCreateTaskDialog({ open: true }))} />
        </div>
        <div className="overflow-y-auto w-full">
          <Nav />

          <div className="py-10">
            <main>
              <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-10">
                <div className="sm:max-w-xs">
                  <Input
                    type={'date'}
                    name={'date'}
                    label={'Data'}
                    required={true}
                    value={date}
                    onChange={(e) => dispatch(setDate(e.target.value))}
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="col-span-1">
                    <div className="flex items-baseline mb-5 gap-8">
                      <Typography as={'h2'} type={'headingxs'}>
                        Tasks
                      </Typography>
                      <div className="hidden md:block">
                        <Button onClick={() => dispatch(setCreateTaskDialog({ open: true }))} color={'primaryText'}>
                          Create task
                        </Button>
                      </div>
                    </div>
                    <TaskList
                      date={date}
                    />
                  </div>
                  <div className="col-span-1">
                    <div>
                      <label htmlFor="comment" className="block mb-5">
                        <Typography as={'span'} type={'headingxs'}>
                          How to use
                        </Typography>
                      </label>
                      <Typography type="bodysmall">
                        Feel free to edit this code.
                      </Typography>
                      <Typography type="bodysmall">
                        You can do a basic CRUD with the tasks on the right, filter by date on top, and navigate to another page.
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Dialog open={editTaskDialogOpen}>
        <EditTaskDialog
          open={editTaskDialogOpen}
          setOpen={() => dispatch(setEditTaskDialog({ task: selectedTask, open: false}))}
          task={selectedTask}
        />
      </Dialog>
      <Dialog open={createTaskDialogOpen}>
        <CreateTaskDialog
          open={createTaskDialogOpen}
          setOpen={() => dispatch(setCreateTaskDialog({ open: false}))}
        />
      </Dialog>
      <Dialog open={deleteTaskDialogOpen}>
        <DeleteTaskDialog
          open={deleteTaskDialogOpen}
          setOpen={() => dispatch(setDeleteTaskDialog({ task: selectedTask, open: false}))}
          task={selectedTask}
        />
      </Dialog>
    </>
  )
}
