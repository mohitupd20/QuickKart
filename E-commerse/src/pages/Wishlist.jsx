import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import WishlistItem from "../components/Wishlist/WishlistItem";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("wishlist")
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
        product_id: item.product_id,
      }));

      setWishlistItems(formattedItems);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = (productId) => {
    setWishlistItems((items) =>
      items.filter((item) => item.product_id !== productId)
    );
  };

  const handleMoveToCart = (productId) => {
    handleRemoveItem(productId);
    navigate("/cart");
  };

  if (loading) {
    return <div>Loading wishlist...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your wishlist is empty</p>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <WishlistItem
              key={item.product_id}
              item={item}
              onRemove={handleRemoveItem}
              onMoveToCart={handleMoveToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
