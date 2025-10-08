type Props = {
  id: string;
  title: string;
  createdAt: string;
}

export default function PostView({  title, createdAt }: Props) {
  return (
    <div>
      <h2 className="font-semibold text-sm ml-2">
        {title}
      </h2>
    </div>
  )
}