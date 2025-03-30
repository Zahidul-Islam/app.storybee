import { toast } from "sonner";

export async function downloadFilesHandler(fileUrl: string) {
  if (!fileUrl) {
    throw new Error("Please provide a valid file URL.");
  }

  try {
    const response = await fetch(fileUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch file: ${response.status} ${response.statusText}`
      );
    }

    const blob = await response.blob();

    // Extract filename from Content-Disposition header or fallback to URL
    let fileName = fileUrl.split("/").pop()?.split("?")[0] || "downloaded-file";
    const disposition = response.headers.get("Content-Disposition");

    if (disposition) {
      const match = disposition.match(
        /filename\*?=(?:UTF-8'')?["']?([^;"']+)["']?/
      );
      if (match) {
        fileName = decodeURIComponent(match[1]);
      }
    }

    // Create and trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Free memory
    setTimeout(() => URL.revokeObjectURL(url), 100);

    return "File downloaded successfully!";
  } catch (error: any) {
    console.error("Download error:", error);
    throw new Error(error?.message || "Failed to download file.");
  }
}

export default function downloadFiles(fileUrl: string) {
  toast.promise(downloadFilesHandler(fileUrl), {
    loading: "Downloading file...",
    success: "File downloaded successfully!",
    error: (err) => err?.message || "Failed to download file.",
  });
}
