import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6f6]">
      
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-[400px]">


        {/* TITLE */}
        <h2 className="text-3xl font-bold text-green-600 mb-5">
          Payment Successful
        </h2>

        {/* MESSAGE */}
        <p className="text-gray-600 mb-6">
          Your booking has been confirmed successfully.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/my-bookings")}
            className="px-4 py-2 bg-[#8B0000] text-white rounded"
          >
            View Bookings
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Home
          </button>
        </div>

      </div>
    </div>
  );
}

export default PaymentSuccess;