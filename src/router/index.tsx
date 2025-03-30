import { Route, Routes } from "react-router";
import HomePage from "@/pages/home/HomePage";
import VideosPage from "@/pages/videos/VideosPage";
import CreateVideoPage from "@/pages/create/CreateVideoPage";
import SingleVideoView from "@/pages/videos/[videoId]/SingleVideoView";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/videos">
        <Route index element={<VideosPage />} />
        <Route path="create" element={<CreateVideoPage />} />
        <Route path=":videoId" element={<SingleVideoView />} />
      </Route>
    </Routes>
  );
}
