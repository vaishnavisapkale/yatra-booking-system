import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { ResultCard, Button } from "../components/ui";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <ResultCard
      icon={CheckCircle2}
      iconClassName="text-green-600"
      title="Payment Successful"
      titleClassName="text-green-700"
      message="Your booking has been confirmed successfully."
      actions={
        <>
          <Button onClick={() => navigate("/my-bookings")}>View Bookings</Button>
          <Button variant="secondary" onClick={() => navigate("/dashboard")}>
            Home
          </Button>
        </>
      }
    />
  );
}

export default PaymentSuccess;
