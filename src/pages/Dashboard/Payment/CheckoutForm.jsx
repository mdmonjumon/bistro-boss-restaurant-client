import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements();

    const axiosSecure = useAxiosSecure();

    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);



    useEffect(() => {
        if (totalPrice <= 0) {
            
            return
        }
        axiosSecure.post('create-payment-intent', { price: totalPrice })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, totalPrice])




    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);


        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message)
        } else {
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user.displayName || "anonymous",
                    email: user.email || "anonymous"
                }
            }
        })

        if (paymentError) {
            setError(paymentError.message)
        }
        else {
            if (paymentIntent.status === "succeeded") {
                setError('');
                setTransactionId(paymentIntent.id);

                // save the payment to the db
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuItemId),
                    status: "pending"
                };

                const res = await axiosSecure.post('payment', payment);
                if (res.data.deletedResult.deletedCount > 0 && res.data.paymentResult.insertedId) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymentHistory');
                }
            }
        }
    }


    return (
        <div>
            <p className="text-center my-10 text-2xl">Your payable amount is : ${totalPrice}</p>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn cursor-pointer" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-rose-700">{error}</p>
                {
                    transactionId && <p className="text-lg text-center"><strong>Your transaction id:</strong> <span className="text-green-600">{transactionId}</span></p>
                }
            </form>
        </div>

    );
};

export default CheckoutForm;