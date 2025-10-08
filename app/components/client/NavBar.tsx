import { useContext, useState } from "react";
import { GlobalContext } from "~/root";
import Container from "../layout/Container";
import { Link } from "@remix-run/react";
import Button from "./Button";
import clsx from "clsx";
import { FaBars } from "react-icons/fa";
import { FadeInDown } from "./AOM";

export default function NavBar() {
  const { t } = useContext(GlobalContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const links: {
    label: string;
    to: string;
  }[] = [
    { label: t("clients.links.home"), to: "/client" },
    { label: t("clients.links.aboutUs"), to: "/client/about-us" },
    { label: t("clients.links.webinars"), to: "/client/webinars" },
    { label: t("clients.links.articles"), to: "/client/blog" },
    { label: t("clients.links.products"), to: "/client/products" },
    { label: t("clients.links.partnerZone"), to: "/partner" },
    { label: t("clients.links.contact"), to: "/client/contact" },
  ];

  return (
    <Container>
      <FadeInDown>
        <div className="relative">
          <nav
            className={clsx(
              "w-full flex flex-col items-center py-4 lg:flex-row lg:justify-between relative overflow-hidden",
              showMobileMenu ? "h-full lg:h-auto" : "h-20 lg:h-auto"
            )}  
          >
            <Link to="/">
              <img src="/images/client/logo-full.webp" alt="Logo" className="h-12" />
            </Link>
            <ul className=" bg-[#fafafa] flex gap-5 items-center flex-col mt-6 lg:flex-row lg:mt-0 lg:w-fit">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-600  hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Button to="/client/shop" variant="primary" size="sm">
                  {t("clients.links.shop")}
                </Button>
              </li>
            </ul>
          </nav>
          <span
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="absolute cursor-pointer top-8 right-4 lg:hidden"
            >
              <FaBars className="text-2xl" />
          </span>
        </div>
      </FadeInDown>
    </Container>
  )
}
