import React from "react";
import {
  CalendarDays,
  MapPin,
  Clock,
  BadgeDollarSign,
  Car,
  RefreshCw,
} from "lucide-react";

const allOrders = [
  {
    id: 1,
    date: "2025-08-04T09:00:00Z",
    pickup: "Andheri, Mumbai",
    destination: "Pune Station",
    price: 1500,
    priceStatus: "Paid",
    tripType: "oneway",
    carName: "Swift Dzire",
    carType: "4-seater",
  },
  {
    id: 2,
    date: "2025-08-07T08:00:00Z",
    returnDate: "2025-08-09T19:00:00Z",
    pickup: "Koramangala, Bangalore",
    destination: "Coorg",
    price: 5000,
    priceStatus: "Paid",
    tripType: "roundtrip",
    carName: "Toyota Innova",
    carType: "7-seater",
  },
  {
    id: 3,
    date: "2025-08-05T15:30:00Z",
    pickup: "Connaught Place, Delhi",
    destination: "IGI Airport, Delhi",
    price: 950,
    priceStatus: "Unpaid",
    tripType: "airport",
    carName: "Wagon R",
    carType: "4-seater",
  },
  {
    id: 4,
    date: "2025-08-06T10:00:00Z",
    pickup: "MG Road, Bangalore",
    destination: "MG Road, Bangalore",
    price: 1200,
    priceStatus: "Paid",
    tripType: "hourly",
    hours: 5,
    carName: "Honda City",
    carType: "4-seater",
  },
];

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (dateStr) =>
  new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const AllOrder = () => {
  return (
    <div className="p-6 font-[Poppins]">
      <h1 className="text-4xl font-bold text-base-content mb-8">All Orders</h1>

      <div className="space-y-6">
        {allOrders.map((order) => (
          <div
            key={order.id}
            className="p-6 bg-base-100 rounded-2xl shadow-md border border-base-200 hover:shadow-lg hover:scale-[1.01] transition duration-300"
          >
            {/* Top Section */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-secondary" />
                <p className="text-sm text-base-content/70 font-medium">
                  {formatDate(order.date)}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full bg-primary/20 text-primary capitalize">
                <Car className="w-4 h-4" />
                {order.tripType}
                {order.tripType === "hourly" && ` (${order.hours} hr)`}
              </div>
            </div>

            {/* Pickup & Destination */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p className="text-sm text-base-content/70">Pickup</p>
                  <p className="text-base font-semibold text-base-content">
                    {order.pickup}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p className="text-sm text-base-content/70">Destination</p>
                  <p className="text-base font-semibold text-base-content">
                    {order.destination}
                  </p>
                </div>
              </div>
            </div>

            {/* Extra Details */}
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-base-content/70">
              {/* Start Time */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatTime(order.date)}</span>
              </div>

              {/* Return Date & Time (for roundtrip) */}
              {order.tripType === "roundtrip" && order.returnDate && (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-secondary" />
                  <span>
                    Return: {formatDate(order.returnDate)} - {formatTime(order.returnDate)}
                  </span>
                </div>
              )}

              {/* Car Name & Type */}
              {order.carName && (
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-primary" />
                  <span className="font-medium text-base-content">
                    {order.carName} ({order.carType})
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-2">
                <BadgeDollarSign className="w-4 h-4 text-success" />
                <span className="font-medium text-base-content">₹{order.price}</span>
              </div>

              {/* Payment Status */}
              <div className="flex items-center gap-2">
                <span className="opacity-70">Payment:</span>
                <span
                  className={`font-medium ${
                    order.priceStatus === "Paid" ? "text-success" : "text-error"
                  }`}
                >
                  {order.priceStatus}
                </span>
              </div>
            </div>
          </div>
        ))}

        {allOrders.length === 0 && (
          <div className="text-center text-base-content/50 mt-20">
            <Car className="w-10 h-10 mx-auto mb-2 opacity-50" />
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrder;
