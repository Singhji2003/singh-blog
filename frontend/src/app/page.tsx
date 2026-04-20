import Image from "next/image";
import Hero from "@/assets/images/Hero.webp";
import CategoryCards from "@/componenets/CategoryCard";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
export default function Home() {
  return (
    <div className="mx-8">
      {/* Hero Section */}
      <div className="flex justify-between items-center gap-8 mt-8 ">
        <div className="flex flex-col gap-6">
          <div className="text-black bg-[#a5cdec] rounded-full w-max px-6 py-1">
            Welcome to Singh Blog
          </div>
          <h2 className="text-6xl font-bold leading-16">
            Insights that <br /> <span className="text-[#005EA3]">shape</span>{" "}
            the future
          </h2>
          <p className="text-lg text-[#404752] font-normal">
            Our mission is to filter the noise and bring you high-quality
            editorial content. We curate deep dives into technology, philosophy,
            and the emerging trends that define our era.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2 w-max cursor-pointer text-white bg-[#005EA3] rounded-full">
              Explore Articles
            </button>
            <button className="px-6 py-2 w-max cursor-pointer text-black bg-transparent rounded-full border border-solid border-[#C0C7D4]">
              Our Philosophy
            </button>
          </div>
        </div>
        <Image src={Hero} alt="Hero" className="w-[45%]" />
      </div>

      {/* Category Section */}

      <div className="mt-24">
        <h2 className="text-2xl font-bold ">Curated Domains</h2>
        <p className="text-base text-[#404752] font-normal">
          Deep dives into the subjects that shape our future.{" "}
        </p>
        <CategoryCards />
      </div>

      {/* Rising Discussions */}
      <div className="mt-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold ">Rising Discussions</h2>
          <p className="text-[#005EA3] flex gap-2">
            {" "}
            View All <ArrowForwardSharpIcon />
          </p>
        </div>
      </div>
    </div>
  );
}
