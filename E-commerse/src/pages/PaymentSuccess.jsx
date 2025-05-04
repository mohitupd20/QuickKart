import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentDetails = location.state || {};

  useEffect(() => {
    if (!paymentDetails.orderId) {
      navigate("/cart");
    }
  }, [paymentDetails, navigate]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Payment Successful!
      </h2>

      <div className="space-y-2 mb-6 text-left">
        <p className="text-gray-600">
          <span className="font-medium">Order ID:</span>{" "}
          {paymentDetails.orderId}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Amount Paid:</span> $
          {paymentDetails.amount}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Payment Method:</span>{" "}
          {paymentDetails.method?.toUpperCase()}
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="w-full py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;
