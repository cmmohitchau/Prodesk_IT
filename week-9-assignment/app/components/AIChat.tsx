"use client"
import axios from "axios";
import { X } from "lucide-react"
import { useState } from "react";

interface AIChatProps {
  onMovieSuggestion: (movie: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AIChat = ({
    onMovieSuggestion,
    isOpen,
    onClose,
} : AIChatProps) => {
    const [mood , setMood] = useState("");
    const [loading , setLoading] = useState(false);

    async function callModel(userPrompt : string) {
    try {
        setLoading(true);

        const res = await axios.post(`/api/llmCall`, {
            userPrompt
        });

        const data = res.data;

        console.log("data in fe : " , data)

        const text = data.answer;

        console.log("text in fe : " , text)

        onMovieSuggestion(text.trim());
        onClose();

    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
    }

    const handleSubmit = (e : any) => {
    e.preventDefault();

    const prompt = `
    You are an AI Assistant.

    Help to return a single movie string based on the user query.
    
    QUERY:
    ${mood}

    Rule:
    1. Always return a single movie name.

    `;
    
    callModel(prompt);

  };

  if(!isOpen) return;
    

  return (
    <div className="fixed border rounded-2xl h-28 right-4 bottom-4 w-80 px-4 py-2 bg-white shadow-lg">
        <div className="flex justify-between">
            <p className="">How's Your Mood</p>
            <button onClick={onClose}>
                <X />
            </button>
        </div>

        <input onChange={ (e) => setMood(e.target.value)} type="text" placeholder="I'll suggest you what to watch..."
         className="w-full absolute top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button onClick={ handleSubmit} className="bg-blue-500 w-fit px-2 py-1 rounded-md absolute top-1/2 right-2">{loading ? "Finding" : "Find"}</button>
    </div>
  );
}