"use client"

import useAuth from '@/hooks/useAuth'
import Banner from './components/Banner'
import Header from './components/Header'
import Row from './components/Row'
import requests from './utils/requests'
import { useEffect, useState } from 'react'

const Home = () => {
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
    const movieRequests = Object.values(requests);

    Promise.all(
      movieRequests.map((url) =>
        fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error(`Request to ${url} failed with status ${response.status}`);
          }
          return response.json();
        })
      )
    )
      .then((responses) => {
        responses.forEach((response, index) => {
          const requestKey = Object.keys(requests)[index];
          console.log(Object.keys(movies)[index])
          setMovies((prevMovies) => ({
            ...prevMovies,
            [Object.keys(movies)[index]]: response.results,
          }));
        });
      })
      .catch((error) => {
        console.error("Error making requests:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { loading } = useAuth()

  if (loading) return null

  return (
    <div className='relative h-screen bg-gradient-to-b lg:h-[200vh]'>
      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
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
      {/* Modal */}
    </div>
  )
}

export default Home