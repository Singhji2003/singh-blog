"use client";

import Image from "next/image";
import React, { useState } from "react";
import Blog from "@/assets/images/blog.jpg";
import Link from "next/link";
interface Blog {
  image: string;
  title: string;
  category: string;
  timePeriod: string;
  description: string;
  link: string;
  _id: string;
}
const RisingDiscussion = ({
  initialData,
}: {
  initialData: Blog[] | undefined;
}) => {
  const [cards, setCards] = useState(initialData || []);

  return (
    <div className="flex md:flex-row flex-col justify-between  gap-8 mt-6">
      {cards?.slice(0, 4).map((blog) => {
        return (
          <Link
            href={`/category/${blog.category}/${blog.link}`}
            key={blog._id}
            className=""
          >
            <Image
              src={blog?.image}
              className="rounded-t-2xl w-full h-[200px] object-cover"
              alt="Blog Image"
              width={200}
              height={200}
            />
            <div className="bg-white rounded-b-2xl pb-6">
              <div className="flex gap-4 p-4">
                <div className="bg-[#E7DEFF] text-xs rounded-full px-4 py-1 w-max text-[#4C2FA4]">
                  {blog?.category?.toUpperCase()}
                </div>
                <div className="bg-[#E7DEFF] text-xs rounded-full px-4 py-1 w-max text-[#404752]">
                  {blog?.timePeriod || "2 mins"} Read
                </div>
              </div>
              <h2 className="text-base mx-4 font-bold line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-[#404752] mx-4 text-sm line-clamp-3">
                {blog.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RisingDiscussion;
