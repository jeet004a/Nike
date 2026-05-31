const Product_API = import.meta.env.VITE_PRODUCT_API;
import axios from 'axios'
export const getAllProducts = async () => {
    try {
        const products = await axios.get(`${Product_API}/all`)

        return products.data


    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (id) => {
    try {
        const products = await axios.get(`${Product_API}/${id}`)

        return products.data


    } catch (error) {
        console.log(error)
    }
}