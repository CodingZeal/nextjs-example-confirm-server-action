type Props = {
  className?: string;
  text: string;
  onClick: () => void;
};

export const Button = ({ text, onClick, className }: Props) => {
  const baseCss =
    "inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-600 font-semibold text-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm py-3 px-6 dark:text-blue-500 dark:border-blue-500 dark:hover:border-blue-700";
  const css = className ? `${baseCss} ${className}` : baseCss;

  return (
    <button className={css} type="button" onClick={onClick}>
      {text}
    </button>
  );
};
