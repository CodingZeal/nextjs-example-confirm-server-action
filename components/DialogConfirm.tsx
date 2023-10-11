"use client";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
import { deleteSomethingWithResponse } from "@/app/server-actions";
import { ServerActionButton } from "./ServerActionButton";
import { Modal, useModal } from "./Modal";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

export const DialogConfirm = ({ id: originalId }: Props) => {
  const [id, setId] = useState(originalId);

  const [formState, formAction] = useFormState(deleteSomethingWithResponse, {});
  const { status: serverActionStatus, newId } = formState;
  const { isOpen, open, close } = useModal();

  useEffect(() => {
    if (serverActionStatus === "success") {
      setId(newId);
      close();
    }
  }, [serverActionStatus, newId, close]);

  return (
    <>
      <div className="flex flex-col h-full text-center">
        <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-slate-900">
          <span className="mt-7 font-bold text-xl text-gray-600 dark:text-gray-200">
            Dialog confirm
          </span>
        </div>

        <div className="bg-white flex justify-center lg:mt-px pt-7 dark:bg-slate-900">
          {id}
        </div>

        <div className="bg-white py-8 px-8 dark:bg-slate-900">
          <button
            type="button"
            className="inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-600 font-semibold text-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm py-3 px-6 dark:text-blue-500 dark:border-blue-500 dark:hover:border-blue-700"
            onClick={() => open()}
          >
            Click Me!
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        close={close}
        title="Confirm"
        content="Are you sure?"
      >
        <form action={formAction} className="inline-block">
          <input type="hidden" name="type" value="dialog-confirm" />
          <input type="hidden" name="id" value={id} />
          <button
            type="button"
            className="mr-2 inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-600 font-semibold text-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm py-3 px-6 dark:text-blue-500 dark:border-blue-500 dark:hover:border-blue-700"
            onClick={() => close()}
          >
            Cancel
          </button>

          <ServerActionButton text="Ok" />
        </form>
      </Modal>
    </>
  );
};
