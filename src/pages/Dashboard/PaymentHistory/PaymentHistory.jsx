import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const paymentsHistory = await axiosSecure.get(`payment/${user.email}`);
            return paymentsHistory.data;
        }
    })

    return (
        <div className="mt-10">
            <SectionTitle heading="Payment History" subHeading="At a Glance!"></SectionTitle>
            <h2 className="text-xl">Total Payments: ({payments.length})</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id} className="hover:bg-base-200">
                                <th>{++index}</th>
                                <td>{payment.price}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.status}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;