import Image from "next/image";
import Hero from "@/assets/images/Hero.webp";
import Blog from "@/assets/images/blog.jpg";
import CategoryCards from "@/componenets/CategoryCard";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import ArticleCards from "@/componenets/Articlecards";
import WeeklyDigest from "@/componenets/Weeklydigest";
import JoinCTA from "@/componenets/Joincta";
import Link from "next/link";
export default function Home() {
  const cards = [
    {
      image: Blog,
      category: "Career",
      timePeriod: "8 mins",
      title: "The Quantum Leap: Navigating the 2025 Processor War",
      description:
        "Intel, AMD, and the rise of ARM architecture in the consumer laptop market.",
      ownerAlias: "",
      ownerName: "Singhji",
    },
    {
      image: Blog,
      category: "Career",
      timePeriod: "8 mins",
      title: "The Quantum Leap: Navigating the 2025 Processor War",
      description:
        "Intel, AMD, and the rise of ARM architecture in the consumer laptop market.",
      ownerAlias: "",
      ownerName: "Singhji",
    },
    {
      image: Blog,
      category: "Career",
      timePeriod: "8 mins",
      title: "The Quantum Leap: Navigating the 2025 Processor War",
      description:
        "Intel, AMD, and the rise of ARM architecture in the consumer laptop market.",
      ownerAlias: "",
      ownerName: "Singhji",
    },
  ];
  return (
    <div className="mx-8">
      {/* Hero Section */}
      <div className="flex md:flex-row flex-col-reverse justify-between items-center gap-8 md:mt-24 mt-4 ">
        <div className="flex flex-col gap-6">
          <div className="text-black bg-[#a5cdec] rounded-full w-max px-6 py-1">
            Welcome to Singh Blog
          </div>
          <h2 className="md:text-6xl text-3xl font-bold md:leading-16 leading-8">
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

        <video
          src="/videos/home-ani.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="md:w-[45%] w-full rounded-2xl"
        />
      </div>

      {/* Category Section */}

      <div className="md:mt-24 mt-16">
        <div className="flex justify-between">
          <div className="w-[70%]">
            <h2 className="md:md:text-2xl text-xl text-xl font-bold ">
              Curated Domains
            </h2>
            <p className="md:text-base text-sm text-[#404752] font-normal">
              Deep dives into the subjects that shape our future.{" "}
            </p>
          </div>
          <Link
            href="/category"
            className="text-[#005EA3] cursor-pointer flex gap-2"
          >
            {" "}
            <span> View All</span>
            <ArrowForwardSharpIcon />
          </Link>
        </div>

        <CategoryCards />
      </div>

      {/* Rising Discussions */}
      <div className="py-8 -mx-8 px-8 md:mt-24 mt-16 bg-[#F6F3F2]">
        <div className="flex justify-between items-center">
          <h2 className="md:text-2xl text-xl font-bold ">Rising Discussions</h2>
          <p className="text-[#005EA3] flex gap-2">
            {" "}
            <span> View All</span>
            <ArrowForwardSharpIcon />
          </p>
        </div>

        <div className="flex md:flex-row flex-col justify-between  gap-8 mt-6">
          {cards.map((blog) => {
            return (
              <div className="">
                <Image
                  src={blog?.image}
                  className="rounded-t-2xl"
                  alt="Blog Image"
                />
                <div className="bg-white rounded-b-2xl pb-6">
                  <div className="flex gap-4 p-4">
                    <div className="bg-[#E7DEFF] text-sm rounded-full px-4 py-1 w-max text-[#4C2FA4]">
                      {blog?.category?.toUpperCase()}
                    </div>
                    <div className="bg-[#E7DEFF] text-sm rounded-full px-4 py-1 w-max text-[#404752]">
                      {blog?.timePeriod} Read
                    </div>
                  </div>
                  <h2 className="text-lg mx-4 font-bold">{blog.title}</h2>
                  <p className="text-[#404752] mx-4">{blog.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor's Choice */}

      <div className="mt-24 text-center">
        <span className="text-center font-bold text-[#005EA3] text-sm">
          CURATED SELECTION
        </span>
        <h2 className="text-3xl mt-2 font-bold ">Editor's Choice</h2>

        <ArticleCards />
      </div>

      {/* The Weekly Digest */}

      <div className="mt-24">
        <WeeklyDigest />
      </div>

      {/* Join Cta */}

      <div className="mt-24">
        <JoinCTA />
      </div>
    </div>
  );
}
