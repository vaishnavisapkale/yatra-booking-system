import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { ResultCard, Button } from "../components/ui";

function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <ResultCard
      icon={XCircle}
      iconClassName="text-red-600"
      title="Payment Failed"
      titleClassName="text-primary-700"
      message="Something went wrong. Please try again."
      actions={
        <>
          <Button onClick={() => navigate(-1)}>Try Again</Button>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Home
          </Button>
        </>
      }
    />
  );
}

export default PaymentFailed;
