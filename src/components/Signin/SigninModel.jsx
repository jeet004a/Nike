import { IoClose, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import React, { useState } from 'react'
import { signinUser, signUpUser } from '../../api/Users/user.Api.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
const SigninModel = ({ onClose }) => {
    const { user, setUser } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Basic validation
        if (!form.email || !form.password) {
            setError('Please fill in all fields.')
            return
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters.')
            return
        }

        const payload = {
            email: form.email,
            password: form.password,
        }

        console.log('Sign Up Payload:', payload)

        try {
            setLoading(true)
            const data = await signinUser(payload)
            // console.log('User record', data)
            setUser(data.user)
            setSuccess(true)

        } catch (err) {
            setError(err?.response?.data?.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // console.log('kkk user', user)

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Modal Panel */}
            <div
                className="relative bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl p-8 animate-[fadeSlideUp_0.25s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <IoClose className="text-xl text-gray-600" />
                </button>

                {/* Nike Logo */}
                <div className="flex justify-center ml-37 mb-5  w-[6vw] object-cover ">
                    {/* <svg viewBox="0 0 128 46" className="h-8 fill-black">
                        <path d="M15.749 43.356 52.882 2.644C55.92-.619 60.116-1.058 62.58.688L127.9 44.85c.694.463.1 1.148-.694.925L5.09 12.21C1.49 11.11-.553 7.664.133 4.735c.74-3.14 4.74-4.78 9.31-3.232l6.306 41.853z" />
                    </svg> */}
                    <img src="https://prod-assets.nike.in/NIKE/nes-nike-reloaded-svc/static/assets/images/nike-logo-192x192.svg" alt="" />
                </div>

                {success ? (
                    <div className="text-center py-6">
                        <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-black mb-1">Welcome to Nike!</h2>
                        <p className="text-sm text-gray-500 mb-6">Your account has been created successfully.</p>
                        <button
                            onClick={onClose}
                            className="w-full bg-black text-white py-3 rounded-full text-sm font-medium tracking-wide hover:bg-gray-900 transition-colors"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-black text-center tracking-tight mb-1">
                            Log in to your account
                        </h2>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            Get personalised picks & faster checkout
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                            {/* First & Last Name */}
                            {/* <div className="flex gap-3">
                                <div className="flex-1">
                                    <input
                                        id="signup-firstname"
                                        name="firstname"
                                        type="text"
                                        placeholder="First Name"
                                        value={form.firstname}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-black placeholder-gray-400
                                            focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        id="signup-lastname"
                                        name="lastname"
                                        type="text"
                                        placeholder="Last Name"
                                        value={form.lastname}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-black placeholder-gray-400
                                            focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>
                            </div> */}

                            {/* Email */}
                            <input
                                id="signup-email"
                                name="email"
                                type="email"
                                placeholder="Email address"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-black placeholder-gray-400
                                    focus:outline-none focus:border-black transition-colors"
                            />

                            {/* Password */}
                            <div className="relative">
                                <input
                                    id="signup-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-11 text-sm text-black placeholder-gray-400
                                        focus:outline-none focus:border-black transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(p => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                >
                                    {showPassword
                                        ? <IoEyeOffOutline className="text-lg" />
                                        : <IoEyeOutline className="text-lg" />}
                                </button>
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="text-xs text-red-500 -mt-1">{error}</p>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-3 rounded-full text-sm font-medium tracking-wide
                                    hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1 flex items-center justify-center gap-2"
                            >
                                {loading && (
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                )}
                                {loading ? 'Creating Account…' : 'Sign IN'}
                            </button>
                        </form>

                        <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed">
                            By entering this site, you agree to the{' '}
                            <span className="underline cursor-pointer hover:text-black transition-colors">Privacy Policy</span>
                            {' '}and{' '}
                            <span className="underline cursor-pointer hover:text-black transition-colors">Terms of Use</span>.
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}


export default SigninModel

