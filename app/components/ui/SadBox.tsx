import clsx from "clsx";
import { HiOutlineEmojiSad } from "react-icons/hi";

type Props = {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export default function SadBox({ children, title, className }: Props) {
  return (
    <div className={`relative p-1 ${className} shadow-lg`}>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-sad" />
      <HiOutlineEmojiSad className="absolute z-20 m-10 top-0 left-0 text-6xl text-sad opacity-10 md:opacity-20" />
      <div className="relative z-10 bg-light dark:bg-zinc-900 p-8 md:px-24">
        <h2
          className={(clsx(
            "font-black text-2xl text-center py-5",
            "md:pb-10 md:text-3xl",
            "dark:text-light",
            className
          ))}
        >
          {title}
        </h2>
        {children}
      </div>
      <HiOutlineEmojiSad className="absolute z-20 m-10 top-0 right-0 text-6xl text-sad opacity-10 md:opacity-20" />
    </div>
  )
}
