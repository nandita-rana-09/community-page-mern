import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout";

const socket = io("https://community-page-mern.vercel.app");

export default function Chat() {
  const { room } = useParams();
  const { user } = useContext(AuthContext);

  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (!room) return;

    socket.emit("joinRoom", room);

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, [room]);

  const sendMessage = () => {
    if (!msg.trim() || !user) return;

    socket.emit("sendMessage", {
      room,
      message: msg,
      userId: user._id
    });

    setMsg("");
  };

  return (
    <DashboardLayout>
      <div
        className={`flex flex-col h-screen  overflow-hidden ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h1 className="text-lg font-semibold capitalize">
            {room} Chat
          </h1>

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-lg text-sm bg-blue-600 hover:bg-blue-700"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => {
            const isMe = m.userId === user?._id;

            return (
              <div
                key={i}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                    isMe
                      ? "bg-blue-600 text-white"
                      : darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-black border"
                  }`}
                >
                  <p className="text-xs opacity-70 mb-1">
                    {isMe ? "You" : "User"}
                  </p>
                  {m.message}
                </div>
              </div>
            );
          })}
        </div>

        {/* INPUT BAR */}
        <div
          className={`p-3 flex gap-2 border-t ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type a message..."
            className={`flex-1 p-3 rounded-lg outline-none ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white text-black border"
            }`}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-5 rounded-lg text-white"
          >
            Send
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
