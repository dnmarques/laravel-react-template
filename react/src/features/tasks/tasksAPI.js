import client from 'api/client'

export const getTasksAPI = () => client.get(`api/tasks`)

export const completeTaskAPI = (task) => {
  return client.post(`api/tasks/${task.id}/complete`)
}

export const createTaskAPI = (body) => client.post(`api/tasks`, body)

export const deleteTaskAPI = (taskId) => client.delete(`api/tasks/${taskId}`)

export const editTaskAPI = (taskId, body) => client.put(`api/tasks/${taskId}`, body)
