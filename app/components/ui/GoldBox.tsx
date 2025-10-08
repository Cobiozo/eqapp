import clsx from "clsx";
import { IoDiamondOutline } from "react-icons/io5";

type Props = {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export default function GoldBox({ children, title, className }: Props) {
  return (
    <div className={`relative p-1 ${className}`}>
      <div className="relative z-10 rounded-lg border-4 border-primary dark:bg-dark dark:border-medium-darker bg-light p-8 md:px-24">
        <h2
          className={(clsx(
            "font-bold text-2xl text-center py-5",
            "md:pb-10 md:text-3xl",
            "dark:text-light",
            className
          ))}
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}
