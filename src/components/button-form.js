"use client";
import { useFormStatus } from "react-dom";
import toast, { Toaster, Bounce } from "react-hot-toast";

function Button({ title }) {
  const { pending } = useFormStatus();
  const notify = () => toast.success('Ganamos', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  return (
    <div className="mx-auto text-center">
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
        onClick={notify}
      >
        {title}
      </button>
      <Toaster />
    </div>
  );
}

export default Button;