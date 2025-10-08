import { Link } from "@remix-run/react"
import { useContext } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { GlobalContext } from "~/root"

type Props = {
  url: string,
}

export const ReturnLink = ({ url }: Props) => {
  const { t } = useContext(GlobalContext);

  return (
    <Link to={url} className="w-fit font-bold mb-4 flex mx-auto items-center gap-4">
      <FaArrowLeft />
      {t("common.goBack")}
    </Link>
  )
}