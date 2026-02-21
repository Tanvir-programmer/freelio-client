import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const Qna = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What methods of payments are supported?",
      answer:
        "We support all major credit cards, PayPal, and secure wire transfers for larger projects. All payments are processed through our secure escrow system to ensure safety for both parties.",
    },
    {
      question: "Can I cancel at anytime?",
      answer:
        "Yes, you can cancel a contract at any time. However, depending on the project status and contract terms, partial payment may be due for work already completed and approved.",
    },
    {
      question: "How do I get a receipt for my purchase?",
      answer:
        "Receipts are automatically generated and sent to your registered email address after every transaction. You can also download them directly from your 'Billing History' dashboard.",
    },
    {
      question: "Which license do I need?",
      answer:
        "Most freelance projects on Freelio fall under a standard commercial use license. Specific licensing requirements for creative works should be discussed and documented within your project agreement.",
    },
    {
      question: "How do I get access to a theme I purchased?",
      answer:
        "Once your payment is confirmed, digital assets or themes are available for immediate download in the 'My Downloads' section of your account profile.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fdf7f0] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-[#1e3d37] mb-4">
            Frequently Asked Questions
          </h1>
        </div>

        {/* FAQ List Section */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span
                  className={`text-xl font-semibold transition-colors duration-300 ${
                    openIndex === index
                      ? "text-[#357266]"
                      : "text-[#1e3d37] group-hover:text-[#357266]"
                  }`}
                >
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  {openIndex === index ? (
                    <Minus className="text-[#357266]" size={24} />
                  ) : (
                    <Plus
                      className="text-gray-400 group-hover:text-[#357266]"
                      size={24}
                    />
                  )}
                </div>
              </button>

              {/* Collapsible Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-40 opacity-100 mb-6"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 text-lg leading-relaxed pr-12">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Support Section */}
        <div className="mt-20 text-center bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-bold text-[#1e3d37] mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-500 mb-6">
            We’re here to help you find the answers you need.
          </p>
          <button className="bg-[#357266] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2a5a51] transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Qna;
