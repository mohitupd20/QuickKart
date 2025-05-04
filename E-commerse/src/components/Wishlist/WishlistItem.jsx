import { useState } from "react";
import { supabase } from "../../utils/supabase";

const WishlistItem = ({ item, onRemove, onMoveToCart }) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", (await supabase.auth.getUser()).data.user.id)
        .eq("product_id", item.product_id);

      if (error) throw error;
      onRemove(item.product_id);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveToCart = async () => {
    setLoading(true);
    try {
      // Add to cart
      const { error: cartError } = await supabase.from("cart").insert([
        {
          user_id: (await supabase.auth.getUser()).data.user.id,
          product_id: item.product_id,
          quantity: 1,
        },
      ]);

      if (cartError) throw cartError;

      // Remove from wishlist
      const { error: wishlistError } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", (await supabase.auth.getUser()).data.user.id)
        .eq("product_id", item.product_id);

      if (wishlistError) throw wishlistError;

      onMoveToCart(item.product_id);
    } catch (error) {
      console.error("Error moving item to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleMoveToCart}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Move to Cart
        </button>
        <button
          onClick={handleRemove}
          disabled={loading}
          className="text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
