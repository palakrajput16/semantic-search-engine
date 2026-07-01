import { useState } from "react";
import { Upload } from "lucide-react";

function UploadBox() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Allow only PDFs
    if (file.type !== "application/pdf") {
      setSuccess(false);
      setMessage("Please upload a PDF file.");

      setTimeout(() => {
        setMessage("");
      }, 4000);

      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      await response.json();

      setSuccess(true);
      setMessage(`${file.name} uploaded successfully and indexed.`);

      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (err) {
      console.error(err);

      setSuccess(false);
      setMessage("Upload failed. Please try again.");

      setTimeout(() => {
        setMessage("");
      }, 4000);
    } finally {
      setUploading(false);

      // Allow uploading the same file again
      e.target.value = "";
    }
  };

  return (
    <div className="mt-5 rounded-xl border border-border bg-card p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h3 className="text-base font-semibold">
            Upload PDF
          </h3>

          <p className="text-sm text-muted-foreground mt-1">
            Upload a PDF to automatically index it for semantic search.
          </p>
        </div>

        <label className="cursor-pointer">
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleUpload}
          />

          <div
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 transition ${
              uploading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            <Upload size={16} />
            {uploading ? "Uploading..." : "Choose PDF"}
          </div>
        </label>
      </div>

      {message && (
        <div
          className={`mt-4 rounded-lg px-4 py-3 text-sm ${
            success
              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default UploadBox;