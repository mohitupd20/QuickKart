import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!selectedOption) return;

    setLoading(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    // Navigate to success page with payment details
    navigate("/payment-success", {
      state: {
        amount: totalAmount,
        method: selectedOption,
        orderId: "ORD" + Date.now(),
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Select Payment Method
      </h2>
      <div className="mb-6">
        <p className="text-lg font-medium text-gray-700 mb-2">
          Amount to Pay: ${totalAmount}
        </p>
      </div>
      <form onSubmit={handlePayment} className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              onChange={(e) => setSelectedOption(e.target.value)}
              className="h-4 w-4 text-indigo-600"
            />
            <span className="ml-3 font-medium text-gray-900">UPI</span>
          </label>

          <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="netbanking"
              onChange={(e) => setSelectedOption(e.target.value)}
              className="h-4 w-4 text-indigo-600"
            />
            <span className="ml-3 font-medium text-gray-900">Net Banking</span>
          </label>

          <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              onChange={(e) => setSelectedOption(e.target.value)}
              className="h-4 w-4 text-indigo-600"
            />
            <span className="ml-3 font-medium text-gray-900">
              Credit/Debit Card
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!selectedOption || loading}
          className="w-full py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Processing..." : "Proceed to Pay"}
        </button>
      </form>
    </div>
  );
};

export default PaymentOptions;
