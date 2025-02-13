import { FC, useState } from "react";
import { LoginForm, SignupForm } from "./AuthForms";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-zinc-800 text-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-around mb-4 border-b border-gray-600 pb-2">
          <button
            onClick={() => setActiveTab("login")}
            className={`py-2 px-4 ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 font-bold"
                : "text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`py-2 px-4 ${
              activeTab === "signup"
                ? "border-b-2 border-blue-500 font-bold"
                : "text-gray-400"
            }`}
          >
            Signup
          </button>
        </div>
        {activeTab === "login" ? (
          <LoginForm onClose={onClose} />
        ) : (
          <SignupForm onClose={onClose} />
        )}
        <button onClick={onClose} className="mt-4 text-red-400 underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
