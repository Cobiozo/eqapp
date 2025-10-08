import clsx from "clsx";
import { FadeInUp } from "../features/AOM";

type Props = {
  children: React.ReactNode;
  className?: string;
}

export default function PageHeader({ children, className }: Props) {
  return (
    <FadeInUp>
      <h1
        className={(clsx(
          "font-bold text-xl text-center py-5",
          "md:py-6 md:text-3xl",
          "dark:text-gradient-gold",
          className
        ))}
      >
        {children}
      </h1>
    </FadeInUp>
  );
}
