"use client"

import { RecoilRoot } from 'recoil'
import PageContent from './content'

const Home = () => {
  return (
    <RecoilRoot>
      <PageContent />
    </RecoilRoot>
  )
}

export default Home