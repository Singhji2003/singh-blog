import SuggestionForm from "@/componenets/SuggestionForm";
import React from "react";
import SuggestImage from "@/assets/images/suggest.png";
import Image from "next/image";

const page = () => {
  return (
    <main className="min-h-screen bg-[#faf9f7] py-12 px-4">
      {/* Header */}
      <div className="text-center mb-8 max-w-md mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          Suggest a New Topic
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Can&apos;t find what you&apos;re looking for? Let our editorial team
          <br className="hidden sm:block" />
          know what topics you&apos;d like to see covered next.
        </p>
      </div>

      {/* Form Card */}
      <SuggestionForm />

      {/* Community Driven Editorial */}
      <div className="max-w-[540px] mx-auto mt-6">
        <div className="flex md:flex-row flex-col items-start gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-0">
          {/* Image placeholder */}
          <Image
            src={SuggestImage}
            className="md:w-[60%] w-full h-[200px] md:object-contain object-fill"
            alt="Suggest-Topic"
          />
          {/* Text */}
          <div className="md:py-4 pt-0 pb-6 pr-5 px-4 md:px-0 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Community Driven Editorial
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              We believe the best insights come from the challenges our readers
              face every day. Our team reviews every suggestion weekly to shape
              the future of our content roadmap.
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
              <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                48-Hour Response Time
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
