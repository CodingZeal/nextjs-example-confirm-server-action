"use client";

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const Button = () => {
  const { pending } = useFormStatus();
  const css = [
    "inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-600 font-semibold text-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm py-3 px-6 dark:text-blue-500 dark:border-blue-500 dark:hover:border-blue-700",
  ];

  if (pending) {
    css.push("border-gray-300 text-gray-300 cursor-not-allowed");
  }

  return (
    <button
      className={css.join(" ")}
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "Please wait..." : "Click Me!"}
    </button>
  );
};
