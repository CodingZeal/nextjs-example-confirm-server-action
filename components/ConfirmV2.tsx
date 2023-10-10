"use client";

import { deleteSomething } from "@/app/server-actions";
import { Button } from "./Button";
import { FormEvent } from "react";

type Props = {
  id: string;
};

export const ConfirmV2 = ({ id }: Props) => {
  console.log("ConfirmV2 rendered: ", id);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (confirm("Are you sure?")) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  };

  return (
    <div className="flex flex-col h-full text-center">
      <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-slate-900">
        <span className="mt-7 font-bold text-5xl text-gray-600 dark:text-gray-200">
          JS confirm V2
        </span>
      </div>

      <div className="bg-white flex justify-center lg:mt-px pt-7 dark:bg-slate-900">
        {id}
      </div>

      <div className="bg-white py-8 px-8 dark:bg-slate-900">
        <form
          action={deleteSomething}
          onSubmit={onSubmit}
          className="inline-block"
        >
          <input type="hidden" name="type" value="confirm-v2" />
          <input type="hidden" name="id" value={id} />
          <Button />
        </form>
      </div>
    </div>
  );
};
