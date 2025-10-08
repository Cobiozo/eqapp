import Spinner from "../ui/Spinner";

export default function Loading() {
  return (
    <div className="fixed z-40 bg-light-back top-0 left-0 w-full h-full flex items-center justify-center dark:bg-zinc-900">
      {/*<div className="bg-[url('/images/back.webp')] bg-cover bg-center opacity-10 w-screen h-screen fixed top-0 left-0" />*/}
      <Spinner className="text-dark dark:text-gold relative z-10"/>
    </div>
  );
}
