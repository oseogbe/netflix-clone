import { db } from '@/firebase'
import { Subscription, SubscriptionPlan } from '@/typings'
import { addDoc, collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'

const getProducts = async (): Promise<SubscriptionPlan[]> => {
    const q = query(
        collection(db, 'products'),
        where('active', '==', true)
    )

    const productQuerySnapshot = await getDocs(q)
    const products: SubscriptionPlan[] = await Promise.all(
        productQuerySnapshot.docs.map(async (productDoc) => {
            const productData = productDoc.data() as SubscriptionPlan

            const pricesCollection = collection(productDoc.ref, 'prices')
            const priceQuerySnapshot = await getDocs(pricesCollection)

            // assume there is only one price per product
            const priceDoc = priceQuerySnapshot.docs[0]
            productData['priceId'] = priceDoc.id
            productData['priceInfo'] = priceDoc.data()
            return productData
        })
    )

    return products
}

const getSubscription = async (userId: string): Promise<Subscription | null> => {
    const q = query(
        collection(db, 'customers', userId, 'subscriptions'),
        where('status', 'in', ['trialing', 'active'])
    )

    const subscriptionSnapshot = await getDocs(q)

    if (!subscriptionSnapshot.empty) {
        // assuming user only has one active subscription max
        const subscription = subscriptionSnapshot.docs[0].data() as Subscription
        return subscription
    }

    return null
}

const loadCheckout = async (userId: string, priceId: string) => {
    let checkoutSessionData = {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin
    }

    const checkoutSessionRef = await addDoc(
        collection(db, `customers/${userId}/checkout_sessions`),
        checkoutSessionData
    )

    onSnapshot(checkoutSessionRef, (snap) => {
        const { error, url }: any = snap.data()
        if (error) {
            console.error(error)
        }
        if (url) {
            // redirect to payment link
            window.location.assign(url)
        }
    })
}

export {
    getProducts,
    getSubscription,
    loadCheckout,
}