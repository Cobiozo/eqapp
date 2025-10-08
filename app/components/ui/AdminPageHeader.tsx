import { Link } from "@remix-run/react";
import clsx from "clsx";
import { FaArrowLeft } from "react-icons/fa";
import PageHeader from "./PageHeader";

type Props = {
  children: React.ReactNode;
  className?: string;
  returnLink?: string;
}

export default function AdminPageHeader({ children, className, returnLink }: Props) {
  return (
   <header className={clsx("relative", className)}>
    <PageHeader className="flex items-center justify-center px-8">
      { returnLink && (
        <Link to={returnLink} className="absolute left-0 lg:-left-6">
          <FaArrowLeft />
        </Link>
      )}
      {children}
    </PageHeader>
   </header>
  );
}
