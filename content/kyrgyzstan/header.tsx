import { Header } from "@/components/Header"
import Image from 'next/image'

export default function header() {
    return <Header>
        <Image
    src="https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/vlcsnap-2021-01-14-22h08m34s340.png"
    layout="fill"
        objectFit="cover"
  />
  <h1>Kyrgyzstan</h1>
    </Header>
}