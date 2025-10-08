import { Icon as IconType } from "@prisma/client"
import clsx from "clsx"
import { AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp, AiOutlineCalendar, AiOutlineCamera, AiOutlineCar, AiOutlineCheck, AiOutlineCompass, AiOutlineDatabase, AiOutlineDesktop, AiOutlineFile, AiOutlineFileText, AiOutlineHeart, AiOutlineHome, AiOutlineInfoCircle, AiOutlineInstagram, AiOutlineLaptop, AiOutlineLike, AiOutlineLink, AiOutlineLock, AiOutlineMail, AiOutlineMinus, AiOutlineNotification, AiOutlinePhone, AiOutlinePlus, AiOutlinePushpin, AiOutlineShoppingCart, AiOutlineStar, AiOutlineTrophy, AiOutlineUnlock, AiOutlineVideoCamera } from "react-icons/ai"
import { FiBell, FiSettings, FiSmartphone, FiUsers } from "react-icons/fi"
import { IoBus, IoDiamondOutline, IoDocumentsOutline, IoStatsChartOutline } from "react-icons/io5"
import { TbCertificate, TbFileCertificate } from "react-icons/tb"
import { GiAirplaneArrival, GiCrossedBones, GiDynamite, GiGoldBar, GiHiking, GiMeditation, GiMoneyStack, GiWeightLiftingUp } from "react-icons/gi"
import { GrFacebookOption } from "react-icons/gr"
import { BsBook, BsCashCoin, BsChatDots, BsKey, BsKeyboard, BsMusicNoteBeamed } from "react-icons/bs"
import { HiOutlineNewspaper } from "react-icons/hi"
import { FaBomb, FaFireAlt, FaMapPin } from "react-icons/fa"
import { BiAlarm, BiBarChartAlt2, BiCrown, BiLineChart, BiLineChartDown, BiLogOut, BiMoviePlay, BiTrain } from "react-icons/bi"
import { VscTools } from "react-icons/vsc"
import { IoIosBicycle, IoIosGitNetwork } from "react-icons/io"
import { MdOutlineDirectionsBoatFilled, MdOutlineSchool } from "react-icons/md"
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc"
import { CgProfile } from "react-icons/cg"

type Props = {
  name: IconType
  className?: string,
}

