// app/Home/page.tsx
"use client";

import Header from "@/components/Header"; // Adjust path as needed
import Section1 from "@/components/home/section1";

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen bg-[#0A0A0A]">
      <Header />
      <div className="w-full">
        <Section1 /> 
      </div>
    </main>
  );
}