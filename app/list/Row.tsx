import { ConfirmV1 } from "@/components/ConfirmV1";
import { ConfirmV2 } from "@/components/ConfirmV2";
import { DialogConfirm } from "@/components/DialogConfirm";
import { NoConfirm } from "@/components/NoConfirm";

type Props = {
  index: number;
};

export default function Row({ index }: Props) {
  const noConfirmId = crypto.getRandomValues(new Uint32Array(1))[0].toString();
  const confirmV1Id = crypto.getRandomValues(new Uint32Array(1))[0].toString();
  const confirmV2Id = crypto.getRandomValues(new Uint32Array(1))[0].toString();
  const dialogConfirmId = crypto
    .getRandomValues(new Uint32Array(1))[0]
    .toString();

  return (
    <div className="mt-12 relative before:absolute before:inset-0 before:-z-[1] before:bg-[radial-gradient(closest-side,#cbd5e1,transparent)] dark:before:bg-[radial-gradient(closest-side,#334155,transparent)]">
      <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 lg:items-center">
        <NoConfirm id={`${index}-${noConfirmId}`} />
        <ConfirmV1 id={`${index}-${confirmV1Id}`} />
        <ConfirmV2 id={`${index}-${confirmV2Id}`} />
        <DialogConfirm id={`${index}-${dialogConfirmId}`} />
      </div>
    </div>
  );
}
