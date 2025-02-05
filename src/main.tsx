import { RedirectToSignIn, SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/404/NotFoundPage";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <Routes>
        {/* Custom Sign-In Page */}
        <Route
          path="/sign-in"
          element={<SignIn path="/sign-in" routing="path" />}
        />

        {/* Custom Sign-Up Page */}
        <Route
          path="/sign-up"
          element={<SignUp path="/sign-up" routing="path" />}
        />

        {/* Optionally Redirect to Sign-In if the user is not authenticated */}
        <Route path="/" element={<RedirectToSignIn />} />
      </Routes>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<NotFoundPage />} /> {/* Main page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
