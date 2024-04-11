"use client";
import { useFormStatus } from "react-dom";

function Button({ title }) {
  const { pending } = useFormStatus();
  return (
    <div className="mx-auto text-center">
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
      >
        {title}
      </button>
    </div>
  );
}

export default Button;