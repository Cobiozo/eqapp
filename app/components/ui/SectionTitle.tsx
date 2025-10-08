import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className }: Props) {
  return (
    <h2
      className={(clsx(
        "font-semibold text-xl text-center py-5",
        "md:py-10 md:text-2xl",
        "dark:text-light",
        className
      ))}
    >
      {children}
    </h2>
  );
}
