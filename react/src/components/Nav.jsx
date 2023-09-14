import React, {useState} from 'react'
import { classNames } from '../app/util'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure, Menu, Transition} from '@headlessui/react'
import { Fragment } from 'react'
import { logout } from 'features/auth/authSlice'
import { getUser } from 'features/loggedUser/loggedUserSlice'
import { useDispatch, useSelector } from "react-redux";
import Typography from './Typography'
import {useLocation, useNavigate} from "react-router-dom";

function Nav() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedUser.user)

  const handleSignOutClick = async () => {
    await dispatch(logout())
    await dispatch(getUser())
    navigate('/login')
  }

  /*const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    avatar: null,
  }*/
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Another page', href: '/another-page' },
  ]
  const userNavigation = [
    /*{ name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },*/
  ]

  const isCurrent = (href) => href === location.pathname
  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center gap-2">
                  <a href={process.env.REACT_APP_BACKEND_URL}>
                    <img
                      className="h-8 w-auto"
                      src={process.env.REACT_APP_BACKEND_URL + '/img/incrivel.svg'}
                      alt="Yourapp"
                    />
                  </a>
                  <Typography as={'h1'} type={'headingxl'}>Yourapp</Typography>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        isCurrent(item.href)
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                      aria-current={isCurrent(item.href) ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/*<button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>*/}
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div className="flex items-center gap-2">
                    <div className="text-gray-500">
                      <Typography as={'div'} type={'bodymedium'}>{ user.name }</Typography>
                    </div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      { user.avatar ? (
                        <img className="h-8 w-8 rounded-full" src={user.avatar} alt="" />
                      ) : (
                        <img className="h-8 w-8 rounded-full border-2 border-gray-200" src={process.env.REACT_APP_BACKEND_URL + '/img/avatar-placeholder.jpeg'} alt="avatar" />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                      <Menu.Item key={'Sign out'}>
                        {({ active }) => (
                          <button
                            onClick={handleSignOutClick}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                            )}
                          >
                            {'Logout'}
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    isCurrent(item.href)
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  { user.avatar ? (
                    <img className="h-8 w-8 rounded-full" src={user.avatar} alt="" />
                  ) : (
                    <img className="h-8 w-8 rounded-full border-2 border-gray-200" src={process.env.REACT_APP_BACKEND_URL + '/img/avatar-placeholder.jpeg'} alt="avatar" />
                  )}
                </div>
                <div className="ml-3">
                  <Typography as={'div'} type={'bodymedium'}>{ user.name }</Typography>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
                {/*<button
                  type="button"
                  className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>*/}
              </div>
              <div className="mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <Disclosure.Button
                  key={'bla'}
                  as="button"
                  onClick={handleSignOutClick}
                  className={'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left'}
                  aria-current={undefined}
                >
                  {'Logout'}
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Nav
