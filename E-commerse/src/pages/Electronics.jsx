import { ProductList } from "../components/Product/ProductList";

const Electronics = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Electronics</h1>
      <ProductList category="electronics" />
    </div>
  );
};

export default Electronics;
