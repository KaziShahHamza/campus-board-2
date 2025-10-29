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
    <div className="min-h-screen bg-app px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-primary mb-4 font-poppins">
        Request Board
      </h1>
      <p className="text-accent text-center max-w-md mb-6 font-nunito">
        Submit your requests for notes, resources, or any campus help.
      </p>
      <form
        onSubmit={handleSubmit}
        className="surface border-muted p-6 rounded-xl card w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Request Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className="w-full p-3 border border-muted rounded focus:ring-2 focus:outline-none"
        />

        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          required
          className="w-full p-3 border border-muted rounded focus:ring-2 focus:outline-none"
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
          className="w-full p-3 border border-muted rounded focus:ring-2 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full py-2 bg-primary-soft hover:bg-primary text-primary font-bold rounded font-nunito transition"
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
