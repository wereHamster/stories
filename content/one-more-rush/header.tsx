import { Header } from "@/components/Header"
import { importImage } from "../../image.macro"

export default function header() {
  return (
    <Header
      image={importImage("https://storage.googleapis.com/stories.caurea.org/one-more-rush/IMG_4340.jpeg")}
      title="One More Rush"
    />
  );
}
