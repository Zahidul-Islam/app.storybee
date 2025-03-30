import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../ui/custom/CustomInput";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "../ui/custom/file-uploader";
import FileSvgDraw from "../ui/custom/FileSvgDraw";
import { GrAttachment } from "react-icons/gr";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import httpClient from "@/lib/httpClient";
import { toast } from "sonner";
export const initialTones = [
  { name: "Professional", value: "professional" },
  { name: "Inspirational", value: "inspirational" },
  { name: "Casual", value: "casual" },
  { name: "Confident", value: "confident" },
  { name: "Educational", value: "educational" },
];

const dzConfig = {
  maxFiles: 1,
  accept: {
    "image/*": [".png", ".jpg", ".jpeg", ".webp"],
  },
  multiple: false,
  maxSize: 4 * 1024 * 1024,
};

interface GenerateScriptDialogProps {
  prompt: string;
  topic: string;
  image: File[];
  tone: string;
}

export default function GenerateScriptDialog({
  regenerate,
  children,
}: {
  regenerate?: any;
  children: React.ReactNode;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<GenerateScriptDialogProps>();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState({});

  const onSubmit: SubmitHandler<GenerateScriptDialogProps> = async (data) => {
    setLoading(true);
    setSteps({});
    const token = localStorage.getItem("_auth_accessToken");
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${API_URL}/agents/scripts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          topic: data.prompt,
        }),
      });

      if (!res.body) {
        console.error("No response body");
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          if (part.startsWith("data: ")) {
            const jsonStr = part.replace(/^data:\s*/, "");
            try {
              const parsed = JSON.parse(jsonStr);
              console.log("Streamed update:", parsed);
              setSteps((prev) => ({
                ...prev,
                [parsed.step]: parsed.message,
              }));

              toast.success(`Step ${parsed.step} completed: ${parsed.message}`);

              if (parsed.step === "done") {
                setLoading(false);
              }
            } catch (err) {
              console.error("Failed to parse stream data:", err);
            }
          }
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    } finally {
      regenerate();
      reset(); // reset form if needed
    }
  };

  // const onSubmit: SubmitHandler<GenerateScriptDialogProps> = (data) => {
  //   console.log(data);
  //   // navigate("/videos/create");//

  //   setLoading(true);

  //   httpClient()
  //     .post("/agents/scripts", {
  //       topic: data.prompt,
  //       // prompt: data.prompt,
  //       // topic: data.topic,
  //       // image: data.image,
  //       // tone: data.tone,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //       reset();
  //     });
  // };

  return (
    <Dialog
      onOpenChange={(value) => {
        if (!value) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!max-w-xl">
        <DialogHeader>
          <DialogTitle>Generate Script {loading ? "loading" : ""} </DialogTitle>
          <DialogDescription>
            Fill in the details below to generate a script for your video.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            {...register("prompt", { required: "Prompt cannot be empty" })}
            id="prompt"
            type="text"
            label="Prompt"
            placeholder="Enter video prompt"
            errors={errors}
            required
            multiline
            className="resize-none row-span-16 bg-muted"
          />

          {/* {JSON.stringify(steps)} */}

          {/* <CustomInput
            {...register("topic", {
              required: "topic cannot be empty",
            })}
            id="topic"
            type="text"
            label="Topic"
            placeholder="Enter video topic"
            errors={errors}
            required
            className="bg-muted"
          />

          <div className="flex flex-col gap-2">
            <Label>Image (Main character)</Label>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <FileUploader
                  value={field?.value}
                  onValueChange={field?.onChange}
                  dropzoneOptions={dzConfig}
                  className="group mt-1"
                >
                  {!dzConfig?.multiple &&
                  field?.value &&
                  field?.value?.length > 0 ? null : (
                    <FileInput className="rounded-md border bg-muted">
                      <div className="flex w-full flex-col items-center justify-center pb-4 pt-3">
                        <FileSvgDraw />
                      </div>
                    </FileInput>
                  )}

                  <FileUploaderContent>
                    {field?.value &&
                      field?.value?.length > 0 &&
                      field?.value?.map((file: any, i: number) => (
                        <FileUploaderItem key={i} index={i}>
                          <GrAttachment />

                          <span>
                            {(file as any)?.name?.length > 25
                              ? `${(file as any)?.name?.slice(0, 25)}...`
                              : (file as any)?.name}
                          </span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Tone</Label>
            <Controller
              name="tone"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field?.onChange} value={field?.value}>
                  <SelectTrigger className="w-full bg-muted">
                    <SelectValue
                      placeholder="Select tone"
                      className="line-clamp-1"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tone</SelectLabel>
                      <SelectSeparator className="w-full" />
                      {initialTones?.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div> */}
          <DialogFooter className="flex">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 flex-1"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
