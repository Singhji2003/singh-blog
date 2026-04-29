import Link from "next/link";

export default function JoinCTA() {
  return (
    <div className="bg-[#E5E3DF] rounded-4xl px-10 py-12 w-ful  text-center">
      <h2 className="text-gray-900 text-2xl md:text-3xl font-bold mb-3">
        Ready to join the elite community of thinkers?
      </h2>
      <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8">
        Access exclusive member-only deep dives, join the live commentary on
        essays, and follow your favorite authors.
      </p>
      <div className="flex md:flex-row flex-col items-center justify-center gap-3">
        <Link
          href={"/register"}
          className="bg-[#005EA3]  cursor-pointer text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Create Free Account
        </Link>
        <Link
          href={"/category"}
          className="bg-transparent  cursor-pointer text-gray-800 text-sm font-semibold px-6 py-3 rounded-full border border-[#C0C7D4] hover:border-gray-400 hover:bg-white transition"
        >
          Explore Articles
        </Link>
      </div>
    </div>
  );
}
