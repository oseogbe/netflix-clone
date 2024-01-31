import { useEffect, useState } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import useAuth from "@/hooks/useAuth"
import { CheckIcon } from "@heroicons/react/20/solid"
import { getProducts, loadCheckout } from "../lib/stripe"
import { SubscriptionPlan } from "@/typings"
import Table from "./Table"
import Loader from "./Loader"

export const metadata: Metadata = {
    title: 'Netflixx',
    icons: [{ rel: 'icon', url: 'netflixx-icon.png' }],
}

const Plans = () => {
    const [plans, setPlans] = useState<SubscriptionPlan[]>([])
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)
    const [isBillingLoading, setBillingLoading] = useState(false)

    const { user, logout } = useAuth()

    useEffect(() => {
        getProducts().then(products => {
            setPlans(products)
            setSelectedPlan(products[2])
        })
    }, [])

    const subscribeToPlan = () => {
        if (!user) return

        loadCheckout(user.uid, selectedPlan?.priceId!)
        setBillingLoading(true)
    }

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

            <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
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
                        {
                            plans?.map(plan => (
                                <div
                                    key={plan.name}
                                    className={`planBox ${selectedPlan?.name == plan.name ? 'opacity-100' : 'opacity-60'}`}
                                    onClick={() => setSelectedPlan(plan)}
                                >
                                    {plan.name}
                                </div>
                            ))
                        }
                    </div>

                    {selectedPlan && <Table plans={plans} selectedPlan={selectedPlan} />}

                    <button
                        disabled={!selectedPlan || isBillingLoading}
                        className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${isBillingLoading && 'opacity-60'
                            }`}
                        onClick={subscribeToPlan}
                    >
                        {isBillingLoading ? (
                            <Loader color="dark:fill-gray-300" />
                        ) : (
                            'Subscribe'
                        )}
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Plans