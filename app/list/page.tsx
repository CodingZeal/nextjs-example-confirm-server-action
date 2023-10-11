import Row from "./Row";

export default function ListPage() {
  const list = [...new Array(10)];

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
          Confirm server action list
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Use multiple instances of each component
        </p>
      </div>

      {list.map((_, index) => (
        <Row key={index} index={index} />
      ))}
    </div>
  );
}
