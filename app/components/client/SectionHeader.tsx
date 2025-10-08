import clsx from "clsx";
import { FadeInUp } from "./AOM";

type Props = {
  children?: React.ReactNode,
  className?: string,
}

export default function SectionHeader({ children, className }: Props) {
  return (
    <FadeInUp>
      <h1
        className={clsx("text-xl md:text-4xl font-bold text-center my-6 md:my-10", className)}
        dangerouslySetInnerHTML={{ __html: children as string }}
      />
    </FadeInUp>
  );
}