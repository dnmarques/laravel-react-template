import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import IconButton from 'components/IconButton'
import Typography from 'components/Typography'
import Button from "./Button";
import ButtonWithLoading from "./ButtonWithLoading";
import {classNames} from "../app/util";

export default function ActionableDialog({ open, setOpen, title = false, children, submitButton, cancelLabel = 'Cancel' }) {
  const initialFocus = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment} appear={true}>
      <Dialog as="div" className="relative z-10" initialFocus={initialFocus} onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-visible shadow-xl transform transition-all sm:my-8 max-w-lg w-full sm:p-6">
                <div className="sm:flex sm:items-start mx-4">
                  <div className="mt-3 sm:mt-0 text-left w-full">
                    <div className={classNames("flex justify-between", title ? 'items-center' : '')}>
                      { title ? <Dialog.Title as={'div'}>
                        <Typography as={'h3'} type={'headingxxl'} className={'hidden md:block'}>
                          { title }
                        </Typography>
                        <Typography as={'h3'} type={'headingxl'} className={'block md:hidden'}>
                          { title }
                        </Typography>
                      </Dialog.Title>
                      : (
                          <div className="flex flex-col justify-center gap-5">
                            { children }
                          </div>
                        ) }
                      <div>
                        <IconButton onClick={() => setOpen(false)}>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </IconButton>
                      </div>
                    </div>
                    { title ? (<div className="flex flex-col mt-8 gap-5">
                      { children }
                    </div>) : '' }
                  </div>
                </div>
                <div className="mt-8 mx-4 sm:flex sm:flex-row-reverse gap-6">
                  <div>
                    { submitButton }
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <Button
                      type="button"
                      color={'tertiary'}
                      onClick={() => setOpen(false)}
                    >
                      { cancelLabel }
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