export default function Icon({ name, className }: Props) {
  switch (name) {
    case IconType.HEART:
      return <AiOutlineHeart className={clsx(className)} />
    case IconType.LIKE:
      return <AiOutlineLike className={clsx(className)} />
    case IconType.STATS:
      return <IoStatsChartOutline className={clsx(className)} />
    case IconType.CONFIG:
      return <FiSettings className={clsx(className)} />
    case IconType.WORKSHOP:
      return <TbCertificate className={clsx(className)} />
    case IconType.INFO:
      return <AiOutlineInfoCircle className={clsx(className)} />
    case IconType.FB:
      return <GrFacebookOption className={clsx(className)} />
    case IconType.INSTAGRAM:
      return <AiOutlineInstagram className={clsx(className)} />
    case IconType.SPORT:
      return <GiWeightLiftingUp className={clsx(className)} />
    case IconType.MEDITATION:
      return <GiMeditation className={clsx(className)} />
    case IconType.CHAT:
      return <BsChatDots className={clsx(className)} />
    case IconType.TROPHY:
      return <AiOutlineTrophy className={clsx(className)} />
    case IconType.STAR:
      return <AiOutlineStar className={clsx(className)} />
    case IconType.CHALLENGE:
      return <GiHiking className={clsx(className)} />
    case IconType.MAIL:
      return <AiOutlineMail className={clsx(className)} />
    case IconType.CALENDAR:
      return <AiOutlineCalendar className={clsx(className)} />
    case IconType.VIDEO:
      return <AiOutlineVideoCamera className={clsx(className)} />
    case IconType.BOOK:
      return <BsBook className={clsx(className)} />
    case IconType.PAPER:
      return <HiOutlineNewspaper className={clsx(className)} />
    case IconType.LINK:
      return <AiOutlineLink className={clsx(className)} />
    case IconType.FILE:
      return <AiOutlineFile className={clsx(className)} />
    case IconType.TEXT:
      return <AiOutlineFileText className={clsx(className)} />
    case IconType.PLUS:
      return <AiOutlinePlus className={clsx(className)} />
    case IconType.MINUS:
      return <AiOutlineMinus className={clsx(className)} />
    case IconType.CHECK:
      return <AiOutlineCheck className={clsx(className)} />
    case IconType.MUSIC:
      return <BsMusicNoteBeamed className={clsx(className)} />
    case IconType.CROSS:
      return <GiCrossedBones className={clsx(className)} />
    case IconType.ARROW_LEFT:
      return <AiOutlineArrowLeft className={clsx(className)} />
    case IconType.ARROW_RIGHT:
      return <AiOutlineArrowRight className={clsx(className)} />
    case IconType.ARROW_UP:
      return <AiOutlineArrowUp className={clsx(className)} />
    case IconType.ARROW_DOWN:
      return <AiOutlineArrowDown className={clsx(className)} />
    case IconType.LOCK_OPEN:
      return <AiOutlineUnlock className={clsx(className)} />
    case IconType.LOCK_CLOSED:
      return <AiOutlineLock className={clsx(className)} />
    case IconType.PIN:
      return <AiOutlinePushpin className={clsx(className)} />
    case IconType.PIN_TWO:
      return <FaMapPin className={clsx(className)} />
    case IconType.CHART_UP:
      return <BiLineChart className={clsx(className)} />
    case IconType.CHART_DOWN:
      return <BiLineChartDown className={clsx(className)} />
    case IconType.CHART_ALT:
      return <BiBarChartAlt2 className={clsx(className)} />
    case IconType.TOOLS:
      return <VscTools className={clsx(className)} />
    case IconType.BOMB:
      return <FaBomb className={clsx(className)} />
    case IconType.DYNAMITE:
      return <GiDynamite className={clsx(className)} />
    case IconType.DIAMOND:
      return <IoDiamondOutline className={clsx(className)} />
    case IconType.CASH:
      return <BsCashCoin className={clsx(className)} />
    case IconType.CASH_TWO:
      return <GiMoneyStack className={clsx(className)} />
    case IconType.GOLD:
      return <GiGoldBar className={clsx(className)} />
    case IconType.BUS:
      return <IoBus className={clsx(className)} />
    case IconType.CAR:
      return <AiOutlineCar className={clsx(className)} />
    case IconType.BIKE:
      return <IoIosBicycle className={clsx(className)} />
    case IconType.PLANE:
      return <GiAirplaneArrival className={clsx(className)} />
    case IconType.BOAT:
      return <MdOutlineDirectionsBoatFilled className={clsx(className)} />
    case IconType.SMARTPHONE:
      return <FiSmartphone className={clsx(className)} />
    case IconType.LAPTOP:
      return <AiOutlineLaptop className={clsx(className)} />
    case IconType.DESKTOP:
      return <AiOutlineDesktop className={clsx(className)} />
    case IconType.PHONE_OLD:
      return <AiOutlinePhone className={clsx(className)} />
    case IconType.KEYBOARD:
      return <BsKeyboard className={clsx(className)} />
    case IconType.CAMERA:
      return <AiOutlineCamera className={clsx(className)} />
    case IconType.COMPASS:
      return <AiOutlineCompass className={clsx(className)} />
    case IconType.ALARM:
      return <BiAlarm className={clsx(className)} />
    case IconType.WOMAN:
      return <FcBusinesswoman className={clsx(className)} />
    case IconType.MAN:
      return <FcBusinessman className={clsx(className)} />
    case IconType.BELL:
      return <FiBell className={clsx(className)} />
    case IconType.ACADEMY:
      return <MdOutlineSchool className={clsx(className)} />
    case IconType.CERTIFICATE:
      return <TbFileCertificate className={clsx(className)} />
    case IconType.LIST:
      return <AiOutlineDatabase className={clsx(className)} />
    case IconType.MOVIE:
      return <BiMoviePlay className={clsx(className)} />
    case IconType.PROFILE:
      return <CgProfile className={clsx(className)} />
    case IconType.CROWN:
      return <BiCrown className={clsx(className)} />
    case IconType.KEY:
      return <BsKey className={clsx(className)} />
    case IconType.USERS:
      return <FiUsers className={clsx(className)} />
    case IconType.NOTIFICATION:
      return <AiOutlineNotification className={clsx(className)} />
    case IconType.PATHS:
      return <IoIosGitNetwork className={clsx(className)} />
    case IconType.EXIT:
      return <BiLogOut className={clsx(className)} />
    case IconType.HOME:
      return <AiOutlineHome className={clsx(className)} />
    case IconType.CART:
      return <AiOutlineShoppingCart className={clsx(className)} />
    case IconType.FILES:
      return <IoDocumentsOutline className={clsx(className)} />
    case IconType.FIRE:
      return <FaFireAlt />
    default:
      return null
  }
}


