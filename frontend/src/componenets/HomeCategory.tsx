"use client";

import { useRouter } from "next/navigation";

export default function HomeCategory() {
  const router = useRouter();

  const cards = [
    {
      id: "01",
      title: "Technology",
      desc: "Explore the latest updates in AI, software development, gadgets, and digital trends shaping the future.",
      link: "/category/technology",
      gradient: "from-[#005fa3] to-[#2c82c9]",
    },
    {
      id: "02",
      title: "Health",
      desc: "Discover practical advice on fitness, nutrition, wellness routines, and maintaining a healthier lifestyle.",
      link: "/category/health",
      gradient: "from-[#005fa3] to-[#4aa3df]",
    },
    {
      id: "03",
      title: "Lifestyle",
      desc: "Read inspiring content about productivity, fashion, travel ideas, and improving everyday living habits.",
      link: "/category/lifestyle",
      gradient: "from-[#005fa3] to-[#6bb6f0]",
    },
    {
      id: "04",
      title: "Education",
      desc: "Learn about study strategies, career guidance, online learning platforms, and knowledge-building resources.",
      link: "/category/education",
      gradient: "from-[#005fa3] to-[#1f6fb2]",
    },
  ];

  return (
    <div className="flex flex-wrap  mt-4 md:mt-0 gap-8 py-4">
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={() => router.push(card.link)}
          className="relative md:w-[280px] md:h-[210px] w-[44%] h-[100px] bg-white rounded-2xl md:shadow-[0_15px_60px_rgba(0,0,0,0.3)] group overflow-hidden cursor-pointer"
        >
          {/* Face 1 (Content layer) */}
          <div className="absolute bottom-0 left-0 w-full h-full flex  p-6">
            <div className="text-center">
              <h2 className="md:text-2xl font-semibold mb-2">{card.title}</h2>

              <p className="text-[15px] font-medium text-gray-600">
                {card.desc}
              </p>
            </div>
          </div>

          {/* Face 2 (Gradient sliding layer) */}
          <div
            className={`absolute bottom-0 left-0 w-full h-full flex items-center justify-center rounded-2xl transition-all duration-500 bg-gradient-to-br ${card.gradient}
            group-hover:h-[45px] group-hover:rounded-b-2xl group-hover:rounded-t-none`}
          >
            {/* Shine overlay */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-white/10 rounded-l-2xl"></div>

            {/* Big number shrinking */}
            <h2 className="text-white md:text-2xl text-lg font-bold transition-all duration-500 drop-shadow-lg group-hover:text-2xl">
              {card.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
