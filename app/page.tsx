import { ConfirmV1 } from "@/components/ConfirmV1";
import { ConfirmV2 } from "@/components/ConfirmV2";
import { DialogConfirm } from "@/components/DialogConfirm";
import { NoConfirm } from "@/components/NoConfirm";

export default function RootPage() {
  const noConfirmId = crypto.getRandomValues(new Uint32Array(1))[0].toString();
  const confirmV1Id = crypto.getRandomValues(new Uint32Array(1))[0].toString();
  const confirmV2Id = crypto.getRandomValues(new Uint32Array(1))[0].toString();
  const dialogConfirmId = crypto
    .getRandomValues(new Uint32Array(1))[0]
    .toString();

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
          Confirm server action
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          TODO: description
        </p>
      </div>

      <div className="mt-12 relative before:absolute before:inset-0 before:-z-[1] before:bg-[radial-gradient(closest-side,#cbd5e1,transparent)] dark:before:bg-[radial-gradient(closest-side,#334155,transparent)]">
        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 lg:items-center">
          <NoConfirm id={noConfirmId} />
          <ConfirmV1 id={confirmV1Id} />
          <ConfirmV2 id={confirmV2Id} />
          <DialogConfirm id={dialogConfirmId} />
        </div>
      </div>
    </div>
  );
}
