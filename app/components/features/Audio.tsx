type Props = {
    src: string;
}

export default function Audio({ src }: Props) {
    return (
      <>
        <audio autoPlay id="player" src={src}></audio>
      </>
    );
}
