"use client";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="flex items-center gap-4 p-1 bg-white shadow-2xl mb-1 md:gap-0">
      <h1
        onClick={() => router.back()}
        className="text-xs md:text-sm md:flex-[.5] cursor-pointer"
      >
        Go to previous Page
      </h1>
      <h1 className="md:text-start md:flex-[.6]">Two Player Game</h1>
    </header>
  );
};

export default Header;
