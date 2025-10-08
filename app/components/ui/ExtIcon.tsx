import clsx from 'clsx';
import { AiOutlineFileImage, AiOutlineFileUnknown, AiOutlineFileZip } from 'react-icons/ai';
import { FaRegFileVideo } from 'react-icons/fa';
import { VscFilePdf } from 'react-icons/vsc';

type Props = {
  extension: string,
  className?: string,
}

export default function ExtIcon({ extension, className }: Props) {

  if (extension.startsWith('image'))
    return <AiOutlineFileImage className={clsx(className, "text-green-500")} />
  if (extension.startsWith('video'))
    return <FaRegFileVideo className={clsx(className, " text-blue-500")} />
  switch (extension) {
    case "application/pdf":
      return <VscFilePdf className={clsx(className, "text-red-500")} />
    case "application/x-zip-compressed":
      return <AiOutlineFileZip className={clsx(className, "text-purple-500")} />
    default:
      return <AiOutlineFileUnknown className={clsx(className, "text-gray-500")} />
  }
}
