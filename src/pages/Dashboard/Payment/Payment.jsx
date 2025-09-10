import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";



const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_PK);

const Payment = () => {

    return (
        <div className="mt-10">
            <SectionTitle heading="payment" subHeading="Please pay to eat"></SectionTitle>

            <div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>

        </div>
    );
};

export default Payment;