import { Header } from "@/components/Header"
import { importImage } from "../../image.macro"

const image = importImage("https://storage.googleapis.com/stories.caurea.org/where-i-was-meant-to-be/vlcsnap-2021-01-14-22h08m34s340.png")

export default function header() {
  return (
    <Header
      image={{
        src: image.src,
        ...image.metadata,
        sqip: {
          src: image.sqip.metadata.dataURIBase64
        }
      }}
      title="Where I was meant to be"
    />
  );
}
