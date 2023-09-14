import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  user
} from '../../features/loggedUser/loggedUserSlice'

function Guest({ children }) {
  const navigate = useNavigate()

  const loggedUser = useSelector(user)

  useEffect(() => {
    if (loggedUser) {
      navigate('/dashboard')
    }
  }, [loggedUser, navigate])

  if (loggedUser) {
    return ;
  }

  return children
}

export default Guest
