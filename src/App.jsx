import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './context/GlobalState'; // Import useAuth hook from GlobalState context
import { auth } from './firebase'; // Import auth from firebase config
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout/Checkout';
import Payment from './components/Payment';
import Orders from './components/Orders/Orders';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';

// Load Stripe with the given public key
const stripePromise = loadStripe('pk_test_51Or9bDFPsg0JfYZla6Pov5tlHLVfkOLdADlK8o2L3clD730Ynabq3uGT8hWop9f2TV3Ob1DYnRKe2g9It38lMwSU00GwwGAqS9');

/**
 * App component for routing and authentication management.
 */
const App = () => {
  const { dispatch } = useAuth(); // Destructure dispatch from useAuth hook

  // Effect hook to set user based on authentication state
  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // If user is authenticated, set user in the context
      if (authUser) {
        dispatch({ type: 'SET_USER', user: authUser });
      } else {
        // If user is not authenticated, set user to null in the context
        dispatch({ type: 'SET_USER', user: null });
      }
    });

    // Clean up function to unsubscribe from auth listener
    return unsubscribe;
  }, [dispatch]); // Dependency array: run effect only once on component mount

  return (
    <div>
      {/* Define routes using Routes and Route components */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/Signup" element={<Signup />} /> {/* Signup route */}
        <Route path="/Signin" element={<Signin />} /> {/* Signin route */}
        <Route path="/orders" element={
          <>
            {/* Render Header and Orders components */}
            <Header />
            <div className="max-w-screen-2xl mx-auto">
              <Orders />
            </div>
          </>
        } />
        <Route path="/checkout" element={<Checkout />} /> {/* Checkout route */}
        <Route path="/payment" element={
          <>
            {/* Render Header and Payment components with Stripe Elements */}
            <Header />
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </>
        } />
        <Route path="*" element={<h1>Page Not Found</h1>} /> {/* Default route for Page Not Found */}
      </Routes>
    </div>
  );
};

export default App;
