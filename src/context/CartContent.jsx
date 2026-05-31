import { useContext } from "react";
import { createContext, useState, useEffect } from "react";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [bagTotal, setBagTotal] = useState(0)
    const [discountMRP, setDiscountMRP] = useState(0)
    const [Totalamount, setTotalAmount] = useState(0)
    const [discountFlag, setDiscountFlag] = useState(false)

    const addToCart = (product) => {
        product.count = product.count ? product.count + 1 : 1

        // setCartItems((prev) => [...prev, product])
        setCartItems((prev) => {

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

            // New product
            return [
                ...prev,
                {
                    ...product,
                    count: 1
                }
            ];
        });

        // const total = cartItems.reduce(
        //     (acc, item) => acc + (item.price * item.count),
        //     0
        // );
        // setBagTotal(total);


    }

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id != id))
    }

    const clearCart = () => {
        setCartItems([])
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            bagTotal,
            setBagTotal,
            discountMRP,
            setDiscountMRP,
            addToCart,
            removeFromCart,
            clearCart,
            setCartItems,
            Totalamount, setTotalAmount, discountFlag, setDiscountFlag
        }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => {
    return useContext(CartContext)
}
