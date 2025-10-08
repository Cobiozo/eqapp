import clsx from "clsx";
import getYTIdFromUrl from "~/utils/getYTIdFromUrl";

type Props = {
  src: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function Video({ src, width = "560", height = "315", className }: Props) {
  const videoId = getYTIdFromUrl(src);
  const embedSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      className={clsx("mx-auto max-w-full", className)}
      width={width}
      height={height}
      src={embedSrc}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={true}
    >
    </iframe>
  );
}
