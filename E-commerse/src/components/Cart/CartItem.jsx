import { useState } from "react";
import { supabase } from "../../utils/supabase";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("cart")
        .update({ quantity: newQuantity })
        .eq("user_id", (await supabase.auth.getUser()).data.user.id)
        .eq("product_id", item.product_id);

      if (error) throw error;
      onQuantityChange(item.product_id, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", (await supabase.auth.getUser()).data.user.id)
        .eq("product_id", item.product_id);

      if (error) throw error;
      onRemove(item.product_id);
    } catch (error) {
      console.error("Error removing item:", error);
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
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={loading || item.quantity <= 1}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            -
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={loading}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            +
          </button>
        </div>
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

export default CartItem;
