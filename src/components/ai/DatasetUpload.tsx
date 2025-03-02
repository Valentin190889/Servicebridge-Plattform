import React, { useState, useCallback } from 'react';
import { Upload, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface DatasetUploadProps {
  onUpload: (files: File[]) => Promise<void>;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
}

interface FileWithStatus extends File {
  status: 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

export function DatasetUpload({ 
  onUpload, 
  acceptedFileTypes = ['.csv', '.json', '.txt', '.jsonl'],
  maxFileSize = 100 * 1024 * 1024 // 100MB default
}: DatasetUploadProps) {
  const [files, setFiles] = useState<FileWithStatus[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      ...file,
      status: 'uploading' as const,
      progress: 0
    }));
    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress
    newFiles.forEach(file => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f === file) {
            const progress = Math.min(f.progress + 10, 100);
            const status = progress === 100 ? 'success' : 'uploading';
            return { ...f, progress, status };
          }
          return f;
        }));
      }, 500);

      // Clear interval when progress reaches 100%
      setTimeout(() => clearInterval(interval), 5000);
    });

    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize,
    multiple: true
  });

  const removeFile = (fileToRemove: FileWithStatus) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200 
          ${isDragActive 
            ? 'border-[#29DDDA] bg-[#29DDDA]/10' 
            : 'border-white/20 hover:border-white/40'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium text-white mb-2">
          {isDragActive ? 'Drop your files here' : 'Drag & drop your dataset files'}
        </p>
        <p className="text-sm text-gray-400">
          Supported formats: {acceptedFileTypes.join(', ')} (Max size: {maxFileSize / 1024 / 1024}MB)
        </p>
      </div>

      {files.length > 0 && (
        <div className="bg-white/5 rounded-lg p-4 space-y-3">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
              <div className="flex items-center space-x-3 flex-1">
                <FileText className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(1)}KB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {file.status === 'uploading' && (
                  <div className="w-24 bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-[#29DDDA] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}
                
                {file.status === 'success' && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                
                {file.status === 'error' && (
                  <div className="flex items-center space-x-2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-xs">{file.error}</span>
                  </div>
                )}

                <button
                  onClick={() => removeFile(file)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 