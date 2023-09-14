import React from 'react'
import Spinner from "./Spinner";
import Page from "../theme/Page";

const LoadingPage = ({ title = '' }) => <Page title={title}>
  <div className="absolute top-0 h-screen w-full -z-50">
    <div className="flex w-full h-full items-center justify-center">
      <Spinner className="w-6 h-6 text-gray-600" />
    </div>
  </div>
</Page>

export default LoadingPage
