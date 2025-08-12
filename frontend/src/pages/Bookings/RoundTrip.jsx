import React from "react";
import {
  CalendarDays,
  MapPin,
  Clock,
  BadgeDollarSign,
  Car,
  RefreshCw,
} from "lucide-react";

const roundTrips = [
  {
    id: 1,
    date: "2025-08-12T07:30:00Z",
    returnDate: "2025-08-14T18:00:00Z",
    pickup: "Whitefield, Bangalore",
    destination: "Mysore Palace",
    price: 3200,
    priceStatus: "Paid",
    tripType: "roundtrip",
    carName: "Toyota Innova",
    carType: "7-seater",
  },
  {
    id: 2,
    date: "2025-08-15T10:00:00Z",
    returnDate: "2025-08-16T15:30:00Z",
    pickup: "Chennai Central",
    destination: "Pondicherry",
    price: 2800,
    priceStatus: "Unpaid",
    tripType: "roundtrip",
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

const formatTime = (dateStr) =>
  new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const RoundTrip = () => {
  return (
    <div className="p-6 font-[Poppins]">
      <h1 className="text-4xl font-bold text-base-content mb-8">Round Trips</h1>

      <div className="space-y-6">
        {roundTrips.map((trip) => (
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
              {/* Onward Date & Time */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatTime(trip.date)}</span>
              </div>

              {/* Return Date & Time */}
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-secondary" />
                <span>
                  Return: {formatDate(trip.returnDate)} - {formatTime(trip.returnDate)}
                </span>
              </div>

              {/* Car Name & Type */}
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                <span className="font-medium text-base-content">
                  {trip.carName} ({trip.carType})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <BadgeDollarSign className="w-4 h-4 text-success" />
                <span className="font-medium text-base-content">₹{trip.price}</span>
              </div>

              {/* Payment Status */}
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

        {roundTrips.length === 0 && (
          <div className="text-center text-base-content/50 mt-20">
            <Car className="w-10 h-10 mx-auto mb-2 opacity-50" />
            No round trips found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RoundTrip;
