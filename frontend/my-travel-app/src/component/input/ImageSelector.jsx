import { useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa6";

const ImageSelector = ({ image, setimage }) => {
  const InputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setimage(file);
    }
  };
  const onchooseFile = () => {
    InputRef.current.click();
  };
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={InputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <button
        className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50 "
        onClick={() => onchooseFile()}
      >
        <div className="w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100">
          <FaRegFileImage className="text-xl text-cyan-500" />
        </div>
        <p className="text-sm text-slate-500">Browse image files to upload</p>
      </button>
    </div>
  );
};

export default ImageSelector;
