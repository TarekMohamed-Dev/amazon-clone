import CurrencyFormat from "react-currency-format"
import { useAuth } from "../../context/GlobalState"
import CheckoutProduct from "./CheckoutProduct"
import { getBasketTotal } from "../../context/AppReducer"
import { useNavigate } from "react-router-dom"
import Header from "../Header"
import { useState } from "react"


const Checkout = () => {
    const { user, basket } = useAuth()
    const navigate = useNavigate()
    const [darkMode, setDarkMode] = useState(false)

    return (
        <>
            <Header dar={(dark) => setDarkMode(dark)} />
            <div className={`bg-gray-100  ${darkMode && 'dark'}`}>
                <main className="lg:flex dark:bg-[#00172D]">
                    {/* left */}
                    <div className="flex-grow m-5 shadow-sm">
                        <img src="./Prime-day-banner.webp" width={1020} height={250} className="object-contain" />

                        <div className="flex flex-col p-5 space-y-10 bg-white dark:bg-[#000B18] text-black dark:text-white">
                            <h2 className="text-2xl">Hello, {user ? `${user.email.split("@")[0]}` : "Sign In"}</h2>
                            <h1 className="text-3xl border-b pb-4">{basket.length === 0 ? "Your Amazon Basket is empty." : "Shopping Basket"}</h1>
                            {
                                basket.map((item, i) => (
                                    <CheckoutProduct
                                        key={i}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        rating={item.rating}
                                        image={item.image}
                                        description={item.description}
                                        category={item.category}
                                        hasPrime={item.hasPrime}
                                        width={item.width}
                                        height={item.height}
                                    />
                                ))
                            }
                        </div>

                    </div>

                    {/* right */}
                    <div className="flex flex-col bg-white dark:bg-[#00172D] text-black dark:text-white p-10 shadow-md rounded-md ">
                        {
                            basket.length > 0 && (
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h2 className="whitespace-nowrap">
                                                Subtotal ({basket.length} items): <strong>{value}</strong>
                                            </h2>
                                            <button
                                                onClick={() => navigate("/payment")}
                                                disabled={!user}
                                                className={`button mt-2 lg:w-max ${!user && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}
                                            >
                                                {!user ? "Sign in to checkout" : "Proceed to checkout"}
                                            </button>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix="$"
                                />

                            )
                        }
                    </div>


                </main>
            </div>
        </>
    )
}
export default Checkout