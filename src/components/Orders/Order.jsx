/* eslint-disable react/prop-types */
import moment from "moment"// Import moment for date formatting
import CheckoutProduct from "../Checkout/CheckoutProduct"
import CurrencyFormat from "react-currency-format" // Import CurrencyFormat for formatting currency

const Order = ({ order }) => {
    const designVariant = 'order'
    return (
        <div className="bg-white shadow-lg p-5 my-1">
            <p className="text-xl font-bold">Order</p>
            {/* Order creation date */}
            <p className="text-sm text-gray-600">{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            {/* Order ID */}
            <p className="text-right text-sm text-gray-600"><small>{order.id}</small></p>
            {order.data.basket?.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <div className="bg-white rounded-lg ">
                    <CheckoutProduct
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        rating={item.rating}
                        image={item.image}
                        description={item.description}
                        category={item.category}
                        hasPrime={item.hasPrime}
                        width={200}
                        height={200}
                        designVariant={designVariant}
                    />
                </div>
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        {/* Display formatted order total */}
                        <h3 className="text-right font-bold">Order Total: {value}</h3>
                    </>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType="text"
                thousandSeparator={true}
                prefix="$"
            />
        </div>
    )
}

export default Order