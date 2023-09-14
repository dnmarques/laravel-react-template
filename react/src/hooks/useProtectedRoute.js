import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function useProtectedRoute(isLoggedIn) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])
}
