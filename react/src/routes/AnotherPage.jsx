import React, {useEffect, useState} from "react";
import Typography from "../components/Typography";
import Page from "../theme/Page";
import Button from "../components/Button";
import LoadingPage from "../components/LoadingPage";

export default function AnotherPage() {
  const title = 'Another page'

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loading ? setTimeout(() => setLoading(false), 1000) : setLoading(false)
  }, [loading]);

  if (loading) {
    return <LoadingPage title={title} />
  }

  return <Page title={title}>
    <div className={'flex flex-col items-center h-full gap-4'}>
      <img className="h-60 md:h-80 xl:h-96 object-cover" src={'/img/achievement.png'} alt="" />
      <div>
        <Typography type={'headingxs'} color={'text-gray-800'} className={'xl:hidden'}>This is another page</Typography>
        <Typography type={'headingm'} color={'text-gray-800'} className={'hidden xl:block'}>This is another page</Typography>
      </div>
      <Button size={''} onClick={() => console.log('clicked on a button')}>
        <Typography type={'bodysmall'} color={'text-white'} className={'xl:hidden'}>Do something</Typography>
        <Typography type={'bodymedium'} color={'text-white'} className={'hidden xl:block'}>Do something</Typography>
      </Button>
    </div>
  </Page>
}
