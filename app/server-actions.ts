"use server";

export async function deleteSomething(params: FormData) {
  const id = params.get("id");
  const type = params.get("type");

  console.log(`[${type}] Deleting ${id}...`);

  // Simulate a long-running operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

export async function deleteSomethingWithResponse(
  _prevState: any,
  params: FormData
) {
  const id = params.get("id");
  const type = params.get("type");

  console.log(`[${type}] Deleting ${id}...`);

  // Simulate a long-running operation
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const newId = crypto.getRandomValues(new Uint32Array(1))[0].toString();

  return { status: "success", message: `Deleted ${id}!`, newId };
}
