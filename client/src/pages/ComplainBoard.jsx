import { useState } from "react";

const ComplainBoard = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTitle("");
    setCategory("");
    setDetails("");
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#7e57c2] mb-4 font-poppins">
        Complain Board
      </h1>
      <p className="text-[#00bcd4] text-center max-w-md mb-6 font-nunito">
        Share your complaints about campus facilities, departments, or services.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-purple-50 border border-[#7e57c2] p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border border-purple-300 rounded focus:ring-2 focus:ring-purple-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-3 border border-purple-300 rounded focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Category</option>
          <option>Hostel</option>
          <option>Canteen</option>
          <option>Department</option>
          <option>Library</option>
          <option>Others</option>
        </select>

        <textarea
          placeholder="Describe your complaint..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={5}
          required
          className="w-full p-3 border border-sky-300 rounded focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="submit"
          className="w-full py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-bold rounded font-nunito transition"
        >
          Submit Complaint
        </button>

        {submitted && (
          <p className="text-green-600 text-center text-sm font-semibold">
            Complaint submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default ComplainBoard;
