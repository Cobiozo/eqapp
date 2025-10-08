import clsx from "clsx";
import Video from "./Video";

type Props = {
  src: string;
  className?: string;
}

export default function DecoratedVideo({ src, className }: Props) {
  return (
    <figure className={clsx("relative p-6 m-10", className)}>
      <div className="w-20 h-20 border-4 border-b-0 border-r-0 border-current top-0 left-0 absolute"></div>
      <Video src={src} />
      <div className="w-20 h-20 border-4 border-t-0 border-l-0 bottom-0 border-current right-0 absolute"></div>
    </figure>
  );
}
