export default function RootPage() {
  const timeDialog = new Date().toLocaleTimeString();
  const timeConfirm = new Date().toLocaleTimeString();
  const timeNone = new Date().toLocaleTimeString();

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
        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 lg:items-center">
          <div className="flex flex-col h-full text-center">
            <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-slate-900">
              <span className="mt-7 font-bold text-5xl text-gray-600 dark:text-gray-200">
                No confirm
              </span>
            </div>

            <div className="bg-white flex justify-center lg:mt-px pt-7 px-8 dark:bg-slate-900">
              {timeNone}
            </div>

            <div className="bg-white py-8 px-8 dark:bg-slate-900">
              <button
                className="inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-600 font-semibold text-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm py-3 px-6 dark:text-blue-500 dark:border-blue-500 dark:hover:border-blue-700"
                type="button"
              >
                Click Me!
              </button>
            </div>
          </div>

          <div className="flex flex-col h-full text-center">
            <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-slate-900">
              <span className="mt-7 font-bold text-5xl text-gray-600 dark:text-gray-200">
                JS confirm
              </span>
            </div>

            <div className="bg-white flex justify-center lg:mt-px pt-7 px-8 dark:bg-slate-900">
              {timeConfirm}
            </div>

            <div className="bg-white py-8 px-8 dark:bg-slate-900">
              <button
                className="inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-600 font-semibold text-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm py-3 px-6 dark:text-blue-500 dark:border-blue-500 dark:hover:border-blue-700"
                type="button"
              >
                Click Me!
              </button>
            </div>
          </div>

          <div className="flex flex-col h-full text-center">
            <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-slate-900">
              <span className="mt-7 font-bold text-5xl text-gray-600 dark:text-gray-200">
                Dialog confirm
              </span>
            </div>

            <div className="bg-white flex justify-center lg:mt-px pt-7 px-8 dark:bg-slate-900">
              {timeDialog}
            </div>

            <div className="bg-white py-8 px-8 dark:bg-slate-900">
              <button
                className="inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-600 font-semibold text-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm py-3 px-6 dark:text-blue-500 dark:border-blue-500 dark:hover:border-blue-700"
                type="button"
              >
                Click Me!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
