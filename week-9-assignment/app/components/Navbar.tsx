"use client"

import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { House , Heart } from 'lucide-react';
import { Movie } from "../ClientComponent";
import { useRouter } from "next/navigation";
import { searchMovie } from "../lib/searchMovie";


export const Navbar = () => {

  const [searchText , setSearchText] = useState("");
  const [searchItem, setSearchItem] = useState<Movie[]>([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
  if (searchText.trim()) {
    inputRef.current?.focus();
    setShowDropDown(true);
  }
}, [searchText]);

  useEffect(() => {

    if(!searchText.trim()) {
      setSearchItem([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const data = await searchMovie(searchText);
        setSearchItem(data.results);
      } catch (error) {
        console.error("Error searching movies:", error);
        setSearchItem([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  } , [searchText])

    return(
        <div className="relative w-full h-24">
        
        <House onClick={() => router.push('/')} className="absolute top-1/2 left-1/12 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 cursor-pointer" />
        <Heart fill="red" onClick={() => router.push('/favorites')} className="absolute text-red-500 top-1/2 right-1 lg:right-1/12 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer" />
        <Search className="absolute top-1/2 right-1/8 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
        <input ref={inputRef} onFocus={() => setShowDropDown(true)} onBlur={() => setShowDropDown(false)} onChange={(e) => setSearchText(e.target.value)} value={searchText} type="text" placeholder="Search for movies..."
         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {showDropDown && searchItem.length > 0 && (
                <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 mt-2 w-3/4 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {searchItem.map((item : Movie) => (
                        <div onMouseDown={() => router.push(`/movie/${item.id}`)} key={item.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {item.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )}