import { Icon as IconType } from "@prisma/client"
import clsx from "clsx"
import { AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp, AiOutlineCalendar, AiOutlineCamera, AiOutlineCar, AiOutlineCheck, AiOutlineCompass, AiOutlineDatabase, AiOutlineDesktop, AiOutlineFile, AiOutlineFileText, AiOutlineHeart, AiOutlineHome, AiOutlineInfoCircle, AiOutlineInstagram, AiOutlineLaptop, AiOutlineLike, AiOutlineLink, AiOutlineLock, AiOutlineMail, AiOutlineMinus, AiOutlineNotification, AiOutlinePhone, AiOutlinePlus, AiOutlinePushpin, AiOutlineStar, AiOutlineTrophy, AiOutlineUnlock, AiOutlineVideoCamera } from "react-icons/ai"
import { FiBell, FiSettings, FiSmartphone, FiUsers } from "react-icons/fi"
import { IoBus, IoDiamondOutline, IoStatsChartOutline } from "react-icons/io5"
import { TbCertificate, TbFileCertificate } from "react-icons/tb"
import { GiAirplaneArrival, GiCrossedBones, GiDynamite, GiGoldBar, GiHiking, GiMeditation, GiMoneyStack, GiWeightLiftingUp } from "react-icons/gi"
import { GrFacebookOption } from "react-icons/gr"
import { BsBook, BsCashCoin, BsChatDots, BsKey, BsKeyboard, BsMusicNoteBeamed } from "react-icons/bs"
import { HiOutlineNewspaper } from "react-icons/hi"
import { FaBomb, FaMapPin } from "react-icons/fa"
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

export default function PlainIcon({ name, className }: Props) {
  switch (name) {
    case IconType.HEART:
      return <AiOutlineHeart className={className} />
    case IconType.LIKE:
      return <AiOutlineLike className={className} />
    case IconType.STATS:
      return <IoStatsChartOutline className={className} />
    case IconType.CONFIG:
      return <FiSettings className={className} />
    case IconType.WORKSHOP:
      return <TbCertificate className={className} />
    case IconType.INFO:
      return <AiOutlineInfoCircle className={className} />
    case IconType.FB:
      return <GrFacebookOption className={className} />
    case IconType.INSTAGRAM:
      return <AiOutlineInstagram className={className} />
    case IconType.SPORT:
      return <GiWeightLiftingUp className={className} />
    case IconType.MEDITATION:
      return <GiMeditation className={className} />
    case IconType.CHAT:
      return <BsChatDots className={className} />
    case IconType.TROPHY:
      return <AiOutlineTrophy className={className} />
    case IconType.STAR:
      return <AiOutlineStar className={className} />
    case IconType.CHALLENGE:
      return <GiHiking className={className} />
    case IconType.MAIL:
      return <AiOutlineMail className={className} />
    case IconType.CALENDAR:
      return <AiOutlineCalendar className={className} />
    case IconType.VIDEO:
      return <AiOutlineVideoCamera className={className} />
    case IconType.BOOK:
      return <BsBook className={className} />
    case IconType.PAPER:
      return <HiOutlineNewspaper className={className} />
    case IconType.LINK:
      return <AiOutlineLink className={className} />
    case IconType.FILE:
      return <AiOutlineFile className={className} />
    case IconType.TEXT:
      return <AiOutlineFileText className={className} />
    case IconType.PLUS:
      return <AiOutlinePlus className={className} />
    case IconType.MINUS:
      return <AiOutlineMinus className={className} />
    case IconType.CHECK:
      return <AiOutlineCheck className={className} />
    case IconType.MUSIC:
      return <BsMusicNoteBeamed className={className} />
    case IconType.CROSS:
      return <GiCrossedBones className={className} />
    case IconType.ARROW_LEFT:
      return <AiOutlineArrowLeft className={className} />
    case IconType.ARROW_RIGHT:
      return <AiOutlineArrowRight className={className} />
    case IconType.ARROW_UP:
      return <AiOutlineArrowUp className={className} />
    case IconType.ARROW_DOWN:
      return <AiOutlineArrowDown className={className} />
    case IconType.LOCK_OPEN:
      return <AiOutlineUnlock className={className} />
    case IconType.LOCK_CLOSED:
      return <AiOutlineLock className={className} />
    case IconType.PIN:
      return <AiOutlinePushpin className={className} />
    case IconType.PIN_TWO:
      return <FaMapPin className={className} />
    case IconType.CHART_UP:
      return <BiLineChart className={className} />
    case IconType.CHART_DOWN:
      return <BiLineChartDown className={className} />
    case IconType.CHART_ALT:
      return <BiBarChartAlt2 className={className} />
    case IconType.TOOLS:
      return <VscTools className={className} />
    case IconType.BOMB:
      return <FaBomb className={className} />
    case IconType.DYNAMITE:
      return <GiDynamite className={className} />
    case IconType.DIAMOND:
      return <IoDiamondOutline className={className} />
    case IconType.CASH:
      return <BsCashCoin className={className} />
    case IconType.CASH_TWO:
      return <GiMoneyStack className={className} />
    case IconType.GOLD:
      return <GiGoldBar className={className} />
    case IconType.BUS:
      return <IoBus className={className} />
    case IconType.CAR:
      return <AiOutlineCar className={className} />
    case IconType.BIKE:
      return <IoIosBicycle className={className} />
    case IconType.PLANE:
      return <GiAirplaneArrival className={className} />
    case IconType.BOAT:
      return <MdOutlineDirectionsBoatFilled className={className} />
    case IconType.SMARTPHONE:
      return <FiSmartphone className={className} />
    case IconType.LAPTOP:
      return <AiOutlineLaptop className={className} />
    case IconType.DESKTOP:
      return <AiOutlineDesktop className={className} />
    case IconType.PHONE_OLD:
      return <AiOutlinePhone className={className} />
    case IconType.KEYBOARD:
      return <BsKeyboard className={className} />
    case IconType.CAMERA:
      return <AiOutlineCamera className={className} />
    case IconType.COMPASS:
      return <AiOutlineCompass className={className} />
    case IconType.ALARM:
      return <BiAlarm className={className} />
    case IconType.WOMAN:
      return <FcBusinesswoman className={className} />
    case IconType.MAN:
      return <FcBusinessman className={className} />
    case IconType.BELL:
      return <FiBell className={className} />
    case IconType.ACADEMY:
      return <MdOutlineSchool className={className} />
    case IconType.CERTIFICATE:
      return <TbFileCertificate className={className} />
    case IconType.LIST:
      return <AiOutlineDatabase className={className} />
    case IconType.MOVIE:
      return <BiMoviePlay className={className} />
    case IconType.PROFILE:
      return <CgProfile className={className} />
    case IconType.CROWN:
      return <BiCrown className={className} />
    case IconType.KEY:
      return <BsKey className={className} />
    case IconType.USERS:
      return <FiUsers className={className} />
    case IconType.NOTIFICATION:
      return <AiOutlineNotification className={className} />
    case IconType.PATHS:
      return <IoIosGitNetwork className={className} />
    case IconType.EXIT:
      return <BiLogOut className={className} />
    case IconType.HOME:
      return <AiOutlineHome className={className} />
    default:
      return null
  }
}


