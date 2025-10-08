import clsx from "clsx";

type Props = {
  content: string;
  className?: string;
}

export default function WysiwygGeneratedContent({ content, className }: Props) {
  return (
    <div
      className={clsx("standard-post", className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}