import { cn } from "@/lib/utils";

export default function FileSvgDraw({ isDragging }: { isDragging?: boolean }) {
  return (
    <>
      <svg
        className={cn(
          "mb-3 h-8 w-8 text-muted-foreground group-hover:text-foreground",
          isDragging && " text-primary"
        )}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      {isDragging ? (
        <p className="mb-1 text-sm text-muted-foreground group-hover:text-foreground">
          <span className="font-semibold">Drop files to upload them...</span>
        </p>
      ) : (
        <p className="mb-1 text-sm text-muted-foreground group-hover:text-foreground">
          <span className="font-semibold">Click to upload</span>
          &nbsp; or drag and
        </p>
      )}
      <p className="text-xs text-muted-foreground group-hover:text-foreground">
        drop SVG, PNG, JPG or WEBP
      </p>
    </>
  );
}
