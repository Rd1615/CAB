import React from "react";
import {
  CalendarDays,
  BadgeDollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
  Receipt,
} from "lucide-react";

const payments = [
  {
    id: "PAY123456",
    amount: 750,
    method: "UPI",
    date: "2025-07-28T10:00:00Z",
    status: "Paid",
  },
  {
    id: "PAY123457",
    amount: 540,
    method: "Credit Card",
    date: "2025-07-22T14:30:00Z",
    status: "Refunded",
  },
  {
    id: "PAY123458",
    amount: 990,
    method: "Cash",
    date: "2025-07-20T09:15:00Z",
    status: "Paid",
  },
];

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const PaymentHistory = () => {
  return (
    <div className="p-6 font-[Poppins] bg-base-100">
      <h1 className="text-4xl font-bold text-base-content mb-8">Payment History</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="rounded-2xl p-5 border border-base-300 shadow-md bg-base-100 transition transform hover:-translate-y-1 duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Receipt className="w-5 h-5" />
                {payment.id}
              </div>
              <div
                className={`text-sm font-semibold flex items-center gap-1 ${
                  payment.status === "Paid" ? "text-success" : "text-error"
                }`}
              >
                {payment.status === "Paid" ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Paid
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Refunded
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3 text-sm text-base-content/70">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 opacity-70" />
                {formatDate(payment.date)}
              </div>

              <div className="flex items-center gap-2">
                <BadgeDollarSign className="w-4 h-4 opacity-70" />
                ₹{payment.amount}
              </div>

              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 opacity-70" />
                {payment.method}
              </div>
            </div>
          </div>
        ))}

        {payments.length === 0 && (
          <p className="col-span-full text-center text-base-content/50 mt-10">
            No payment history found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
