import React, {useEffect} from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Home from "./routes/Home";
import Protected from "./routes/middlewares/Protected";
import Dashboard from "./routes/Dashboard";
import AnotherPage from "./routes/AnotherPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import {useDispatch, useSelector} from "react-redux";
import {getUser, user} from "./features/loggedUser/loggedUserSlice";
import Guest from "./routes/middlewares/Guest";
import Spinner from "./components/Spinner";

function App() {
  const loggedUser = useSelector(user);
  const status = useSelector(state => state.loggedUser.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedUser && status === 'idle') {
      dispatch(getUser())
    }
  }, [getUser, loggedUser, dispatch, status])

  if (!loggedUser && (status === 'idle' || status === 'loading')) {
    return (<div className="flex items-center justify-center h-screen">
      <Spinner className="w-8 h-8" />
    </div>)
  }

  return (
    <BrowserRouter>
      <header>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="dashboard"
            element={
              <Protected>
                <Dashboard/>
              </Protected>
            }
          />
          <Route
            path="another-page"
            element={
              <Protected>
                <AnotherPage/>
              </Protected>
            }
          />
          <Route
            path="login"
            element={
              <Guest>
                <Login />
              </Guest>
            }
          />
          <Route
            path="register"
            element={
              <Guest>
                <Register />
              </Guest>
            }
          />
        </Routes>
      </header>
    </BrowserRouter>
  );
}

export default App;
