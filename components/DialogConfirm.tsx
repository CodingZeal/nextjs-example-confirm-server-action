"use client";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
import { deleteSomethingWithResponse } from "@/app/server-actions";
import { ServerActionButton } from "./ServerActionButton";
import { Modal, useModal } from "./Modal";
import { useEffect, useState } from "react";
import { Button } from "./Button";

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
          <Button text="Click Me!" onClick={open} />
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

          <Button text="Cancel" onClick={close} className="mr-2" />
          <ServerActionButton text="Ok" />
        </form>
      </Modal>
    </>
  );
};
