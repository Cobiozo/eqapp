import { Link, Links } from "@remix-run/react";
import { useContext } from "react";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { GlobalContext } from "~/root";
import Container from "../layout/Container";
import LanguageToggler from "./LanguageToogler";

export default function PageFooter() {
  const { t } = useContext(GlobalContext);
  return (
    <footer className="bg-gray-100 py-10">
      <Container>
        <div className="text-gray-600 flex flex-col md:flex-row md:justify-between">
          <span className="my-2 text-center md:text-left">
            {t("clients.footer.copyright")}
          </span>
          <div>
            <div className="flex gap-4 justify-center md:justify-end my-2">
              <Link to="/client/contact">
                {t("clients.links.contact")}
              </Link>
              <Link to="/client/cookies">
                {t("clients.links.cookies")}
              </Link>
            </div>
            <div className="flex gap-4 justify-center md:justify-end my-4">
              <Link
                to="https://www.facebook.com/EQKamilHanasz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiFacebook />
              </Link>
              <Link
                to="https://www.instagram.com/esterahanasz?igsh=MW9oczY2dWp2bXdwbQ=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiInstagram />
              </Link>
              <LanguageToggler />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}