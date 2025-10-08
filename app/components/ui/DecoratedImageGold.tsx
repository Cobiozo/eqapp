import clsx from "clsx";

type Props = {
  src: string;
  className?: string;
}

export default function DecoratedImageGold({ src, className }: Props) {
  return (
    <figure className={clsx("relative w-fit", className)}>
      <img src={src} className="w-26 md:w-32 border-4 border-gold rounded-lg" />
    </figure>
  );
}
