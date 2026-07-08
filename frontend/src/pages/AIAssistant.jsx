import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";

export default function AIAssistant() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold">
            🤖 AI Health Assistant
          </h1>

          <p className="text-gray-500 mt-2">
            Ask anything about patients, medicines, health centers and disease trends.
          </p>

          <div className="mt-8">
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
}