import clsx from "clsx";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import BoxTitle from "../ui/BoxTitle";
import Video from "../ui/Video";

type VideoItem = {
  id: string,
  url: string,
}
type Props = {
  className?: string,
  listClassName?: string,
  videos: VideoItem[], 
}

export default function VideosBox({ className, listClassName, videos }: Props) {
  const { t } = useContext(GlobalContext);

  return (
    <section className={clsx(className)}>
      <BoxTitle className="text-center">
        {t("common.relatedVideos")}
      </BoxTitle>
      <ul className={clsx(listClassName, "flex flex-wrap gap-4 justify-center")}>
        {videos.map(video => (
          <li
            key={video.id}
            className={clsx("border dark:border-b-zinc-600")}
          >
            <Video
              src={video.url}
              width="300"
              height="200"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
