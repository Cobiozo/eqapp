import { FaTimes } from "react-icons/fa";
import Fog from "../ui/Fog"

type Props = {
  src: string,
  onClose: () => void,
}

export default function LightBox({ src, onClose }: Props) {
  return (
    <Fog overMenu={true}>
      <img src={src} alt={src} className="relative z-10 max-w-6xl w-full max-h-[80vh] aspect-auto rounded-lg border-primary border-4" />
      <a href="#" onClick={onClose} className="absolute top-6 right-6">
        <FaTimes className=" text-2xl" />
      </a>
    </Fog>
  );
}