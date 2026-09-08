"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, UploadCloud, X } from "lucide-react";

import { cn } from "@/lib/utils";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export function CvUploadZone() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    setError(null);
    if (accepted[0]) {
      setFile(accepted[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    onDropRejected: (rejections) => {
      setError(
        rejections[0]?.errors[0]?.code === "file-too-large"
          ? "File is too large. Maximum size is 5MB."
          : "Unsupported file type. Please upload a PDF or DOCX.",
      );
    },
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: MAX_SIZE_BYTES,
    maxFiles: 1,
    multiple: false,
    noClick: true,
  });

  if (file) {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card p-8">
        <span className="flex size-12 items-center justify-center rounded-md bg-accent text-primary">
          <FileText className="size-6" />
        </span>
        <p className="max-w-full truncate text-sm font-medium">{file.name}</p>
        <p className="text-xs text-muted-foreground">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
        <button
          type="button"
          onClick={() => setFile(null)}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-3.5" />
          Remove
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex h-full min-h-64 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-card p-8 text-center transition-colors",
        isDragActive && "border-primary bg-accent",
      )}
      onClick={open}
    >
      <input {...getInputProps()} />
      <span className="flex size-12 items-center justify-center rounded-md bg-accent text-primary">
        <UploadCloud className="size-6" />
      </span>
      <p className="text-sm font-medium">
        Drop CV here or{" "}
        <span className="text-primary underline underline-offset-2">
          browse
        </span>
      </p>
      <p className="text-xs text-muted-foreground">
        Supports PDF, DOCX (Max 5MB)
      </p>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
