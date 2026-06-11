"use client";

import { useState } from "react";
import { AIChat } from "./AIChat";
import { Navbar } from "./Navbar";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText , setSearchText] = useState("");


  return (
    <>
    <Navbar searchText={searchText} setSearchText={setSearchText}  />
      {children}

      <button className="rounded-md w-fit px-4 py-2 bg-blue-500 fixed bottom-4 right-8"
       onClick={() => setIsOpen(true)}>
        Ask AI
      </button>

      <AIChat
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onMovieSuggestion={setSearchText}
      />
    </>
  );
}