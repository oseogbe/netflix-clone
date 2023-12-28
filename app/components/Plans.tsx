import { db } from "@/firebase"
import useAuth from "@/hooks/useAuth"
import { CheckIcon } from "@heroicons/react/20/solid"
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Table from "./Table"
import Loader from "./Loader"
import { loadCheckout } from "../lib/stripe"

export const metadata: Metadata = {
    title: 'Netflixx',
    icons: [{ rel: 'icon', url: 'netflixx-icon.png' }],
}

const Plans = () => {
    const [plans, setPlans] = useState<DocumentData[]>([])
    const [selectedPlan, setSelectedPlan] = useState<DocumentData>([])
    const [isBillingLoading, setBillingLoading] = useState(false)

    const { user, logout } = useAuth()

    useEffect(() => {
        // create a query object for active products (plans)
        const q = query(
            collection(db, 'products'),
            where('active', '==', true)
        )

        getDocs(q).then(productQuerySnapshot => {
            // for each product, get the product price info
            const promises = productQuerySnapshot.docs.map((productDoc) => {
                let productInfo = productDoc.data()

                // fetch prices subcollection per product
                const pricesCollection = collection(productDoc.ref, 'prices')

                return getDocs(pricesCollection).then(priceQuerySnapshot => {
                    // assume there is only one price per product
                    const priceDoc = priceQuerySnapshot.docs[0]
                    productInfo['priceId'] = priceDoc.id
                    productInfo['priceInfo'] = priceDoc.data()
                    return productInfo
                })
            })

            Promise.all(promises).then(fetchedProducts => {
                setPlans(fetchedProducts)
                setSelectedPlan(fetchedProducts[2])
            })
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const subscribeToPlan = () => {
        if (!user) return

        loadCheckout(selectedPlan?.priceId!)
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

                    {<Table plans={plans} selectedPlan={selectedPlan} />}

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