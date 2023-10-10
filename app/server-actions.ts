"use server";

export async function deleteNoConfirm(params: FormData) {
  const id = params.get("id");

  console.log(`Deleting ${id} without confirmation...`);

  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a long-running operation
}
