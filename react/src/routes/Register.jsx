import React from 'react';
import RegisterForm from "../features/auth/RegisterForm";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";

function Register() {
  return (
    <>
      <Helmet>
        <title>Register | Incrível</title>
      </Helmet>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src={process.env.REACT_APP_BACKEND_URL + '/img/incrivel.svg'}
            alt="Incrível"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to={'/login'} className="font-medium text-indigo-600 hover:text-indigo-500">
              login if you already have an account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;
