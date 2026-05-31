const User_API = import.meta.env.VITE_USER_API
import axios from 'axios'
export const signUpUser = async (payload) => {
    try {

        const response = await axios.post(`${User_API}/register`, payload)
        // console.log('kkk', response)

        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const signinUser = async (payload) => {
    try {
        const response = await axios.post(`${User_API}/login`, payload)
        localStorage.setItem('token', response.data.accessToken)
        const user = await axios.get(`${User_API}/get-me`, {
            headers: {
                Authorization: `Bearer ${response.data.accessToken}`
            }
        })

        // console.log('user data', user.data)
        return user.data
    } catch (error) {
        console.log(error)
    }
}