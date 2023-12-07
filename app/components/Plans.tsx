import useAuth from "@/hooks/useAuth"
import { CheckIcon } from "@heroicons/react/20/solid"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Netflixx',
    icons: [{ rel: 'icon', url: 'netflixx-icon.png' }],
}

const Plans = () => {
    const { logout } = useAuth()

    return (
        <div>
            <header>
                <Link href="/">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt="netflixx logo"
                        width={150}
                        height={90}
                        className="cursor-pointer object-contain"
                    />
                </Link>

                <button className="text-lg font-medium hover:underline" onClick={logout}>Sign Out</button>
            </header>

            <main className="max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
                <h1 className="mb-3 text-3xl font-medium">Choose the plan that&apos;s right for you</h1>
                <ul>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="w-7 h-7 text-[#E50914]" /> Watch all you want. Ad-free.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="w-7 h-7 text-[#E50914]" /> Recommendations just for you.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="w-7 h-7 text-[#E50914]" /> Change or cancel your plan anytime.
                    </li>
                </ul>

                <div className="mt-4 flex flex-col space-y-4">
                    <div className="flex w-full items-center justify-end self-end md:w-3/5">
                        <div className="planBox">
                            standard
                        </div>
                        <div className="planBox">
                            standard
                        </div>
                        <div className="planBox">
                            standard
                        </div>
                    </div>

                    {/* <Table /> */}

                    <button>Subscribe</button>
                </div>
            </main>
        </div>
    )
}

export default Plans