"use client";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";


function Button({ title, onClick }) {
  const { pending } = useFormStatus();

  return (
    <div className="mx-auto text-center">
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
        onClick={()=>toast.success(onClick)}
      >
        {title}
      </button>
    </div>
  );
}

export default Button;