import clsx from "clsx";
import { useContext, useState } from "react";
import { GlobalContext } from "~/root";
import BoxTitle from "../ui/BoxTitle";
import LightBox from "./Lightbox";

type File = {
  id: string,
  name: string,
}
type Props = {
  className?: string,
  listClassName?: string,
  images: File[],
}

export default function ImagesBox({ className, listClassName, images }: Props) {
  const { t } = useContext(GlobalContext);
  const [imageToZoom, setImageToZoom] = useState<string>("");

  const handleZoomClose = () => {
    setImageToZoom("");
  }

  return (
    <section className={clsx(className)}>
      <BoxTitle className="text-center">
        {t("common.relatedImages")}
      </BoxTitle>
      { imageToZoom && (
        <LightBox src={`/uploads/${imageToZoom}`} onClose={handleZoomClose} />
      )}
      <ul className={clsx(listClassName, "flex flex-wrap gap-4 justify-center")}>
        {images.map(image => (
          <li
            key={image.id}
          >
            <img
              src={`/uploads/${image.name}`}
              alt={image.name}
              className="h-40 max-w-full cursor-pointer rounded-lg overflow-hidden border border-primary-lighter"
              onClick={() => setImageToZoom(image.name)}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
