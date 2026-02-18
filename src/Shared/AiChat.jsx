import { useState } from "react";
import { getAuth } from "firebase/auth";

const AIChatModal = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first");
      return;
    }

    const token = await user.getIdToken();

    const res = await fetch("http://localhost:3000/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
console.log("data is", data)
    setMessages([...messages, { from: "user", text: input }, { from: "ai", text: data.reply }]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full w-16 h-16 shadow-lg hover:bg-blue-700 flex items-center justify-center text-2xl"
      >
        💬
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-96 h-128 rounded-lg shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b">
              <h2 className="font-bold text-lg">AI Tutor Assistant</h2>
              <button onClick={() => setOpen(false)} className="text-red-500 font-bold">X</button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded ${msg.from === "user" ? "bg-blue-100 text-right ml-auto" : "bg-gray-100 text-left mr-auto"}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex p-3 border-t">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 border rounded-l px-2 py-1"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-3 py-1 rounded-r hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatModal;
