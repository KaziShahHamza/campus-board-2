import { useState } from "react";

const Chats = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "You" }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-app flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-bold text-primary mb-4 font-poppins">
        Campus Chats
      </h1>
      <p className="text-accent text-center mb-6 font-nunito">
        Chat with fellow students to share ideas, discuss problems, or offer help.
      </p>
      <div className="surface border-muted rounded-xl card w-full max-w-md flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">
              No messages yet. Start chatting!
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg ${
                  msg.sender === "You"
                    ? "bg-primary-soft text-right"
                    : "muted-surface text-left"
                }`}
              >
                <span className="font-semibold">{msg.sender}: </span>
                {msg.text}
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-muted flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-muted rounded focus:ring-2 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary-soft hover:bg-primary rounded font-bold font-nunito"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chats;
