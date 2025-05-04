import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import ProductCard from "./ProductCard";

const ProductList = ({ category: propCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category: routeCategory } = useParams();

  // Use prop category if provided, otherwise use route category
  const category = propCategory || routeCategory;

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      let query = supabase.from("products").select("*");

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query;
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = (product) => {
    // Optionally show a success message
    console.log("Added to wishlist:", product.name);
  };

  const handleAddToCart = (product) => {
    // Optionally show a success message
    console.log("Added to cart:", product.name);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">Loading products...</div>
      </div>
    );
  }

  return (
    <div>
      {category && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
          {category}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToWishlist={handleAddToWishlist}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-gray-500 text-center">
          {category
            ? `No products found in ${category} category.`
            : "No products found."}
        </p>
      )}
    </div>
  );
};

export default ProductList;
