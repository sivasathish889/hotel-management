import { Email, Lock, Phone, UserPlus } from '@deemlol/next-icons'
import axios from 'axios'
import React from 'react'

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post("/api/auth/register", {
      data: {
        username: e.target[0].value,
        email: e.target[1].value,
        phone: e.target[2].value,
        password: e.target[3].value,
        passwordConfirm: e.target[4].value,
      },
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <section className="relative py-20 2xl:py-40 bg-gray-800 overflow-hidden">
        <img className="hidden lg:block absolute inset-0 mt-32" src="zospace-assets/lines/line-mountain.svg" alt="" />
        <img className="hidden lg:block absolute inset-y-0 right-0 -mr-40 -mt-32" src="zospace-assets/lines/line-right-long.svg" alt="" />
        <div className="relative container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                <div className="max-w-md">
                  <span className="text-lg text-blue-400 font-bold">Register Account</span>
                  <h2 className="mt-8 mb-12 text-5xl font-bold font-heading text-white">Start your journey by creating an account.</h2>

                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <div className="px-6 lg:px-20 py-12 lg:py-24 bg-gray-600 rounded-lg">
                  <form onSubmit={() => handleSubmit()}>
                    <h3 className="mb-10 text-2xl text-white font-bold font-heading">Register Account</h3>
                    <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                      <span className="inline-block pr-3 py-2 border-r border-gray-50">
                        <UserPlus size={24} color="black" />
                      </span>
                      <input className="w-full pl-4 pr-6 py-4 font-bold  rounded-r-full focus:outline-none" type="text" placeholder="User Name" />
                    </div>
                    <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                      <span className="inline-block pr-3 py-2 border-r border-gray-50">
                        <Email size={24} color="black" />
                      </span>
                      <input className="w-full pl-4 pr-6 py-4 font-bold  rounded-r-full focus:outline-none" type="email" placeholder="example@gmail.com" />
                    </div>
                    <div className="flex items-center pl-6 mb-6 bg-white rounded-full">
                      <span className="inline-block pr-3 py-2 border-r border-gray-50">
                        <Phone size={24} color="black" />
                      </span>
                      <input className="w-full pl-4 pr-6 py-4 font-bold  rounded-r-full focus:outline-none" type="number" placeholder="Phone Number" />
                    </div>
                    <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                      <span className="inline-block pr-3 py-2 border-r border-gray-50">
                        <Lock size={24} color="black" />
                      </span>
                      <input className="w-full pl-4 pr-6 py-4 font-bold  rounded-r-full focus:outline-none" type="password" placeholder="Password" />
                    </div>
                    <div className="flex items-center pl-6 mb-6 bg-white rounded-full">
                      <span className="inline-block pr-3 py-2 border-r border-gray-50">
                        <Lock size={24} color="black" />
                      </span>
                      <input className="w-full pl-4 pr-6 py-4 font-bold  rounded-r-full focus:outline-none" type="password" placeholder="Repeat password" />
                    </div>
                    <button className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200">Get started</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register