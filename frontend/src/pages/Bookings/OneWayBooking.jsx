import React from "react";
import {
  CalendarDays,
  MapPin,
  Clock,
  BadgeDollarSign,
  Car,
} from "lucide-react";

const oneWayTrips = [
  {
    id: 1,
    date: "2025-08-08T08:30:00Z",
    pickup: "Sector 62, Noida",
    destination: "Gurgaon Cyber City",
    price: 1200,
    priceStatus: "Paid",
    tripType: "oneway",
    carName: "Toyota Innova",
    carType: "7-seater",
  },
  {
    id: 2,
    date: "2025-08-10T14:00:00Z",
    pickup: "Bandra West, Mumbai",
    destination: "Thane Station",
    price: 900,
    priceStatus: "Unpaid",
    tripType: "oneway",
    carName: "Swift Dzire",
    carType: "4-seater",
  },
];

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const OneWayBooking = () => {
  return (
    <div className="p-6 font-[Poppins]">
      <h1 className="text-4xl font-bold text-base-content mb-8">One Way Trips</h1>

      <div className="space-y-6">
        {oneWayTrips.map((trip) => (
          <div
            key={trip.id}
            className="p-6 bg-base-100 rounded-2xl shadow-md border border-base-200 hover:shadow-lg hover:scale-[1.01] transition duration-300"
          >
            {/* Top Section */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-secondary" />
                <p className="text-sm text-base-content/70 font-medium">
                  {formatDate(trip.date)}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full bg-primary/20 text-primary capitalize">
                <Car className="w-4 h-4" />
                {trip.tripType}
              </div>
            </div>

            {/* Pickup & Destination */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p className="text-sm text-base-content/70">Pickup</p>
                  <p className="text-base font-semibold text-base-content">
                    {trip.pickup}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p className="text-sm text-base-content/70">Destination</p>
                  <p className="text-base font-semibold text-base-content">
                    {trip.destination}
                  </p>
                </div>
              </div>
            </div>

            {/* Extra Details */}
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-base-content/70">
              {/* Time */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(trip.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Car Name & Type */}
              {trip.carName && (
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-primary" />
                  <span className="font-medium text-base-content">
                    {trip.carName} ({trip.carType})
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-2">
                <BadgeDollarSign className="w-4 h-4 text-success" />
                <span className="font-medium text-base-content">
                  ₹{trip.price}
                </span>
              </div>

              {/* Payment */}
              <div className="flex items-center gap-2">
                <span className="opacity-70">Payment:</span>
                <span
                  className={`font-medium ${
                    trip.priceStatus === "Paid" ? "text-success" : "text-error"
                  }`}
                >
                  {trip.priceStatus}
                </span>
              </div>
            </div>
          </div>
        ))}

        {oneWayTrips.length === 0 && (
          <div className="text-center text-base-content/50 mt-20">
            <Car className="w-10 h-10 mx-auto mb-2 opacity-50" />
            No one way trips found.
          </div>
        )}
      </div>
    </div>
  );
};

export default OneWayBooking;
