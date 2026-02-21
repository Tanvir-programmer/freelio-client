import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { NavLink } from "react-router";

const Qna = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What methods of payments are supported?",
      answer:
        "We support a wide range of secure payment options including all major Credit/Debit cards (Visa, Mastercard, Amex), PayPal, and direct bank transfers for enterprise-level contracts. All transactions are protected by our secure escrow system.",
    },
    {
      question: "Can I cancel at anytime?",
      answer:
        "Yes, you can terminate a contract at any stage. If work has already commenced, our dispute resolution team will review the progress to ensure a fair partial payment is released to the freelancer for work completed.",
    },
    {
      question: "How do I get a receipt for my purchase?",
      answer:
        "Every time a milestone is paid or a job is completed, an automated PDF receipt is sent to your email. You can also access your full transaction history and download official invoices from your Billing Dashboard.",
    },
    {
      question: "Which license do I need?",
      answer:
        "Most services on Freelio include a full commercial use license upon final payment. If your project requires specific intellectual property transfers or exclusive rights, you can specify these terms within the job agreement.",
    },
    {
      question: "How do I get access to a theme I purchased?",
      answer:
        "Once the transaction is verified, digital assets—including themes, source code, and design files—will appear in your 'Purchases' tab for immediate download. You will also receive a secure link via email.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fdf7f0] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-[#1e3d37] mb-6 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Find answers to common questions about our platform, payments, and
            how to get your projects started.
          </p>
        </div>

        {/* FAQ List Section */}
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-2 transition-all duration-300">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-8 flex items-center justify-between text-left group outline-none"
              >
                <span
                  className={`text-2xl font-medium transition-colors duration-300 ${
                    openIndex === index
                      ? "text-[#357266]"
                      : "text-[#1e3d37] group-hover:text-[#357266]"
                  }`}
                >
                  {faq.question}
                </span>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <Minus
                      className="text-[#357266] transition-transform duration-300 rotate-180"
                      size={28}
                    />
                  ) : (
                    <Plus
                      className="text-gray-400 group-hover:text-[#357266] transition-transform duration-300"
                      size={28}
                    />
                  )}
                </div>
              </button>

              {/* Collapsible Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-60 opacity-100 pb-8"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Support Info */}
        <div className="mt-24 py-12 border-t border-gray-100 text-center">
          <div className="bg-white inline-flex flex-col md:flex-row items-center gap-8 px-10 py-8 rounded-3xl border border-gray-50 shadow-sm transition-all hover:shadow-md">
            {/* Trust Indicator Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#fdf7f0] flex items-center justify-center text-[#357266] shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21a3.745 3.745 0 0 1-3.129-1.593 3.745 3.745 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.745 3.745 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </div>

            <div className="text-left max-w-sm">
              <p className="text-[#1e3d37] font-bold text-xl mb-1">
                Still wondering about safety?
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Learn how our verified professional network and secure payment
                systems keep your projects protected.
              </p>
            </div>

            <NavLink
              to="/trust"
              className="bg-[#357266] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#2a5a51] transition-all shadow-lg shadow-[#357266]/10 active:scale-95 flex items-center gap-2"
            >
              Why Trust Freelio?
              <span className="text-lg">→</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qna;
