import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

interface InputFileProps {
  id?: string;
  name?: string;
  label?: string;
  accept: { [key: string]: string[] };
  multiple?: boolean;
  maxSize?: number; // dalam byte, default 5MB
  onChange?: (files: File[]) => void;
}

const InputFile: React.FC<InputFileProps> = ({ id, name, label, accept, multiple = true, maxSize = 5 * 1024 * 1024, onChange }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const tooLargeFiles = fileRejections.filter((rej) => rej.errors.some((e) => e.code === "file-too-large"));

        if (tooLargeFiles.length > 0) {
          setFileError(`Ukuran file maksimal adalah ${maxSize / (1024 * 1024)} MB`);
        } else {
          setFileError("Beberapa file tidak valid.");
        }
      } else {
        setFileError(null);

        let newFiles: File[] = [];

        if (multiple) {
          newFiles = [...files, ...acceptedFiles];
        } else if (acceptedFiles.length > 0) {
          newFiles = [acceptedFiles[0]];
        }

        setFiles(newFiles);

        if (onChange) {
          onChange(newFiles);
        }
      }
    },
    [maxSize, multiple, files, onChange]
  );

  const removeFile = (fileName: string) => {
    const filteredFiles = files.filter((file) => file.name !== fileName);
    setFiles(filteredFiles);
    if (onChange) {
      onChange(filteredFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize,
  });

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-bold mb-2 text-secondary-green">
          {label}
        </label>
      )}

      <div className="border border-dashed border-secondary-green rounded-md p-6">
        <div {...getRootProps()} className="flex flex-col items-center justify-center text-center text-secondary-green cursor-pointer">
          <input {...getInputProps()} id={id} name={name} />
          <Upload className="w-6 h-6 mb-2" />
          <p>Klik atau seret file ke area ini untuk mengunggah</p>
          <p className="text-gray-500 text-sm">Format: {Object.values(accept).flat().join(", ")}</p>
          <p className="text-gray-500 text-sm">Ukuran maks: {maxSize / (1024 * 1024)} MB</p>
        </div>

        {fileError && <p className="text-red-600 text-sm mt-2">{fileError}</p>}

        <div className="mt-4">
          {files.map((file) => (
            <div key={file.name} className="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2 mb-2">
              <span>{file.name}</span>
              <button onClick={() => removeFile(file.name)} className="text-gray-600 hover:text-red-600 ml-2" aria-label="Remove file">
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputFile;
