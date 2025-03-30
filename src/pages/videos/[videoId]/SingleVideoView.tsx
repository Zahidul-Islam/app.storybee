import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/ui/custom/CustomBreadcrumb";
import Wrapper from "@/components/Wrapper";
import { FaYoutube } from "react-icons/fa";
import { useParams } from "react-router";
import { PiExport } from "react-icons/pi";
import downloadFiles, { downloadFilesHandler } from "@/lib/downloadFiles";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import httpClient from "@/lib/httpClient";

// const video = {
//   url: "https://s3.amazonaws.com/cdn.postt.ai/platform-images/landing-page/IntroVideo.webm",
// };
// const video = {
//   url: "https://s3.amazonaws.com/cdn.postt.ai/production/linkedin/67d40e99242de3d16d7a8b81/posts/67e87ef3f500bcb7ef78e7d1/videos/cat_programmer_hackathon.mp4",
// };
export default function SingleVideoView() {
  const { videoId } = useParams();

  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    httpClient()
      .get(`/agents/videos/${videoId}`)
      .then((res) => {
        console.log(res.data);
        setVideo(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const handleExport = () => {
  //   toast.promise(downloadFilesHandler(video?.url), {
  //     loading: "Exporting video...",
  //     success: () => {
  //       return "Video exported successfully!";
  //     },
  //     error: (err) => {
  //       return err?.message || "Failed to export video.";
  //     },
  //   });
  // };

  // const handlePublish = () => {
  //   // Logic to publish the video to YouTube
  //   toast.success("Video published to YouTube successfully!");
  // };
  return (
    <Wrapper>
      <div className="flex flex-col h-[calc(100dvh-85px)]  gap-4 pb-4">
        <div className="flex container mx-auto px-4 items-center justify-between w-full">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Videos", href: "/videos" },
              { label: videoId, href: `/videos/${videoId}` },
            ]}
          />
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => handleExport()}>
              <PiExport />
              Export to device
            </Button>
            <Button
              onClick={() => handlePublish()}
              className="bg-[#FF0000] text-white hover:bg-[#ff0000af]"
            >
              <FaYoutube className="text-[##FFFFFF]" />
              Publish To Youtube
            </Button>
          </div>
        </div>

        <video
          controls
          preload="metadata"
          src={video?.url}
          className="max-w-4xl max-h-[calc(100%-50px)] m-auto"
        />
      </div>
    </Wrapper>
  );
}
