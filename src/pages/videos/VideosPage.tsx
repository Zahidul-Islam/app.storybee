import React from "react";
import Navbar from "../home/Navbar";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { IoVideocam } from "react-icons/io5";
import Wrapper from "@/components/Wrapper";
import Breadcrumb from "@/components/ui/custom/CustomBreadcrumb";
import GenerateScriptDialog from "@/components/dialogs/GenerateScriptDialog";

const images = [
  {
    url: "https://i.pinimg.com/236x/d3/fb/69/d3fb6973cddc1d875dc7c2e04525d2e7.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/88/05/12/8805128eef83a0d8b724567611ddf7a1.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/6a/77/ed/6a77ed2962aa7e66bac8ff727d939e96.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/f1/13/df/f113df475d4566caa0075c6729960fa3.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/d3/fb/69/d3fb6973cddc1d875dc7c2e04525d2e7.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/88/05/12/8805128eef83a0d8b724567611ddf7a1.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/6a/77/ed/6a77ed2962aa7e66bac8ff727d939e96.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/f1/13/df/f113df475d4566caa0075c6729960fa3.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/d3/fb/69/d3fb6973cddc1d875dc7c2e04525d2e7.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/88/05/12/8805128eef83a0d8b724567611ddf7a1.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/6a/77/ed/6a77ed2962aa7e66bac8ff727d939e96.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/f1/13/df/f113df475d4566caa0075c6729960fa3.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/d3/fb/69/d3fb6973cddc1d875dc7c2e04525d2e7.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/88/05/12/8805128eef83a0d8b724567611ddf7a1.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/6a/77/ed/6a77ed2962aa7e66bac8ff727d939e96.jpg",
  },
  {
    url: "https://i.pinimg.com/236x/f1/13/df/f113df475d4566caa0075c6729960fa3.jpg",
  },
];

export default function VideosPage() {
  return (
    <Wrapper>
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center justify-between container mx-auto px-4 w-full">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Videos", href: "/videos" },
            ]}
          />

          <GenerateScriptDialog>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
              <IoVideocam />
              Generate Video
            </Button>
          </GenerateScriptDialog>
        </div>
        <div className=" h-[calc(100dvh-135px)] pb-4 overflow-y-auto">
          <div className="grid grid-cols-6  gap-4 container mx-auto px-4">
            {images?.map((image, index) => (
              <Link to={`/videos/${index}`} key={index}>
                <div className="w-full h-64 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    className="object-cover shadow w-full h-full transition-transform duration-300 transform hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
