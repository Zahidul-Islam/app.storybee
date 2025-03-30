import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import VideosPage from "@/pages/videos/VideosPage";
import CreateVideoPage from "@/pages/create/CreateVideoPage";
import SingleVideoView from "@/pages/videos/[videoId]/SingleVideoView";
import GoogleCallbackPage from "@/pages/auth/google/GoogleCallbackPage";
import { useAuth } from "@/context/AuthContext";
import { VscLoading } from "react-icons/vsc";

export default function Router() {
  const auth = useAuth();
  const { isAuthenticated } = auth;

  return isAuthenticated === null ? (
    <div className="grid h-dvh w-dvw place-items-center">
      <VscLoading className="animate-spin text-5xl text-foreground" />
    </div>
  ) : isAuthenticated ? (
    <AppRouter />
  ) : (
    <RootRouter />
  );

  // return (
  //   <Routes>
  //     <Route path="/" element={<HomePage />} />
  //     <Route path="/videos">
  //       <Route index element={<VideosPage />} />
  //       <Route path="create" element={<CreateVideoPage />} />
  //       <Route path=":videoId" element={<SingleVideoView />} />
  //     </Route>

  //     <Route path="auth/google" element={<GoogleCallbackPage />} />
  //   </Routes>
  // );
}

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/videos" element={<VideosPage />} />
      <Route path="/videos/create" element={<CreateVideoPage />} />
      <Route path="/videos/:videoId" element={<SingleVideoView />} />
    </Routes>
  );
};

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/auth/google" element={<GoogleCallbackPage />} />
    </Routes>
  );
};
