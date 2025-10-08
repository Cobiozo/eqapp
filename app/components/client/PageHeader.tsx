import { FadeInUp } from "./AOM";

type Props = {
  children?: React.ReactNode,
}

export default function PageHeader({ children }: Props) {
  return (
    <FadeInUp>
      <h1
        className="text-5xl font-bold text-center text-black my-14"
        dangerouslySetInnerHTML={{ __html: children as string }}
      />
    </FadeInUp>
  );
}