import { useState } from "react";
import { supabase } from "../../utils/supabase";
import toast from "react-hot-toast";

const ProductCard = ({ product, onAddToWishlist, onAddToCart }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToWishlist = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("wishlist").insert([
        {
          user_id: (await supabase.auth.getUser()).data.user.id,
          product_id: product.id,
        },
      ]);

      if (error) throw error;
      onAddToWishlist(product);
      toast.success("Added to wishlist!", {
        duration: 2000,
        icon: "❤️",
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("cart").insert([
        {
          user_id: (await supabase.auth.getUser()).data.user.id,
          product_id: product.id,
          quantity: 1,
        },
      ]);

      if (error) throw error;
      onAddToCart(product);
      toast.success("Added to cart!", {
        duration: 2000,
        icon: "🛒",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-65 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-gray-500">{product.description}</p>
        <p className="mt-2 text-xl font-bold text-gray-900">${product.price}</p>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleAddToWishlist}
            disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
          >
            Add to Wishlist
          </button>
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
