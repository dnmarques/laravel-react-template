import React, { useState } from 'react'
import { register } from './authSlice'
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import {getUser} from "../loggedUser/loggedUserSlice";
import Button from "../../components/Button";
import ButtonWithLoading from "../../components/ButtonWithLoading";

function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()

  const onNameChanged = e => setName(e.target.value)
  const onEmailChanged = e => setEmail(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const onPasswordConfirmationChanged = e => setPasswordConfirmation(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    try {
      await dispatch(register({
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation
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
          name={'name'}
          onChange={onNameChanged}
          label={'Name'}
          value={name}
          autoComplete={'name'}
          errors={[]}
          required={true}
        />
      </div>
      <div>
        <Input
          type={'email'}
          name={'email'}
          onChange={onEmailChanged}
          label={'Email address'}
          value={email}
          autoComplete={'email'}
          errors={[]}
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

      <div>
        <Input
          type={'password'}
          name={'password_confirmation'}
          onChange={onPasswordConfirmationChanged}
          label={'Password confirmation'}
          value={passwordConfirmation}
          errors={[]}
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
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <ButtonWithLoading type={'submit'} isLoading={isLoading}>Sign up</ButtonWithLoading>
      </div>
    </form>
  )
}

export default RegisterForm
