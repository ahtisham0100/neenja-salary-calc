"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { ConsentBanner } from "@/components/shared/ConsentBanner";

type Step = "upload" | "consent" | "processing" | "review" | "done";

const processingSteps = [
  "Uploading",
  "Reading document",
  "Extracting text",
  "Analysing content",
  "Analysing layout",
  "Waiting for your review",
];

const extractedFields = [
  { label: "Full name",          value: "Jane Doe",                            status: "ai-extracted" as const },
  { label: "Job title",          value: "Senior Product Designer",             status: "ai-extracted" as const },
  { label: "Email",              value: "jane.doe@email.com",                  status: "ai-extracted" as const },
  { label: "LinkedIn",           value: "linkedin.com/in/janedoe",             status: "ai-extracted" as const },
  { label: "Current employer",   value: "Fintech Solutions Ltd.",              status: "ai-extracted" as const },
  { label: "Years of experience",value: "6 years",                            status: "ai-extracted" as const },
  { label: "Primary skills",     value: "Figma, User Research, Prototyping",  status: "ai-extracted" as const },
  { label: "Education",          value: "BA Graphic Design, Univ. of Leeds",  status: "ai-extracted" as const },
];

export default function CvUploadPage() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [fieldStates, setFieldStates] = useState<Record<number, "pending" | "approved" | "rejected">>(
    Object.fromEntries(extractedFields.map((_, i) => [i, "pending"]))
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: 10 * 1024 * 1024,
    maxFiles: 1,
    multiple: false,
    noClick: true,
    onDrop: (accepted) => { if (accepted[0]) { setFile(accepted[0]); setStep("consent"); } },
  });

  const simulateProcessing = () => {
    setStep("processing");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setProcessingStep(i);
      if (i >= processingSteps.length - 1) { clearInterval(interval); setTimeout(() => setStep("review"), 800); }
    }, 600);
  };

  return (
    <div className="mx-auto max-w-3xl px-8 py-10 space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Upload CV</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;ll extract your career information and ask you to review each field.
        </p>
      </header>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {(["upload", "consent", "processing", "review", "done"] as Step[]).map((s, i, arr) => (
          <div key={s} className="flex items-center gap-2">
            <span className={cn(
              "flex size-6 items-center justify-center rounded-full text-xs font-semibold",
              step === s ? "bg-primary text-primary-foreground" :
              arr.indexOf(step) > i ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
            )}>
              {arr.indexOf(step) > i ? <Icon icon="material-symbols:check" className="size-3.5" /> : i + 1}
            </span>
            <span className={cn("text-xs", step === s ? "font-semibold text-foreground" : "text-muted-foreground")}>
              {s === "upload" ? "Upload" : s === "consent" ? "Consent" : s === "processing" ? "Processing" : s === "review" ? "Review" : "Done"}
            </span>
            {i < arr.length - 1 && <div className="h-px w-6 bg-border" />}
          </div>
        ))}
      </div>

      {/* Upload step */}
      {step === "upload" && (
        <div
          {...getRootProps()}
          onClick={open}
          className={cn(
            "flex min-h-56 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border bg-card p-10 text-center transition-colors",
            isDragActive && "border-primary bg-accent"
          )}
        >
          <input {...getInputProps()} />
          <span className="flex size-14 items-center justify-center rounded-xl bg-accent text-primary">
            <Icon icon="material-symbols:upload-file-outline" className="size-7" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold">Drop your CV here or <span className="text-primary underline underline-offset-2">browse</span></p>
            <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX, images and scanned documents (max 10 MB)</p>
          </div>
        </div>
      )}

      {/* Consent step */}
      {step === "consent" && file && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
            <Icon icon="material-symbols:description-outline" className="size-8 text-primary shrink-0" aria-hidden />
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <ConsentBanner
            title="Allow AI to extract your CV content?"
            description="We'll send your CV to an AI service to extract your career information. No data is stored beyond your session."
            provider="AI extraction service (session-only)"
            dataUsed="Your uploaded CV file"
            onAccept={simulateProcessing}
            onDecline={() => setStep("upload")}
          />
        </div>
      )}

      {/* Processing step */}
      {step === "processing" && (
        <div className="rounded-xl border border-border bg-card px-6 py-8 space-y-5">
          <div className="flex items-center gap-3">
            <Icon icon="material-symbols:autorenew" className="size-5 animate-spin text-primary" aria-hidden />
            <p className="text-sm font-semibold">Processing your CV…</p>
          </div>
          <div className="space-y-2">
            {processingSteps.map((s, i) => (
              <div key={s} className="flex items-center gap-2.5 text-sm">
                {i < processingStep ? (
                  <Icon icon="material-symbols:check-circle" className="size-4 text-primary shrink-0" aria-hidden />
                ) : i === processingStep ? (
                  <Icon icon="material-symbols:radio-button-unchecked" className="size-4 text-primary animate-pulse shrink-0" aria-hidden />
                ) : (
                  <Icon icon="material-symbols:radio-button-unchecked" className="size-4 text-muted-foreground shrink-0" aria-hidden />
                )}
                <span className={i <= processingStep ? "text-foreground" : "text-muted-foreground"}>{s}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic">Do not show fake percentages — progress reflects real steps.</p>
        </div>
      )}

      {/* Review step */}
      {step === "review" && (
        <div className="space-y-4">
          <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
            <Icon icon="material-symbols:auto-awesome" className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden />
            <p className="text-amber-800">
              <span className="font-semibold">Review AI-extracted fields.</span>{" "}
              Approve fields that are correct, edit those that need changes, or reject inaccurate ones.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card divide-y divide-border">
            {extractedFields.map((field, i) => (
              <div key={i} className="flex items-start justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{field.label}</p>
                  <p className={cn("mt-0.5 text-sm", fieldStates[i] === "rejected" && "line-through text-muted-foreground")}>
                    {field.value}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {fieldStates[i] === "approved" ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-700">
                      <Icon icon="material-symbols:check-circle" className="size-4" /> Approved
                    </span>
                  ) : fieldStates[i] === "rejected" ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <Icon icon="material-symbols:cancel-outline" className="size-4" /> Rejected
                    </span>
                  ) : (
                    <>
                      <button onClick={() => setFieldStates(s => ({...s, [i]: "approved"}))} className="rounded px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Approve</button>
                      <button className="rounded px-2 py-1 text-xs font-semibold border border-border hover:bg-muted transition-colors">Edit</button>
                      <button onClick={() => setFieldStates(s => ({...s, [i]: "rejected"}))} className="rounded px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted transition-colors">Reject</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setStep("done")}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Save as CV version
            </button>
          </div>
        </div>
      )}

      {/* Done */}
      {step === "done" && (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-green-200 bg-green-50 px-6 py-10 text-center">
          <Icon icon="material-symbols:check-circle" className="size-12 text-green-600" aria-hidden />
          <div>
            <p className="text-lg font-semibold text-green-900">CV saved as a new version</p>
            <p className="mt-1 text-sm text-green-700">Your Career Profile has been updated with the approved fields.</p>
          </div>
          <div className="flex gap-3">
            <a href="/career-profile" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              View Career Profile
            </a>
            <a href="/resume-scan" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors">
              Scan CV against a job
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
