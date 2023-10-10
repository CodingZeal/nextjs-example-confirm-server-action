"use server";

export async function deleteSomething(params: FormData) {
  const id = params.get("id");
  const type = params.get("type");

  console.log(`[${type}] Deleting ${id}...`);

  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a long-running operation
}
