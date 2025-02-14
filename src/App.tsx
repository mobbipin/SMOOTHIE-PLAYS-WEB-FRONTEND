import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Route, Routes } from "react-router-dom";

import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";

import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import NotFoundPage from "./pages/404/NotFoundPage";
import AdminPage from "./pages/admin/AdminPage";
import AlbumPage from "./pages/album/AlbumPage";
import ChatPage from "./pages/chat/ChatPage";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
