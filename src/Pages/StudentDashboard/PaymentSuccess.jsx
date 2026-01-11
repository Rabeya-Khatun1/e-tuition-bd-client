import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useSearchParams } from 'react-router';
import { FaCheckCircle } from 'react-icons/fa';
import Loading from '../../Components/Loading/Loading';

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [payment, setPayment] = useState();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((result) => {
    
          setPayment({
            transactionId: result.data?.transactionId,
            trackingId: result.data?.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-green-100 to-green-200 p-4">
      <title>eTuitionBd-Dashboard-PaymentSuccess</title>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold mb-4 text-green-700">
          Payment Successful!
        </h2>
        {payment ? (
          <div className="space-y-3 text-gray-700">
            <p classname="text-lg">
              <span className="font-semibold">Tracking ID:</span> {payment.trackingId}
            </p>
            <p classname="text-lg">
              <span className="font-semibold">Transaction ID:</span> {payment.transactionId}
            </p>
            <p className="mt-4 text-green-600 font-semibold">
              Thank you for your payment!
            </p>
          </div>
        ) : (
          <Loading></Loading>
        )}
        <button
          onClick={() => window.location.replace('/dashboard')}
          className="mt-8 btn btn-primary hover:bg-primary-400 font-semibold transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
