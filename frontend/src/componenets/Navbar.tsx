import React from "react";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="flex justify-between py-4 px-8 items-center border-b border-b-solid border-b-[#dfdfdf]">
      <Image src={Logo} className="w-42" alt="Logo" />

      <div className="flex gap-8 font-normal">
        <Link
          className="relative text-black hover:text-blue-600 
      after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
      after:h-[2px] after:w-0 after:bg-blue-600
      after:transition-all after:duration-300
      hover:after:w-full"
          href="/"
        >
          {" "}
          Home{" "}
        </Link>
        <Link
          className="relative text-black hover:text-blue-600 
      after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
      after:h-[2px] after:w-0 after:bg-blue-600
      after:transition-all after:duration-300
      hover:after:w-full"
          href="/"
        >
          Collection{" "}
        </Link>
        <Link
          className="relative text-black hover:text-blue-600 
      after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
      after:h-[2px] after:w-0 after:bg-blue-600
      after:transition-all after:duration-300
      hover:after:w-full"
          href="/"
        >
          Philosphy{" "}
        </Link>
        <Link
          className="relative text-black hover:text-blue-600 
      after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
      after:h-[2px] after:w-0 after:bg-blue-600
      after:transition-all after:duration-300
      hover:after:w-full"
          href="/"
        >
          About{" "}
        </Link>
        <Link
          className="relative text-black hover:text-blue-600 
      after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
      after:h-[2px] after:w-0 after:bg-blue-600
      after:transition-all after:duration-300
      hover:after:w-full"
          href="/"
        >
          Archive{" "}
        </Link>
      </div>
      <div className="flex gap-6 items-center">
        <Link href="/">Sign In</Link>
        <button className="px-6 py-2 rounded-full text-white bg-[#0D81DB]">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Navbar;
