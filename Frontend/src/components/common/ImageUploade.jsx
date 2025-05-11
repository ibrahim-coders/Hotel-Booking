import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ onImageUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file);
      onImageUpload(previewUrl, file); // file পাঠাও
    },
  });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <p className="text-blue-600 text-sm hover:underline">
        Change Profile Photo
      </p>
    </div>
  );
};

export default ImageUploader;
