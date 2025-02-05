import { AuthenticateWithRedirectCallback, useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/404/NotFoundPage";

function App() {
  const { isLoaded, isSignedIn } = useAuth(); // Check if Clerk is loaded and if user is signed in

  if (!isLoaded) {
    return <div>Loading...</div>; // Wait until Clerk is loaded before rendering
  }

  if (!isSignedIn) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />
          }
        />
      </Routes>
    ); // Redirect to Clerk login if user isn't signed in
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<NotFoundPage />} /> {/* Main page */}
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
