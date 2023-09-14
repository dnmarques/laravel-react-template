import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  user
} from '../../features/loggedUser/loggedUserSlice'

function Protected({ children }) {
  const navigate = useNavigate()

  const loggedUser = useSelector(user)

  useEffect(() => {
    if (!loggedUser) {
      navigate('/login')
    }
  }, [loggedUser, navigate])

  if (!loggedUser) {
    return ;
  }

  return children
}

export default Protected
