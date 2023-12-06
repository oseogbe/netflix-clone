import { modalState, movieState } from "@/atoms/modalAtom"
import { Movie } from "@/typings"
import Image from "next/image"
import { useRecoilState } from "recoil"

interface Props {
    // Movie | DocumentData
    movie: Movie
}

const Thumbnail = ({ movie }: Props) => {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

    return (
        <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title}
                className="rounded-sm object-cover md:rounded"
                width={300}
                height={300}
                onClick={() => {
                    setCurrentMovie(movie)
                    setShowModal(true)
                }}
            />
        </div>
    )
}

export default Thumbnail