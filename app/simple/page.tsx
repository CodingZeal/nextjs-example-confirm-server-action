export default function SomePage() {
  async function exampleServerFunction(formData: FormData) {
    "use server";

    console.log("formData", Array.from(formData));
  }

  return (
    <div className="m-auto p-20">
      <form action={exampleServerFunction}>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" className="border-2" />
        </div>

        <button
          type="submit"
          className="rounded-md border-2 border-blue-600 font-semibold py-3 px-6 mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
