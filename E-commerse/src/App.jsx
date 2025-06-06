import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import Header from "./layouts/Header";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import ProductList from "./components/Product/ProductList";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Electronics from "./pages/Electronics";
import Clothing from "./pages/Clothing";
import PaymentOptions from "./pages/PaymentOptions";
import PaymentSuccess from "./pages/PaymentSuccess";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-right" />
        <Header />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/electronics" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/electronics"
              element={user ? <Electronics /> : <Navigate to="/login" />}
            />
            <Route
              path="/clothing"
              element={user ? <Clothing /> : <Navigate to="/login" />}
            />
            <Route
              path="/cart"
              element={user ? <Cart /> : <Navigate to="/login" />}
            />
            <Route
              path="/wishlist"
              element={user ? <Wishlist /> : <Navigate to="/login" />}
            />
            <Route
              path="/payment-options"
              element={user ? <PaymentOptions /> : <Navigate to="/login" />}
            />
            <Route
              path="/payment-success"
              element={user ? <PaymentSuccess /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
