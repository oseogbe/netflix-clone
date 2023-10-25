import Link from "next/link"
import { BellIcon, MagnifyingGlassIcon, WifiIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

/* eslint-disable @next/next/no-img-element */

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const { logout } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <header className={`${isScrolled && "bg-[#141414]"} lg:px-16`}>
            <div className="flex items-center space-x-2 md:space-x-10">
                <img
                    src="https://rb.gy/ulxxee"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                    alt="netflixx logo"
                />

                <ul className="hidden space-x-4 md:flex">
                    <li className="header-link">Home</li>
                    <li className="header-link">TV Shows</li>
                    <li className="header-link">Movies</li>
                    <li className="header-link">New & Popular</li>
                    <li className="header-link">My List</li>
                </ul>
            </div>
            <div className="flex items-center space-x-4 text-sm font-light">
                <MagnifyingGlassIcon className="hidden sm:inline h-6 w-6" />
                <p className="hidden lg:inline">Kids</p>
                <BellIcon className="h-6 w-6" />
                {/* <Link href="/account"> */}
                <img src="https://rb.gy/g1pwyx" onClick={logout} alt="" className="cursor-pointer rounded" />
                {/* </Link> */}
            </div>
        </header>
    )
}

export default Header