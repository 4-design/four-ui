import React from 'react';
import { useDropzone } from 'react-dropzone';
import { MdFileUpload } from 'react-icons/md';
import { Chip } from '../chip';
import { fsx } from '../system/fsx';
import { Text } from '../text';

export type DropzoneProps = {
  files: File[];
  message?: string;
  multiple?: boolean;
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: (file: File) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export const Dropzone: React.FC<DropzoneProps> = ({
  files,
  onDrop,
  onRemove,
  message = 'ここにファイルをドロップしてアップロード',
  multiple = false,
  className,
}) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple });

  return (
    <div
      {...getRootProps()}
      className={fsx([
        'flex w-auto cursor-pointer flex-col flex-wrap justify-center px-5 py-3',
        'border-shade-medium-default rounded border border-dashed',
        className,
      ])}
    >
      <input {...getInputProps()} />

      <div className="text-shade-medium-default flex w-full flex-col items-center px-3 py-5">
        <MdFileUpload size={48} className="text-shade-light-default mb-3" />
        <Text size="s">{message}</Text>
      </div>

      {files.length > 0 && (
        <div className="flex w-full flex-wrap justify-start gap-2">
          {files.map((file) => (
            <Chip key={file.name} label={file.name} clickableArea="limited" onClick={(e) => onRemove(file)(e)} />
          ))}
        </div>
      )}
    </div>
  );
};
