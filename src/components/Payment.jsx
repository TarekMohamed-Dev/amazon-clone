import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/GlobalState"
import CurrencyFormat from "react-currency-format"
import { getBasketTotal } from "../context/AppReducer" // Import getBasketTotal function from AppReducer
import CheckoutProduct from "../components/Checkout/CheckoutProduct"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from 'react';
import axios from "./axios"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

/**
 * Payment component for handling payment process.
 */

const Payment = () => {
  const { user, basket, dispatch } = useAuth()// Destructure user, basket, and dispatch from useAuth hook
  const designVariant = 'payment' // Design variant from CheckoutProduct component to payment edit
  const [clientSecret, setClientSecret] = useState() // State for client secret
  const [error, setError] = useState(null) // State for error
  const [disabled, setDisabled] = useState(true) // State for disabled state of payment button
  const [succeeded, setSucceeded] = useState(false) // State for payment success
  const [processing, setProcessing] = useState("") // State for processing state of payment
  const stripe = useStripe() // Stripe instance
  const elements = useElements() // Elements instance
  const navigate = useNavigate()

  // Effect to fetch client secret for payment
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      })
      setClientSecret(response.data.clientSecret)
      return response
    }
    getClientSecret()
  }, [basket])

  // Handle submission of payment form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    // Confirm card payment with Stripe
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      // Add order details to Firestore
      const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id)
      setDoc(ref, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      })
      setSucceeded(true)
      setError(null)
      setProcessing(false)
      navigate("/orders", { replace: true }) // Redirect to orders page
      dispatch({
        type: "EMPTY_BASKET"
      })
    })

  }
  // Handle change in CardElement
  const handleChange = (e) => {
    setDisabled(e.empty)
    setError(error ? error.message : "")
  }
  return (
    <div className="bg-gray-100">
      {/* checkout */}
      <div className="flex justify-center py-5 text-lg md:text-xl font-bold">
        <p className="mr-1 text-yellow-600">Checkout :</p>
        <Link className="text-amazon_blue-light active:scale-95 active:transform active:text-orange-500" to={"/checkout"}>
          ( {basket.length} items )
        </Link>
      </div>

      {/* customer data */}
      <div className="">
        <div className="flex flex-col sm:flex-row  md:space-x-40 p-5 bg-white  border border-b-1">
          <h2 className="md:text-lg font-bold text-yellow-600 mb-2 sm-mb-0">Delivery Address</h2>
          <div>
            <p>{useAuth().user?.email}</p>
            <p>14 Street Mohamed cairo,Egypt</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row  md:space-x-40 p-5 bg-white  border border-b-1">
          <h2 className="md:text-lg font-bold text-yellow-600 mb-2 sm-mb-0">Review items and delivery</h2>
          <div className="">
            {basket.map((item, i) => (
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
                width={150}
                height={150}
                designVariant={designVariant}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row  md:space-x-40 p-5 bg-white  border border-b-1">
          <h2 className="md:text-lg font-bold text-yellow-600 mb-2 sm-mb-0">Payment Method</h2>
          <div className="flex flex-col flex-grow">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="mt-5">
                <strong>
                  Order Total: {" "}
                  <CurrencyFormat
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix="$"
                    decimalScale={2}
                    value={getBasketTotal(basket)} />
                </strong>
                <button disabled={processing || disabled || succeeded} type="submit" className="button ms-3 flex-grow px-6 py-2">
                  {processing ? (
                    <p className="text-yellow-600">Processing...</p>
                  ) : (
                    'Buy Now'
                  )}
                </button>

                <div>
                  {
                    error && (
                      <p className="text-red-500">
                        {error}
                      </p>
                    )
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment