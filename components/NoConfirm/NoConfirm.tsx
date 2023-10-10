"use client";

import { deleteNoConfirm } from "@/app/server-actions";
import { Button } from "./Button";

type Props = {
  id: string;
};

export const NoConfirm = ({ id }: Props) => {
  console.log("NoConfirm rendered: ", id);

  return (
    <div className="flex flex-col h-full text-center">
      <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-slate-900">
        <span className="mt-7 font-bold text-5xl text-gray-600 dark:text-gray-200">
          No confirm
        </span>
      </div>

      <div className="bg-white flex justify-center lg:mt-px pt-7 dark:bg-slate-900">
        {id}
      </div>

      <div className="bg-white py-8 px-8 dark:bg-slate-900">
        <form action={deleteNoConfirm} className="inline-block">
          <input type="hidden" name="id" value={id} />
          <Button />
        </form>
      </div>
    </div>
  );
};
