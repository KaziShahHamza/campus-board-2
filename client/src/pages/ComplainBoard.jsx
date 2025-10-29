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
    <div className="min-h-screen bg-app px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-primary mb-4 font-poppins">
        Complain Board
      </h1>
      <p className="text-accent text-center max-w-md mb-6 font-nunito">
        Share your complaints about campus facilities, departments, or services.
      </p>
      <form
        onSubmit={handleSubmit}
        className="surface border-muted p-6 rounded-xl card w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border border-muted rounded focus:ring-2 focus:outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-3 border border-muted rounded focus:ring-2 focus:outline-none"
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
          className="w-full p-3 border border-muted rounded focus:ring-2 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full py-2 bg-primary-soft hover:bg-primary text-primary font-bold rounded font-nunito transition"
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
