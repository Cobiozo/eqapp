import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
}

export default function PageInfo({ children, className }: Props) {
  return (
    <p
      className={(clsx(
        "text-md text-center pb-10",
        "dark:text-light",
        className
      ))}
    >
      {children}
    </p>
  );
}
