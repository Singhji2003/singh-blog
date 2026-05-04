import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import ArticleCards from "@/componenets/Articlecards";
import WeeklyDigest from "@/componenets/Weeklydigest";
import JoinCTA from "@/componenets/Joincta";
import Link from "next/link";
import HomeCategory from "@/componenets/HomeCategory";
import serverUrl from "@/utils/serverUrl";
import RisingDiscussion from "@/componenets/RisingDiscussion";
async function getBlog() {
  try {
    const res = await fetch(`${serverUrl}api/v1/get-blog`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json(); // ✅ parsed JSON

    return json?.data || [];
  } catch (err) {
    console.error("API error:", err);
    return []; // safe fallback
  }
}
export default async function Home() {
  let data;

  try {
    data = await getBlog();
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="md:mx-8 mx-4">
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
            <Link
              href={"/category"}
              className="px-6 py-2 w-max cursor-pointer text-white bg-[#005EA3] rounded-full"
            >
              Explore Articles
            </Link>
            <Link
              href={"/about"}
              className="px-6 py-2 w-max cursor-pointer text-black bg-transparent rounded-full border border-solid border-[#C0C7D4]"
            >
              About Us
            </Link>
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

        <HomeCategory />
      </div>

      {/* Rising Discussions */}
      <div className="py-8   px-8 md:mt-24 mt-16 bg-[#F6F3F2]">
        <div className="flex justify-between items-center">
          <h2 className="md:text-2xl text-xl font-bold ">Rising Discussions</h2>
          <p className="text-[#005EA3] flex gap-2">
            {" "}
            <span> View All</span>
            <ArrowForwardSharpIcon />
          </p>
        </div>

        <RisingDiscussion initialData={data} />
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
