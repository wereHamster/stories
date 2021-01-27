import { Header } from "@/components/Header"

export default function header() {
  return (
    <Header
      image="https://storage.googleapis.com/stories.caurea.org/where-i-was-meant-to-be/vlcsnap-2021-01-14-22h08m34s340.png"
      title="Kyrgyzstan"
      subtitle="Where I was meant to be"
      date={new Date()}
    />
  );
}
