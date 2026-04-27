import API from "./api";
import { useNavigate } from "react-router-dom";

export const handlePayment = async ({
  amount,
  bookingData,
  navigate,
  onSuccess,
  onError,
}) => {
  try {
    const { data } = await API.post("/payment/create-order", {
      amount,
    });

    const options = {
      key: "rzp_test_Shr5btwkY8GoxK",
      amount: data.amount,
      currency: "INR",
      order_id: data.id,

      method: {
        card: true,
        upi: false,
        netbanking: false,
        wallet: false
      },

      handler: async function (response) {
        try {
          const { data } = await API.post("/payment/verify", response);
          console.log(data)
          if (data.message == "Success") {
            await API.post("/booking/book", bookingData);
            navigate("/payment-success");
          } else {
            navigate("/payment-failed");
          }

        } catch (err) {
          navigate("/payment-failed");
        }
      },

      theme: {
        color: "#8B0000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    onError && onError("Payment failed");
  }
};