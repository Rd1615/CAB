import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I book a cab?",
    answer:
      "You can book a cab by selecting your pickup and drop-off locations, choosing your preferred car, and confirming the booking through our website or mobile app.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, bookings can be cancelled before the journey starts. Refunds depend on the cancellation policy applicable at the time of booking.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, credit/debit cards, net banking, and cash at pickup.",
  },
  {
    question: "Do you provide airport transfers?",
    answer:
      "Yes, we offer fixed-rate airport pickup and drop-off services for all major cities.",
  },
  {
    question: "Is hourly rental available?",
    answer:
      "Yes, you can book cars on an hourly basis and extend the rental if required.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 font-[Poppins]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Find answers to common queries about booking, payments, cancellations, and services.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-base-100 rounded-xl shadow-md border border-base-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-semibold hover:bg-base-200 transition"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-primary" : "text-base-content/70"
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`px-5 text-base-content/70 text-sm leading-relaxed transition-all duration-300 ${
                  openIndex === index ? "max-h-40 py-3" : "max-h-0 py-0"
                } overflow-hidden`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
