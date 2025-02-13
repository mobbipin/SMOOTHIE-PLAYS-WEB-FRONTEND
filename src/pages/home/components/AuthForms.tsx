// src/components/Auth/AuthForms.tsx
import { useSignIn } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import { ChangeEvent, FC, FormEvent, useState } from "react";

const API_URL =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "http://localhost:5001/api";

interface AuthFormProps {
  onClose: () => void;
}

export const LoginForm: FC<AuthFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { signIn } = useSignIn();

  const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error("Login failed");
      }
      const data = await res.json();
      // Save token (e.g., in localStorage)
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const handleGoogleLogin = async () => {
    if (!signIn) {
      console.error("SignIn object is not available.");
      return;
    }
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/auth-callback",
      });
    } catch (error) {
      console.error(error);
      alert("Google login failed.");
    }
  };

  return (
    <form onSubmit={handleEmailLogin}>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-full border border-gray-600 bg-zinc-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-full border border-gray-600 bg-zinc-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white p-3 rounded-full"
      >
        {isLoading ? "Logging in..." : "Login with Email"}
      </button>
      <div className="mt-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-3 rounded-full"
        >
          {isLoading ? "Processing..." : "Login with Google"}
        </button>
      </div>
    </form>
  );
};

export const SignupForm: FC<AuthFormProps> = ({ onClose }) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const router = useRouter();
  const { signIn } = useSignIn();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      if (photo) {
        formData.append("photo", photo);
      }
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Signup failed");
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const handleGoogleLogin = async () => {
    if (!signIn) {
      console.error("SignIn object is not available.");
      return;
    }
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/auth-callback",
      });
    } catch (error) {
      console.error(error);
      alert("Google login failed.");
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handlePickPhoto = () => {
    document.getElementById("photoInput")?.click();
  };

  return (
    <form onSubmit={handleSignup}>
      <div className="mb-4 flex flex-col items-center">
        <div
          onClick={handlePickPhoto}
          className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer"
        >
          {photo ? (
            <img
              src={URL.createObjectURL(photo)}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-300">Select Photo</span>
          )}
        </div>
        <input
          type="file"
          id="photoInput"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-full border border-gray-600 bg-zinc-700 text-white"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-full border border-gray-600 bg-zinc-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-full border border-gray-600 bg-zinc-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 rounded-full border border-gray-600 bg-zinc-700 text-white"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-500 text-white p-3 rounded-full"
      >
        {isLoading ? "Signing up..." : "Sign Up with Email"}
      </button>
      <div className="mt-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-3 rounded-full"
        >
          {isLoading ? "Processing..." : "Sign Up with Google"}
        </button>
      </div>
    </form>
  );
};
