import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import { IoVideocam } from "react-icons/io5";
import Wrapper from "@/components/Wrapper";
import { Link } from "react-router";

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

export default function HomePage() {
  const columnCount = 7;

  const gap = 16;
  const columns: any = Array.from({ length: columnCount }, () => []);

  for (let i = 0; i < images.length; i++) {
    columns[i % columnCount].push(images[i]);
  }
  return (
    <Wrapper className="h-dvh relative  mx-auto items-center overflow-hidden">
      <div className="absolute  top-[25%] right-0 left-0">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <h1 className="text-6xl my-auto  leading-tight font-bold text-center ">
            Create videos at <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-5xl">
              the speed of thought.
            </span>
          </h1>
          <Link to="/videos" className="cursor-pointer z-50">
            <Button className="bg-gradient-to-r cursor-pointer from-blue-500 to-purple-500 px-6">
              <IoVideocam />
              Get Stated
            </Button>
          </Link>
        </div>
        <div
          className="w-full min-w-7xl z-0 -mt-24 px-4 grid grid-cols-7"
          style={{
            gap: `${gap}px`,
          }}
        >
          {columns.map((rows: any, index: number) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${gap}px`,
                marginTop: `${
                  index === 0 || index === 6
                    ? 0
                    : index === 1 || index === 5
                    ? 8
                    : index === 2 || index === 4
                    ? 14
                    : 20
                }rem`,
              }}
            >
              {rows.map((image: any, index: number) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className={cn("w-full h-auto z-0 rounded-lg")}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-t from-white via-transparent to-transparent  absolute bottom-0 left-0 right-0 h-[40%]" />
    </Wrapper>
  );
}
