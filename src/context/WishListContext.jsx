import { useContext } from "react";
import { createContext, useState, useEffect } from "react";

const WishListContext = createContext()

export const WishListProvider = ({ children }) => {
    const [wishListItems, setWishlistItems] = useState([])


    const addToWishList = (product) => {
        product.count = product.count ? product.count + 1 : 1

        // setCartItems((prev) => [...prev, product])
        setWishlistItems((prev) => {

            const existingProduct = prev.find(
                (item) =>
                    item._id === product._id &&
                    item.selectSize === product.selectSize
            );

            // If same product + same size exists
            if (existingProduct) {

                return prev.map((item) =>
                    item._id === product._id &&
                        item.selectSize === product.selectSize
                        ? {
                            ...item,
                            count: item.count + 1
                        }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    count: 1
                }
            ];
        });



    }

    const removeFromWishList = (id) => {
        console.log(id)
        setWishlistItems((prev) => prev.filter((item) => item._id != id))
    }

    const clearWishList = () => {
        setWishlistItems([])
    }

    return (
        <WishListContext.Provider value={{
            wishListItems, setWishlistItems, addToWishList, removeFromWishList, clearWishList
        }}>
            {children}
        </WishListContext.Provider>
    )
}


export const useWishList = () => {
    return useContext(WishListContext)
}
