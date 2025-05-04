import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import CartItem from "../components/Cart/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("cart")
        .select(
          `
          *,
          products:product_id (*)
        `
        )
        .eq("user_id", user.id);

      if (error) throw error;

      const formattedItems = data.map((item) => ({
        ...item.products,
        quantity: item.quantity,
        product_id: item.product_id,
      }));

      setCartItems(formattedItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((items) =>
      items.filter((item) => item.product_id !== productId)
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    const total = calculateTotal();
    navigate("/payment-options", {
      state: { totalAmount: total },
    });
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.product_id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
          <div className="mt-8 border-t pt-8">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-900">
                Total:
              </span>
              <span className="text-2xl font-bold text-gray-900">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <button
              className="mt-4 w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              onClick={handleCheckout}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
