import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  overMenu?: boolean;
}

export default function Fog({ children, overMenu = false }: Props) {
  return (
    <div
      className={clsx(
        "fixed inset-0 bg-light-back z- flex flex-col overflow-y-auto px-4 dark:bg-zinc-900",
        overMenu ? "z-[200]" : "z-10"
      )}
    >
      {/*<div className="bg-[url('/images/back.webp')] bg-cover bg-center opacity-10 w-screen h-screen fixed top-0 left-0" />*/}
      <div className="m-auto w-fit max-w-full">
        { children }
      </div>
    </div>
  );
}
