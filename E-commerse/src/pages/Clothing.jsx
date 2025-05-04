import  ProductList  from "../components/Product/ProductList";

const Clothing = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Clothing</h1>
      <ProductList category="clothing" />
    </div>
  );
};

export default Clothing;
