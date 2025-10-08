import clsx from "clsx";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div className={clsx("spinner", className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
