import { useEffect, useState } from "react"
import { useAuth } from "../context/GlobalState"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../firebase"
import Order from "./Order"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const { user } = useAuth()
  useEffect(() => {
    if (user) {
      const collRef = collection(db, "users", user?.uid, "orders")
      const orderedRef = query(collRef, orderBy("created", "desc"))
      onSnapshot(orderedRef, (querySnapshot) => {
        setOrders(querySnapshot.docs.map((doc) => (
          {
            id: doc.id,
            data: doc.data()
          }
        )))
      })
    } else {
      setOrders([])
    }
  },[user])
  return (
      <div className="max-w-screen-2xl mx-auto px-9 pb-5">
      <h1 className="text-3xl font-bold my-6">Your Orders</h1>
        {
          orders?.map((order) => (
            <Order order={order} />
          ))
        }
      </div>
  )
}

export default Orders