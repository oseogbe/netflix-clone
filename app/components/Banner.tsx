"use client"

import { baseUrl } from '@/constants/movie'
import { Movie } from '@/typings'
import { InformationCircleIcon, PlayIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface Props {
    netflixOriginals: Movie[]
}

const countWords = (words: string) => {
    return words.trim().split(/\s+/).length;
}

const getOverViewExcerpt = (overview: string) => {
    if (countWords(overview) > 50) {
        return overview.split(' ').slice(0, 45).join(" ") + "...";
    }

    return overview;
}

const Banner = ({ netflixOriginals }: Props) => {
    const [movie, setMovie] = useState<Movie | null>(null)

    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    }, [netflixOriginals])

    return (
        <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
            <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
                <Image
                    src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                    alt="Featured movie"
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                />
            </div>

            <h1 className='text-2xl font-bold md:text-4xl lg:text-7xl'>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className='max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl drop-shadow-lg'>
                {getOverViewExcerpt(`${movie?.overview}`)}
            </p>

            <div className='flex space-x-3'>
                <button className='btn-banner bg-white text-black'>
                    <PlayIcon className='w-4 h-4 text-black md:w-7 md:h-7' /> Play
                </button>
                <button className='btn-banner bg-[gray]/70'>
                    More Info <InformationCircleIcon className='w-5 h-5 md:w-8 md:h-8' />
                </button>
            </div>
        </div>
    )
}

export default Banner