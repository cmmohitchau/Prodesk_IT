import React, { useState } from "react";

export default function CandidateForm() {
  const [formData, setFormData] = useState({
    candidateName: "",
    jobRole: "",
    companyName: "",
    keySkills: "",
  });
  const [response , setResponse] = useState("");
  const [error , setError] = useState(false);
  const [loading , setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function callModel(userPrompt) {
  try {
    setLoading(true);
    setError(false);

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userPrompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received";

    setResponse(text);

  } catch (e) {
    console.error(e);
    setError(true);
  } finally {
    setLoading(false);
  }
}


  const handleSubmit = (e) => {
    e.preventDefault();

    const prompt = `
    You are an expert HR professional.

    Write a professional, concise, and tailored cover letter.

    Candidate Name: ${formData.candidateName}
    Job Role: ${formData.jobRole}
    Company: ${formData.companyName}
    Key Skills: ${formData.keySkills}

    Requirements:
    - Keep it under 300 words
    - Use a formal tone
    - Highlight relevant skills
    - Include a strong opening and closing
    `;
    callModel(prompt);

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Candidate Information Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Candidate Name
            </label>
            <input
              type="text"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleChange}
              placeholder="Enter candidate name"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Job Role
            </label>
            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              placeholder="Enter job role"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Key Skills
            </label>
            <textarea
              name="keySkills"
              value={formData.keySkills}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, Communication"
              rows="3"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
          >

            {loading ? "Generating..." : "Submit"}
          </button>
        </form>
      </div>
      <div>
        {response && (
        <div className="mt-6 bg-white border rounded-2xl shadow-sm p-4 relative">
            
            <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">
                Generated Cover Letter
            </h3>

            <button
                onClick={() => {
                navigator.clipboard.writeText(response);
                alert("Copied to clipboard!");
                }}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
            >
                Copy
            </button>
            </div>

            <div className="bg-gray-50 border rounded-xl p-3 max-h-80 overflow-y-auto">
            <p className="text-sm text-gray-700 whitespace-pre-line">
                {response}
            </p>
            </div>
        </div>
        )}
      </div>
    </div>
  );
}