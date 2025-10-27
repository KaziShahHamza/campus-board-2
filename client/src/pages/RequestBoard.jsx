import { useState } from "react";

const RequestBoard = () => {
  const [topic, setTopic] = useState("");
  const [requestType, setRequestType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTopic("");
    setRequestType("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#7e57c2] mb-4 font-poppins">
        Request Board
      </h1>
      <p className="text-[#00bcd4] text-center max-w-md mb-6 font-nunito">
        Submit your requests for notes, resources, or any campus help.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-purple-50 border border-[#7e57c2] p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Request Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className="w-full p-3 border border-purple-300 rounded focus:ring-2 focus:ring-purple-500"
        />

        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          required
          className="w-full p-3 border border-purple-300 rounded focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Type</option>
          <option>Study Material</option>
          <option>Project Help</option>
          <option>Club Collaboration</option>
          <option>General Query</option>
        </select>

        <textarea
          placeholder="Describe your request..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
          className="w-full p-3 border border-sky-300 rounded focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="submit"
          className="w-full py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-bold rounded font-nunito transition"
        >
          Submit Request
        </button>

        {submitted && (
          <p className="text-green-600 text-center text-sm font-semibold">
            Request submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default RequestBoard;
