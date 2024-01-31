"use client"

import { RecoilRoot, useRecoilValue } from 'recoil'
import { modalState } from '@/atoms/modalAtom'
import Header from './components/Header'
import Banner from './components/Banner'
import Plans from './components/Plans'
import Row from './components/Row'
import useAuth from '@/hooks/useAuth'
import Modal from './components/Modal'
import { useEffect, useState } from 'react'
import requests from './utils/requests'
import { getSubscription } from './lib/stripe'

export default function HomePage() {
  const { user } = useAuth()
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    if (user) {
      getSubscription(user.uid).then(subscription => {
        if (subscription) {
          setSubscribed(true)
        }
      })
    }
  }, [user])

  if (!subscribed) return <Plans />

  return (
    <RecoilRoot>
      <Child />
    </RecoilRoot>
  )
}

const Child = () => {
  const showModal = useRecoilValue(modalState)

  const [movies, setMovies] = useState({
    netflixOriginals: [],
    trendingNow: [],
    topRated: [],
    actionMovies: [],
    comedyMovies: [],
    horrorMovies: [],
    romanceMovies: [],
    documentaries: [],
  })

  useEffect(() => {
    const movieRequests = Object.values(requests)

    Promise.all(
      movieRequests.map((url) =>
        fetch(url, {
          cache: 'no-store',
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`Request to ${url} failed with status ${response.status}`)
          }
          return response.json()
        })
      )
    )
      .then((responses) => {
        responses.forEach((response, index) => {
          setMovies((prevMovies) => ({
            ...prevMovies,
            [Object.keys(movies)[index]]: response.results,
          }))
        })
      })
      .catch((error) => {
        console.error("Error making requests:", error)
      })
  }, [])

  return (
    <div className='relative h-screen bg-gradient-to-b lg:h-[200vh]'>
      <Header />
      <main className='relative pl-4 pb-6 lg:space-y-12 lg:pl-16'>
        <Banner netflixOriginals={movies.netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={movies.trendingNow} />
          <Row title="Top Rated" movies={movies.topRated} />
          <Row title="Action Thrillers" movies={movies.actionMovies} />
          {/* My List */}
          {/* {list.length > 0 && <Row title="My List" movies={list} />} */}

          <Row title="Comedies" movies={movies.comedyMovies} />
          <Row title="Scary Movies" movies={movies.horrorMovies} />
          <Row title="Romance Movies" movies={movies.romanceMovies} />
          <Row title="Documentaries" movies={movies.documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}