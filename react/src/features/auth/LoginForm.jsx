import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { login } from "./authSlice";
import { getUser } from "../loggedUser/loggedUserSlice";
import Input from "../../components/Input";
import ButtonWithLoading from "../../components/ButtonWithLoading";

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()

  const onEmailChanged = e => setEmail(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    try {
      await dispatch(login({
        email: email,
        password: password
      })).unwrap()
      await dispatch(getUser())
    } catch (error) {
      setErrors(error)
    }
  }
  const isLoading = useSelector(state => state.auth.status) === 'loading'

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <Input
          type={'email'}
          name={'email'}
          onChange={onEmailChanged}
          label={'Email address'}
          value={email}
          autoComplete={'email'}
          errors={errors?.email}
          required={true}
        />
      </div>

      <div>
        <Input
          type={'password'}
          name={'password'}
          onChange={onPasswordChanged}
          label={'Password'}
          value={password}
          autoComplete={'current-password'}
          errors={errors?.password}
          required={true}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me"
                 className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#"
             className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <ButtonWithLoading type={'submit'} isLoading={isLoading}>Sign in</ButtonWithLoading>
      </div>
    </form>
  )
}

export default LoginForm
