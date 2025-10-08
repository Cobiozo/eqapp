import clsx from "clsx";
import { FadeInUp } from "../features/AOM";

type Props = {
  children: React.ReactNode;
  className?: string;
}

export default function BoxTitle({ children, className }: Props) {
  return (
    <FadeInUp>
      <h3
        className={(clsx(
          "text-md text-center py-4 font-bold ",
          "md:py-6 md:text-xl",
          "dark:text-light",
          className
        ))}
      >
        {children}
      </h3>
    </FadeInUp>
  );
}
