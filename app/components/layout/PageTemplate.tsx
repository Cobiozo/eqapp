type Props = {
  name: string;
}

export default function PageTemplate({ name, }: Props) {
  return (
    <div className="px-2">
      <h3 className="font-semibold text-md text-center pt-2 md:text-left md:pt-0">
        {name}
      </h3>
    </div>
  );
}
