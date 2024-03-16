import { FaStar } from "react-icons/fa";
import CurrencyFormat from 'react-currency-format';
import { useAuth } from "../context/GlobalState";
// eslint-disable-next-line react/prop-types
const Product = ({ id, title, price, description, category, image }) => {
    // Generate random rating and prime status
    const rating = Math.floor(Math.random() * 5) + 1; // Random rating between 1 and 5
    const hasPrime = Math.random() < 0.5; // Randomly determine prime status
    const { dispatch } = useAuth(); // Get dispatch function from useAuth hook
    // Function to add product to basket
    const addToBasket = () => {
        // Dispatch action to add item to basket
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
    return (
        <div className="relative flex flex-col m-5 bg-white dark:bg-[#000B18] z-30 p-10 text-black dark:text-white ">
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
            <img className="mx-auto" src={image} alt={title} height={200} width={200} />
            <h4 className="m-3">{title}</h4>

            <div className="flex">
                {Array(rating).fill().map((_, i) => (
                    <FaStar key={rating + i} className="h-5 text-yellow-500" />
                ))}
            </div>
            <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-5">
                <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <img className="w-12" src="/prime.png" />
                    <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                </div>
            )}
            <button className="mt-auto button" onClick={addToBasket}>Add to Basket</button>


        </div>
    )
}

export default Product