import clsx from "clsx";

type Props = {
  src: string;
  className?: string;
}

export default function VideoChat({ className , src }: Props) {
  let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
  const videoId = regex.exec(src)[3];
  const embedSrc = `https://www.youtube.com/live_chat?v=${videoId}`;

  return (
    <iframe
      className={clsx("mx-auto max-w-full", className)}
      src={embedSrc + "&embed_domain=eqapp.pl"}
      title="YouTube video player chat"
      frameBorder="0"
    >
    </iframe>
  );
}
