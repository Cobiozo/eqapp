type Props = {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <div className="container max-w-7xl mx-auto p-6">
      {children}
    </div>
  );
}
