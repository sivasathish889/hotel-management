"use client"
import { Lock, UserPlus } from '@deemlol/next-icons'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('api/auth/login', {
      email: e.target[0].value,
      password: e.target[1].value
    })
      .then((res) => {
        if (res.data.success) {
          navigate.push('/')
          localStorage.setItem('username', res.data.user.username)
          localStorage.setItem('user', true)
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            pauseOnHover: true,
            theme: "light",
          });
        }
        else {
          toast.warning(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            pauseOnHover: true,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        toast.warning(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          pauseOnHover: true,
          theme: "light",
        });
      })
  }
  return (
    <section className="relative py-20 2xl:py-40 bg-gray-800 overflow-hidden w-full h-full">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">

            <div className="w-full lg:w-1/2 px-4">
              <div className="px-6 lg:px-20 py-12 lg:py-24 bg-gray-600 rounded-lg">
                <form onSubmit={handleSubmit}>
                  <h3 className="mb-10 text-2xl text-white font-bold font-heading">Login Account</h3>
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                      <UserPlus size={24} color="black" />
                    </span>
                    <input name='username' className="w-full pl-4 pr-6 py-4 font-bold  rounded-r-full focus:outline-none" type="email" placeholder="example@gmail.com" />
                  </div>
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                      <Lock size={24} color="black" />
                    </span>
                    <input name='password' className="w-full pl-4 pr-6 py-4 font-bold  rounded-r-full focus:outline-none" type="password" placeholder="Password" />
                  </div>

                  <button className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200">Login</button>
                </form>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="max-w-md">
                <span className="text-lg text-blue-400 font-bold">Login Account</span>
                <h2 className="mt-8 mb-12 text-5xl font-bold font-heading text-white">Start your journey by creating an account.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login