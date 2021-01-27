import { Header } from "@/components/Header"
import { importImage } from "@zhif/macro"

export default function header() {
  return (
    <Header
      blurHash={importImage("https://storage.googleapis.com/stories.caurea.org/where-i-was-meant-to-be/vlcsnap-2021-01-14-22h08m34s340.png").blurHash}
      image="https://storage.googleapis.com/stories.caurea.org/where-i-was-meant-to-be/vlcsnap-2021-01-14-22h08m34s340.png"
      title="Where I was meant to be"
      date={new Date(Date.parse("2021-01-27"))}
    />
  );
}
