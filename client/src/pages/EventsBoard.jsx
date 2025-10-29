import { useState } from "react";

const EventsBoard = () => {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEventName("");
    setDate("");
    setDetails("");
  };

  return (
    <div className="min-h-screen bg-app px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-primary mb-4 font-poppins">
        Events Board
      </h1>
      <p className="text-accent text-center max-w-md mb-6 font-nunito">
        Announce or share upcoming campus events with students.
      </p>
      <form
        onSubmit={handleSubmit}
        className="surface border-muted p-6 rounded-xl card w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
          className="w-full p-3 border border-muted rounded focus:ring-2 focus:outline-none"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-3 border border-muted rounded focus:ring-2 focus:outline-none"
        />

        <textarea
          placeholder="Event Details..."
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
          Post Event
        </button>

        {submitted && (
          <p className="text-green-600 text-center text-sm font-semibold">
            Event posted successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default EventsBoard;
