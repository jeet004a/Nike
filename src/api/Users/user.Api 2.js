import axios from 'axios'

const User_API = import.meta.env.VITE_USER_API

export const signUpUser = async (payload) => {
    try {
        const response = await axios.post(`${User_API}/register`, payload)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
