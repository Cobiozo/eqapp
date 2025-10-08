import Animated from "./Animated";
import Spinner from "./Spinner";

type Props = {
  children: React.ReactNode;
  status: "loading" | "idle" | "submitting"
}

export default function SuspenseBlock({ status, children }: Props) {
  return (
    <div className="relative">
      <Animated
        animation="fadeIn"
      >
        {children}
      </Animated>
      { status !== "idle" && (
        <Animated
          animation="fadeIn"
        >
          <div className="absolute rounded-lg w-full h-full top-0 left-0 color-dark bg-light-back flex justify-center items-center dark:bg-zinc-900 dark:text-gold">
          {/*<div className="bg-[url('/images/back.webp')] bg-cover bg-center opacity-10 w-screen h-screen fixed top-0 left-0" />*/}
            <Spinner className="relative z-10" />
          </div>
        </Animated>
      )}
    </div>
  );
}
