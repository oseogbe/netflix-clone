import { useEffect, useState } from 'react'
import Banner from './components/Banner'
import Header from './components/Header'
import Row from './components/Row'
import useAuth from '@/hooks/useAuth'
import { useRecoilValue } from 'recoil'
import { modalState } from '@/atoms/modalAtom'
import requests from './utils/requests'
import Modal from './components/Modal'

const Content = () => {

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
                fetch(url, {
                    cache: 'no-store',
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(`Request to ${url} failed with status ${response.status}`);
                    }
                    return response.json();
                })
            )
        )
            .then((responses) => {
                responses.forEach((response, index) => {
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
    const showModal = useRecoilValue(modalState)

    if (loading) return null

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

export default Content