import { CiCircleRemove } from 'react-icons/ci';
import { useEffect, useState } from 'react';

const HotelImageUpdate = ({ imageValue = [], setHotelData }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // File object হলে preview বানাও
    if (imageValue.length && imageValue[0] instanceof File) {
      const urls = imageValue.map(file => URL.createObjectURL(file));
      setImageUrls(urls);

      // Clean up to avoid memory leaks
      return () => urls.forEach(url => URL.revokeObjectURL(url));
    }
    // String হলে (edit mode) শুধু একবারই set করো
    else if (imageValue.length && typeof imageValue[0] === 'string') {
      // আগের imageUrls আর নতুন imageValue একই হলে setImageUrls আর চালিও না
      if (
        imageUrls.length !== imageValue.length ||
        !imageUrls.every((url, i) => url === imageValue[i])
      ) {
        setImageUrls(imageValue);
      }
    } else {
      if (imageUrls.length !== 0) setImageUrls([]);
    }
    // eslint-disable-next-line
  }, [imageValue]);

  const handleFileChange = e => {
    const files = Array.from(e.target.files).slice(0, 3 - imageValue.length);
    if (files.length) {
      setHotelData([...imageValue, ...files].slice(0, 3));
    }
  };

  const handleRemoveImage = index => {
    const newFiles = imageValue.filter((_, i) => i !== index);
    setHotelData(newFiles);
  };

  return (
    <div className="w-full">
      {imageValue.length < 3 && (
        <div className="relative my-6">
          <input
            id="id-dropzone01"
            name="file-upload"
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <label
            htmlFor="id-dropzone01"
            className="relative flex cursor-pointer flex-col items-center gap-4 rounded border-2 border-dashed border-slate-300 hover:border-sky-500 px-3 py-6 text-center text-sm font-medium transition-colors duration-200"
          >
            <span className="inline-flex h-12 items-center justify-center rounded-full bg-sky-100 px-3 text-sky-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
            </span>
            <span className="text-slate-500">
              Drag & drop or
              <span className="text-sky-500"> upload up to 3 files</span>
            </span>
          </label>
        </div>
      )}

      {imageUrls.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="h-40 w-full object-cover rounded"
              />
              <CiCircleRemove
                onClick={() => handleRemoveImage(index)}
                className="text-red-500 hover:cursor-pointer absolute top-2 right-2 text-2xl"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelImageUpdate;
