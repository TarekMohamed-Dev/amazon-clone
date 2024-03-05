import Header from "./components/Header";
import Banner from "./components/Banner";
import ProductFeed from "./components/ProductFeed";
import Checkout from "./components/Checkout";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { useEffect } from "react";
import { useAuth } from "./context/GlobalState";
import { auth } from "./firebase";
import Payment from "./components/Payment";
import Orders from "./components/Orders";

const App = () => {
  const { dispatch } = useAuth();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: "SET_USER", user: authUser });
      } else {
        dispatch({ type: "SET_USER", user: null });
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <div>
            <Header />
            <div className="max-w-screen-2xl mx-auto">
              <Banner />
              <ProductFeed />
            </div>

          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={
          <>
            <Header />
            <div className="max-w-screen-2xl mx-auto">
              <Orders />
            </div>
          </>} />
        <Route path="/checkout" element={
          <>
            <Header />
            <div className="max-w-screen-2xl mx-auto">
              <Checkout />
            </div>
          </>} />
        <Route path="/payment" element={
          <>
            <Header />
            <Payment />
          </>
        } />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;



