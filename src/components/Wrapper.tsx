import { cn } from "@/lib/utils";
import Navbar from "@/pages/home/Navbar";
import React from "react";

export default function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col w-full gap-4 ", className)}>
      <Navbar />
      {children}
    </section>
  );
}
