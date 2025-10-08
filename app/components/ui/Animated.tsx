import clsx from "clsx";

type Props = {
  animation: "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "flash";
  infinite?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Animated({ animation, children, infinite, className }: Props) {
  return (
    <div className={clsx(
        "animate__animated",
        "animate__" + animation,
        infinite && "animate__infinite",
        className)}>
      {children}
    </div>
  )
}
