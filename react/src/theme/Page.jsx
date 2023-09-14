import Nav from 'components/Nav'
import { Helmet } from 'react-helmet'
import FAB from 'components/FAB'
import React from "react";

export default function Page({ title = '', onFABClick = null, children }) {
  return (
    <>
      <Helmet>
        <title>{ title ? `${title} | Incrível` : `Incrível` }</title>
      </Helmet>
      <div className="relative flex w-full h-screen">
        { !!onFABClick && <div className='md:hidden absolute bottom-0 right-0 mr-6 mb-6 z-10'>
          <FAB onClick={onFABClick} />
        </div> }
        <div className="overflow-y-auto w-full">
          <Nav />
          { children }
        </div>
      </div>
    </>
  )
}
