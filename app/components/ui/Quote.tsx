type Props = {
  text: string
}

export default function Quote({ text }: Props) {
  return (
    <div className="standard-post w-fit max-w-2xl mx-auto text-base md:text-xl">
      <blockquote
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
