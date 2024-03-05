import CurrencyFormat from "react-currency-format"
import { FaStar } from "react-icons/fa"
import { useAuth } from "../context/GlobalState";

// eslint-disable-next-line react/prop-types
const CheckoutProduct = ({ id, title, price, rating, description, category, image, hasPrime }) => {
    const { dispatch } = useAuth();
    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                price: price,
                description: description,
                category: category,
                image: image,
                rating: rating,
                hasPrime: "/prime.png",
            }
        })
    }
    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
    })
    }
    return (
        <div className="grid grid-cols-5">
            <img width={200} height={200} src={image} alt={title} />

            {/* middle section */}
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_, i) => (
                        <FaStar key={i} className="h-5 text-yellow-500" />
                    ))}
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} fixedDecimalScale={true} decimalScale={2} />
                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img className="w-12" src={hasPrime} />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
            {/* Right Add/Remove btn */}
        <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button className="button" onClick={addToBasket}>Add to Basket</button>
            <button className="button" onClick={removeFromBasket}>Remove From Basket</button>
            </div>


        </div>
    )
}

export default CheckoutProduct