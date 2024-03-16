import { useEffect, useState } from "react";
import { useAuth } from "../../context/GlobalState";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import Order from "./Order";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const collRef = collection(db, "users", user?.uid, "orders");
        const orderedRef = query(collRef, orderBy("created", "desc"));
        const unsubscribe = onSnapshot(orderedRef, (querySnapshot) => {
          setOrders(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data()
            }))
          );
        });

        return unsubscribe; // Cleanup function
      } else {
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="max-w-screen-2xl mx-auto px-9 pb-5">
      <h1 className="text-3xl font-bold my-6">Your Orders</h1>
      {user ? (
        orders.map((order) => <Order key={order.id} order={order} />)
      ) : (
        <p>Please sign in to view your orders.</p>
      )}
    </div>
  );
};

export default Orders;
