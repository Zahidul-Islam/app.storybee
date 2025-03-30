import { useEffect, useRef, memo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { VscLoading } from "react-icons/vsc";

function GoogleCallbackPage() {
  const navigate = useNavigate();
  const { googleCallback } = useAuth();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  // Ref to prevent duplicate calls
  const callbackCalled = useRef(false);

  useEffect(() => {
    if (code && !callbackCalled.current) {
      console.log("LinkedIn code:", code);
      googleCallback(code);
      callbackCalled.current = true;
    } else if (error) {
      toast.error("Invalid request", {
        description: "The request is invalid. Please try again.",
      });
      navigate("/login");
    }
  }, [code, error, googleCallback]);

  return (
    <div className="my-auto flex w-full flex-1 items-center justify-center">
      <VscLoading size={24} className="size-20 animate-spin" />
    </div>
  );
}

export default GoogleCallbackPage;
