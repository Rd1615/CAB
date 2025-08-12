import React from "react";
import { XCircle, CalendarDays, MapPin, Clock, BadgeDollarSign } from "lucide-react";

const cancelledBookings = [
  {
    id: 1,
    date: "2025-07-24T09:00:00Z",
    pickup: "Sector 21, Noida",
    destination: "Rajiv Chowk, New Delhi",
    price: 620,
    priceStatus: "Refunded",
    cancelledOn: "2025-07-23T14:30:00Z",
    reason: "Customer cancelled",
  },
  {
    id: 2,
    date: "2025-07-22T12:30:00Z",
    pickup: "Huda City Centre, Gurgaon",
    destination: "IGI Airport, Delhi",
    price: 980,
    priceStatus: "Unpaid",
    cancelledOn: "2025-07-21T17:15:00Z",
    reason: "Driver no-show",
  },
];

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const CancelBooking = () => {
  return (
    <div className="p-6 font-[Poppins]">
      <h1 className="text-4xl font-bold text-base-content mb-8">Cancelled Bookings</h1>

      <div className="space-y-6">
        {cancelledBookings.map((booking) => (
          <div
            key={booking.id}
            className="p-6 bg-base-100 rounded-2xl shadow-md border border-base-200 hover:shadow-lg hover:scale-[1.01] transition duration-300"
          >
            {/* Top Section */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-secondary" />
                <p className="text-sm text-base-content/70 font-medium">
                  {formatDate(booking.date)}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-error bg-error/20 px-3 py-1 rounded-full">
                <XCircle className="w-4 h-4" />
                Cancelled
              </div>
            </div>

            {/* Pickup & Destination */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p className="text-sm text-base-content/70">Pickup</p>
                  <p className="text-base font-semibold text-base-content">
                    {booking.pickup}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p className="text-sm text-base-content/70">Destination</p>
                  <p className="text-base font-semibold text-base-content">
                    {booking.destination}
                  </p>
                </div>
              </div>
            </div>

            {/* Extra Details */}
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-base-content/70">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(booking.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <BadgeDollarSign className="w-4 h-4 text-success" />
                <span className="font-medium text-base-content">₹{booking.price}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="opacity-70">Status:</span>
                <span
                  className={`font-medium ${
                    booking.priceStatus === "Refunded"
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {booking.priceStatus}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="opacity-70">Cancelled On:</span>
                <span className="font-medium text-base-content">
                  {formatDate(booking.cancelledOn)}
                </span>
              </div>
            </div>

            {/* Cancellation Reason */}
            <div className="mt-4 text-sm text-base-content/70 italic">
              Reason: {booking.reason}
            </div>
          </div>
        ))}

        {cancelledBookings.length === 0 && (
          <div className="text-center text-base-content/50 mt-20">
            <XCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
            No cancelled bookings found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelBooking;
