"use client"

/* eslint-disable @next/next/no-img-element */
import useAuth from '@/hooks/useAuth';
// import { Metadata } from 'next'
import Head from 'next/head';
import Image from 'next/image'
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// export const metadata: Metadata = {
//     title: 'Login | Netflixx',
// }

interface Inputs {
    email: string
    password: string
}

const Login = () => {
    const [login, setLogin] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
    const { signIn, signUp } = useAuth()

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        if (login) {
            await signIn(email, password)
        } else {
            await signUp(email, password)
        }
    }

    return (
        <div className='relative flex flex-col w-screen h-screen bg-black md:items-center md:justify-center md:bg-transparent'>
            <Image
                src='https://rb.gy/p2hphi'
                alt='Netflix clone'
                layout='fill'
                className='-z-10 !hidden opacity-60 sm:!inline'
                objectFit='cover'
            />
            <img
                src="https://rb.gy/ulxxee"
                width={150}
                height={150}
                className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
                alt="netflixx logo"
            />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative mt-24 space-y-8 rounded bg-black/75 px-6 py-10 md:mt-0 md:max-w-md md:px-14"
            >
                <h1 className="text-4xl font-semibold">Sign In</h1>
                <div className="space-y-4">
                    {/* <div className="inline-block">
                        <Input
                            label="Email"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            value={email}
                        />
                        {errors.email && (<p className="p-1 text-[13px] font-light text-red-500">Please enter a valid email</p>)}
                    </div> */}
                    <label className="inline-block">
                        <input type="email" placeholder="Email" className="input" {...register('email', { required: true })} />
                        {errors.email && (<p className="p-1 text-[13px] font-light text-red-500">Please enter a valid email</p>)}
                    </label>
                    <label className="inline-block">
                        <input type="password" placeholder="Password" className="input" {...register('password', { required: true })} />
                        {errors.password && (<p className="p-1 text-[13px] font-light text-red-500">Please enter a valid password</p>)}
                    </label>
                </div>

                <button className="w-full rounded bg-[#e50914] py-3 font-semibold" onClick={() => setLogin(true)}>Sign In</button>

                <div className="text-[gray]">
                    New to Netlfix?{' '}
                    <button className="text-white hover:underline" onClick={() => setLogin(false)}>Sign up now</button>
                </div>
            </form>
        </div>
    )
}

export default Login